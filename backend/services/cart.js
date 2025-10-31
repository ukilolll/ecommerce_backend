import Joi from "joi";
import db from "../services/database.js"

export const validateObj = {
    postCartDtl:Joi.object({
        cartId:Joi.number().required(),
        productId:Joi.number().required(),
        quantity:Joi.number().integer().required()
    })
}

export async function checkCartOwner(cartId, userId) {
  try {
    const result = await db.query(
      "SELECT user_id FROM carts WHERE id = $1",
      [cartId]
    );

    if (result.rows.length === 0) {
      return false;
    }

    const cartOwnerId = result.rows[0].user_id;
    return cartOwnerId === userId;
  } catch (error) {
    console.error("Error checking cart ownership:", error);
    throw error;
  }
}