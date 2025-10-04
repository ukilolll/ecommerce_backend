import db from "../services/database.js";
import {upload , validateObj} from "../services/product.js"
import validator from "../pkg/validator.js";

export const uploadImage = ()=> upload.single("image")

export const getAllProduct = async (req, res) => {
  try {
    let limit;
    if (!req.query.limit){
        limit = 100
    }

    const result = await db.query(
      "SELECT * FROM products ORDER BY id LIMIT $1",
      [limit]
    );
    res.json(result.rows);
  } catch (err) {
    console.log(err)
    res.status(500).json({error:"internal server error"})
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query("SELECT * FROM products WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.log(err)
    res.status(500).json({error:"internal server error"})
  }
};

export const getSearchProduct = async (req, res) => {
  try {
    const { search } = req.params;

    const result = await db.query(
      "SELECT * FROM products WHERE name ILIKE $1",
      [`%${search}%`]
    );
    res.json(result.rows);
  } catch (err) {
    console.log(err)
    res.status(500).json({error:"internal server error"})
  }
};

export const postProduct = async (req, res) => {
  try {
    const {error,errorMsg,body} = validator(validateObj.postProduct,req.body) 
    if(error){
       return res.status(400).json({errorMsg})
    }

    const result = await db.query(
      `INSERT INTO products (name, description, category_id, price, stock, image_name)
       VALUES ($1, $2::jsonb, $3, $4, $5, $6)
       RETURNING *`,
      [body.name, 
        JSON.stringify(body.description), 
        body.category_id, 
        body.price, 
        body.stock, 
        req.filename
        ]
    );

    res.status(201).json(result.rows[0]);

  } catch (err) {
    console.log(err)
    res.status(500).json({error:"internal server error"})
  }
};

export const putProduct = async (req, res) => {
  try {
    const {error,errorMsg,body} = validator(validateObj.postProduct,req.body) 
    if(error){
       return res.status(400).json({errorMsg})
    }

    const result = await db.query(
      `UPDATE products 
       SET name=$1, description=$2::jsonb, category_id=$3, price=$4, stock=$5, image_name=$6
       WHERE id=$7 RETURNING *`,
      [body.name, 
        JSON.stringify(body.description), 
        body.category_id, 
        body.price, 
        body.stock, 
        req.filename, 
        body.productId
        ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(result.rows[0]);

  } catch (err) {
    console.log(err)
    res.status(500).json({error:"internal server error"})
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(
      "DELETE FROM products WHERE id=$1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted", product: result.rows[0] });
  } catch (err) {
    console.log(err)
    res.status(500).json({error:"internal server error"})
  }
};

export const getProductByCategoryId = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(
      "SELECT * FROM products WHERE category_id=$1",
      [id]
    );
    res.json(result.rows);
  } catch (err) {
    console.log(err)
    res.status(500).json({error:"internal server error"})
  }
};

