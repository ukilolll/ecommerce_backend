import db from "../services/database.js"

//ซื้อสินค้า ย้าย data from cart to order
export async function createOrder(req, res){
    try{
    const totalResult = await db.query({
    text: `SELECT SUM(ci.quantity * p.price) AS total
            FROM cart_items ci
            JOIN products p ON ci.product_id = p.id
            WHERE ci.cart_id = $1`,
    values: [req.params.id],
    });

    await client.query('BEGIN');

    const result = await db.query({
        text: `DELETE FROM cart_items WHERE cart_id = $1`,
        values: [req.params.id],
    });

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "cart not found" });
    } 

    const orderData = result.rows
    console.log(orderData)

    const orderResult = await database.query({
        text: `INSERT INTO orders (user_id, status, total_amount)
               VALUES ($1, $2, $3)
               RETURNING id, created_at`,
        values: [
          req.user.userId,
          'pending',
          totalResult.rows[0].total,
        ],
    });

    for (const item of orderData) {
        await database.query({
          text: `INSERT INTO order_items (order_id, product_id, quantity)
                 VALUES ($1, $2, $3, $4)`,
          values: [
            orderResult.id,
            item.product_id,
            item.quantity,
          ],
        });
    }

    await client.query('COMMIT');
    return res.status(201).json({success:true,message:"create order success"});

    }catch (err) {
    await client.query('ROLLBACK');
    console.log(err)
    return res.status(500).json({error:"internal server error"})
  }
}
//user check transiton history and pesent

//admin updata status

//addmin chekc all users history
