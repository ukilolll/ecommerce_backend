import db from "../services/database.js";
import {deleteFile, upload , validateObj} from "../services/product.js"
import validator from "../pkg/validator.js";


export function uploadImage() {return upload.single("image")}

export const getAllProduct = async (req, res) => {
  try {
    let limit = req.query.limit || 100;
    let offset = req.query.offset || 0;

    const result = await db.query(
      "SELECT * FROM products ORDER BY id LIMIT $1 OFFSET $2",
      [limit , offset]
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
//admin can update stock in this route lol I am lazy
export const postProduct = async (req, res) => {
  try {
    const {error,errorMsg,body} = validator(validateObj.postProduct,{...req.body,image:req.file});
    if(error){
      await deleteFile(req.file?.filename); 
       return res.status(400).json({errorMsg})
    }

    let description;
    try{
      description = JSON.parse(body.description)
    }catch(err){
      description = null
    }

    const result = await db.query(
      `INSERT INTO products (name, description, category_id, price, stock, image_name)
       VALUES ($1, $2::jsonb, $3, $4, $5, $6)
       RETURNING *`,
      [body.name, 
        description,
        body.category_id, 
        body.price, 
        body.stock, 
        req.file.filename
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
    const {error,errorMsg,body} = validator(validateObj.putProduct,req.body) 
    if(error){
       return res.status(400).json({errorMsg})
    }
    console.log(body)
    const result = await db.query(
      `UPDATE products 
       SET name=$1, description=$2::jsonb, category_id=$3, price=$4, stock=$5
       WHERE id=$6 RETURNING *`,
      [body.name, 
        body.description, 
        body.category_id, 
        body.price, 
        body.stock, 
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

export const changeImageProduct = async (req, res) => {
  try{
    const {error,errorMsg,body} = validator(validateObj.changeImage,{...req.body,image:req.file});
    if(error){
      await deleteFile(req.file?.filename); 
      return res.status(400).json({errorMsg})
    }

    const oldImage = await db.query(
      `SELECT image_name FROM products WHERE id = $1`,
      [body.productId]
    );

    if (oldImage.rows.length === 0) {
      await deleteFile(req.file?.filename);
      return res.status(404).json({ message: "Product not found" });
    }

    const result = await db.query(
      `UPDATE products 
       SET image_name=$1
       WHERE id=$2 RETURNING *`,
      [ req.file.filename, body.productId]
    );

    await deleteFile(oldImage.rows[0].image_name);

    res.json({success:true,message:"image change"});

  } catch (err) {
    console.log(err)
    res.status(500).json({error:"internal server error"})
  }
}

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

export const getCategories = async (req,res) =>{
    try {
    const result = await db.query(
      "SELECT * FROM categories ORDER BY id",
    );
    res.json(result.rows);
  } catch (err) {
    console.log(err)
    res.status(500).json({error:"internal server error"})
  }
};

export const postCategory = async (req,res) => {
  try {
    const {error,errorMsg,body} = validator(validateObj.postCategory,req.body) 
    if(error){
       return res.status(400).json({errorMsg})
    }

    const result = await db.query(
      `INSERT INTO categories (name)
       VALUES ($1)
       RETURNING *`,
      [body.name]
    );

    res.status(201).json(result.rows[0]);

  } catch (err) {
    console.log(err)
    res.status(500).json({error:"internal server error"})
  }
};

export const deleteCategory = async (req,res) => {
    try {
    const { id } = req.params;
    const result = await db.query(
      "DELETE FROM categories WHERE id=$1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
  
    await deleteFile(result.rows[0].image_name)
    res.json({ message: "Product deleted", product: result.rows[0] });
  } catch (err) {
    console.log(err)
    res.status(500).json({error:"internal server error"})
  }
};
