import db from "../services/database.js"
import validator from "../pkg/validator.js";
import { validateObj } from "../services/cart.js";

export async function getCartId(req, res) {
try{
  const result = await db.query({
    text: `SELECT * FROM carts WHERE user_id = $1`,
    values: [req.user.userId],
  });
  
  if (result.rows[0] != null) {
    return res.json({ cartExist: true, cartId: result.rows[0].id });
  } else {
    return res.json({ cartExist: false });
  }

  } catch (err) {
    console.log(err)
    return    res.status(500).json({error:"internal server error"})
  }

}

export async function postCart(req, res) {
  try {
    //chack cart already exist
    console.log(req.user)
    const existingCart = await db.query({
      text: 'SELECT id FROM carts WHERE user_id = $1',
      values: [req.user.userId],
    });

    if (existingCart.rows.length > 0) {
      return res.json({ 
        cartOK: true, 
        messageAddCart: "Cart already exists",
        cartId: existingCart.rows[0].id 
      });
    }

    // Create new cart - SERIAL will auto-generate the ID
    const result = await db.query({
      text: `INSERT INTO carts (user_id) VALUES ($1) RETURNING id`,
      values: [req.user.userId],
    });

    return res.json({ 
      cartOK: true, 
      messageAddCart: "Cart created",
      cartId: result.rows[0].id 
    });
  } catch (err) {
    console.log(err)
    return res.json({ cartOK: false, messageAddCart: err.message });
  }
}

export async function setCartDtl(req, res) {
  try {
    const {error,errorMsg,body} = validator(validateObj.postCartDtl,req.body) 
    if(error){
       return res.status(400).json({errorMsg,cartDtlOK: false})
    }

    // Check if product already exists in cart
    const pdResult = await db.query({
      text: `SELECT * FROM cart_items WHERE cart_id = $1 AND product_id = $2`,
      values: [body.cartId, body.productId],
    });


    if (pdResult.rowCount == 0 && body.quantity > 0) {
      // Insert new cart item(product don't exists)
      const result = await db.query({
        text: `INSERT INTO cart_items (cart_id, product_id, quantity) 
               VALUES ($1, $2, $3) RETURNING id`,
        values: [body.cartId, body.productId, body.quantity || 1],
      });
      return res.json({ cartDtlOK: true, messageAddCart: "Item added to cart" });
    } 
    else if (body.quantity >0) {
      // Update existing cart item quantity(product already exists)
      const result = await db.query({
        text: `UPDATE cart_items SET quantity = $1 
               WHERE cart_id = $2 AND product_id = $3`,
        values: [body.quantity , body.cartId, body.productId],
      });
      return res.json({ cartDtlOK: true, messageAddCart: "Item quantity updated" });
    }
    else if (body.quantity == 0){
        const result = await db.query({
        text: `DELETE FROM cart_items
               WHERE cart_id = $1 AND product_id = $2`,
        values: [body.cartId, body.productId],
      });
      return res.json({ cartDtlOK: true, messageAddCart: "delete this item" });
    }
    else{
      return res.status(400).json({errorMsg:"don't try to negative quantity numnber you nigative",cartDtlOK: false})
    }

  } catch (err) {
    return res.json({
      cartDtlOK: false,
      messageAddCartDtl: err.message,
    });
  }
}

export async function sumCart(req, res) {
  const result = await db.query({
    text: `SELECT SUM(ci.quantity) AS qty, SUM(ci.quantity * p.price) AS money
           FROM cart_items ci
           JOIN products p ON ci.product_id = p.id
           WHERE ci.cart_id = $1`,
    values: [req.params.id],
  });
  
  return res.json({
    id: req.params.id,
    qty: result.rows[0].qty || 0,
    money: result.rows[0].money || 0,
  });
}

export async function getCartByCartId(req, res) {
  try {
    const result = await db.query({
      text: `SELECT c.*, 
                    COUNT(ci.id) AS item_count,
                    SUM(ci.quantity) AS sqty, 
                    SUM(p.price * ci.quantity) AS sprice
             FROM carts c
             LEFT JOIN cart_items ci ON c.id = ci.cart_id
             LEFT JOIN products p ON ci.product_id = p.id
             WHERE c.id = $1
             GROUP BY c.id`,
      values: [req.params.id],
    });
    
    return res.json(result.rows);
  } catch (err) {
    return res.json({ error: err.message });
  }
}

export async function getCartDtl(req, res) {  
  try {
    const result = await db.query({
      text: `SELECT ROW_NUMBER() OVER (ORDER BY ci.product_id) AS row_number,
                    ci.product_id, p.name AS product_name, 
                    ci.quantity, p.price ,p.image_name
             FROM cart_items ci
             LEFT JOIN products p ON ci.product_id = p.id
             WHERE ci.cart_id = $1
             ORDER BY ci.product_id`,
      values: [req.params.id],
    });
    
    return res.json(result.rows);
  } catch (err) {
    return res.json({ error: err.message });
  }
}

export async function getCartByUserId(req, res) {
  try {
    const result = await db.query({
      text: `SELECT ROW_NUMBER() OVER (ORDER BY c.id DESC) AS row_number,
                    c.*, 
                    COUNT(ci.id) AS item_count,
                    SUM(ci.quantity) AS sqty, 
                    SUM(p.price * ci.quantity) AS sprice
             FROM carts c
             LEFT JOIN cart_items ci ON c.id = ci.cart_id
             LEFT JOIN products p ON ci.product_id = p.id
             WHERE c.user_id = $1
             GROUP BY c.id
             ORDER BY c.id DESC`,
      values: [req.user.userId],
    });
    
    return res.json(result.rows);
  } catch (err) {
    return res.json({ error: err.message });
  }
}

export async function deleteCart(req, res) {
    try{
    await db.query('BEGIN');

    const result = await db.query({
        text: `DELETE FROM cart_items WHERE cart_id = $1`,
        values: [req.params.id],
    });

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "there are no item in cart or cart Id not exist" });
    }

    // await db.query({
    //     text: `DELETE FROM carts WHERE id = $1`,
    //     values: [req.params.id],
    // });

    await db.query('COMMIT');

    return res.json({success:true,message:"delete cart"});

    }catch (err) {
    await db.query('ROLLBACK');
    console.log(err)
    return res.status(500).json({error:"internal server error"})
  }

}
