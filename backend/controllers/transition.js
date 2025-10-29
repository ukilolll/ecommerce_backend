import db from "../services/database.js"

//ซื้อสินค้า ย้าย data from cart to order
export async function createOrder(req, res){
    try{
    const orderDataResult = await db.query({
      text: `SELECT ci.product_id, ci.quantity, p.price
               FROM cart_items ci
               JOIN products p ON ci.product_id = p.id
               WHERE ci.cart_id = $1`,
    values: [req.params.cartId],
    });

    if (orderDataResult.rows.length === 0) {
      return res.status(404).json({ message: "there are no item in cart or cart Id not exist" });
    } 

    await db.query('BEGIN');

    await db.query({
        text: `DELETE FROM cart_items WHERE cart_id = $1`,
        values: [req.params.cartId],
    });

    // await db.query({
    //     text: `DELETE FROM carts WHERE id = $1`,
    //     values: [req.params.id],
    // });

    const orderData = orderDataResult.rows; 
    const totalAmount = orderData.reduce(
        (sum, item) => sum + item.quantity * parseFloat(item.price)
        , 0 );

    const orderDetail = await db.query({
        text: `INSERT INTO orders (user_id, status, total_amount)
               VALUES ($1, $2, $3)
               RETURNING id, created_at`,
        values: [
          req.user.userId,
          'pending',
          totalAmount,
        ],
    });

    for (const item of orderData) {
        await db.query({
          text: `INSERT INTO order_items (order_id, product_id, quantity)
                 VALUES ($1, $2, $3)`,
          values: [
            orderDetail.rows[0].id,
            item.product_id,
            item.quantity,
          ],
        });
    }
    console.log(orderDataResult.rows)
    console.log(orderDetail.rows)

    await db.query('COMMIT');
    return res.status(201).json({success:true,message:"create order success",create_at:orderDetail.rows[0].created_at});

    }catch (err) {
    await db.query('ROLLBACK');
    console.log(err)
    return res.status(500).json({error:"internal server error"})
  }
}
//user check transiton history and pesent
export async function userCheckTransition(req, res) {
  try{
    let limit = req.query.limit || 100;
    let offset = req.query.offset || 0;

  const result = await db.query(
    `SELECT 
      o.id AS "order_id",
      o.status,
      o.total_amount,
      o.created_at,
      json_agg(
        json_build_object(
          'product_id', p.id,
          'name', p.name,
          'quantity', oitem.quantity
        )
      ) AS products
    FROM public.orders AS o
    JOIN public.users AS u ON u.id = o.user_id
    JOIN public.order_items AS oitem ON o.id = oitem.order_id
    JOIN public.products AS p ON p.id = oitem.product_id
    WHERE o.user_id = $1
    GROUP BY 
      o.id, o.user_id, u.username, u.email, o.status, o.total_amount, o.created_at
    ORDER BY o.id
    LIMIT $2 OFFSET $3;`,
    [req.user.userId,limit,offset],
  );
  
  return res.json(result.rows);

  } catch (err) {
    console.log(err)
    return  res.status(500).json({error:"internal server error"})
  }
}
