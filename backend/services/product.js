import Joi from "joi";
import multer from "multer";

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
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext === '.jpg' || ext === '.jpeg') {
    cb(null, true);  // ✅ accept file
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
        description: Joi.string().required(),
        price: Joi.number().required(),
        stock: Joi.number().required(),
    }),
    putProduct:Joi.object({
        productId:Joi.string().max(36).required(),
        name: Joi.string().min(3).max(100).required(),
        category_id:Joi.number().required(),
        description: Joi.string().required(),
        price: Joi.number().required(),
        stock: Joi.number().required(),
    }),

}