import axios from "axios";

const API = axios.create({
  baseURL: "/api", 
  withCredentials: true,
});

export const getCartId = async () => API.get("/carts/chkcart");

export const createCart = async () => API.post("/carts/addcart");

export const postCartItem = async (cartId, productId, quantity = 1) =>
  API.post("/carts/addcartdtl", { cartId, productId, quantity });

export const sumCart = async (cartId) => API.get(`/carts/sumcart/${cartId}`);

export const getCartDetail = async (cartId) => API.get(`/carts/getcartdtl/${cartId}`);

export const deleteCart = async (cartId) => API.delete(`/carts/deleteCart/${cartId}`);