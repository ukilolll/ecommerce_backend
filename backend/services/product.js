import Joi from "joi";
import multer from "multer";
import path from "path";
import fs from "fs"
import { fileURLToPath } from "url";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../project_db/images/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname); 
  }
});

const fileFilter = (req, file, cb) => {
  console.log("call function multer")

  const ext = path.extname(file.originalname).toLowerCase();
  if (ext === '.jpg' || ext === '.jpeg') {
    cb(null, true);  
  } else {
    cb(new Error('Only .jpg and .jpeg files are allowed!'), false); 
  }
};

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

export const validateObj = {
    postProduct:Joi.object({
        name: Joi.string().min(3).max(100).required(),
        category_id:Joi.number().required(),
        description: Joi.any(),
        price: Joi.number().required(),
        stock: Joi.number().integer().required(),
        image: Joi.any().required()
    }),
    putProduct:Joi.object({
        productId:Joi.number().required(),
        name: Joi.string().min(3).max(100).required(),
        category_id:Joi.number().required(),
        description: Joi.any(),
        price: Joi.number().required(),
        stock: Joi.number().integer().required(),
    }),
    postCategory:Joi.object({
      name: Joi.string().min(3).max(100).required(),
    }),
    changeImage:Joi.object({
      productId:Joi.number().required(),
      image: Joi.any().required()
    })
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const deleteFile = async (fileName) => {
  try {
    const imagePath = path.resolve(__dirname, "../../project_db/images", fileName);
    console.log(imagePath)
    await fs.promises.unlink(imagePath);
    console.log("Deleted invalid file:", fileName);
  } catch (err) {
    console.error("Failed to delete invalid file:", err.message);
  }
};