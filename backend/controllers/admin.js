import { validateObj } from "../services/admin.js";
import validator from "../pkg/validator.js";
import db from "../services/database.js"

//admin updata status
export const updateStatus = async (req, res) => {
  try {
    const {error,errorMsg,body} = validator(validateObj.updateStatus,req.body) 
    if(error){
       return res.status(400).json({errorMsg})
    }

    const result = await db.query(
      `UPDATE orders 
       SET status=$1
       WHERE id=$2 RETURNING *`,
      [body.status, 
        body.orderId, 
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "order not found" });
    }

    return res.json(result.rows);

  } catch (err) {
    console.log(err)
    res.status(500).json({error:"internal server error"})
  }
};
//addmin chekc all users history
export const adminCheckTransition = async (req, res) => {
  try {
    let limit = req.query.limit || 100;
    let offset = req.query.offset || 0

    const result = await db.query(
      `SELECT 
        o.id,
        u.username,
        u.email,
        u.phone_number,
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
      GROUP BY 
        o.id, o.user_id, u.username, u.email, o.status, o.total_amount, o.created_at ,u.phone_number
      ORDER BY o.id
      LIMIT $1 OFFSET $2;
      `,
      [limit , offset]
    );
    res.json(result.rows);
    
  } catch (err) {
    console.log(err)
    res.status(500).json({error:"internal server error"})
  }
};

export const listMember = async (req, res) => {
try{
    let limit = req.query.limit || 100;
    let offset = req.query.offset || 0;

const result = await db.query(
      `SELECT id , username , email , first_name , last_name ,phone_number
      FROM "users" WHERE status = 'member' 
      ORDER BY id LIMIT $1 OFFSET $2`,
      [limit , offset]
    );
    res.json(result.rows);
  } catch (err) {
    console.log(err)
    res.status(500).json({error:"internal server error"})
  }
}

export const authorizeAdmin = async (req, res) => {
  try {
    const {error,errorMsg,body} = validator(validateObj.authorizeAdmin,req.body) 
    if(error){
       return res.status(400).json({errorMsg})
    }

    const result = await db.query(
        `UPDATE "users" SET status= 'admin' WHERE id=$1 RETURNING *`,
        [body.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "user not found" });
    }

    return res.json({success:true,message:"updated"});

  } catch (err) {
    console.log(err)
    res.status(500).json({error:"internal server error"})
  }
}