import { createContext, useContext, useEffect, useState } from "react";
import { getCartId, createCart, sumCart , getCartDetail  } from "./api/cart.js";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartId, setCartId] = useState(null);
  const [cartDetail, setcartDetail] = useState([]);
  const [isLoadCart , setIsLoadCart] = useState(true); 

  const loadCart = async () => {
    try {
      let res = await getCartId();
      if (res.data.cartExist) {
        const newCart = await createCart();
        setCartId(newCart.data.cartId);
      }else{
        setCartId(res.data.cartId);
      }

      res  = await getCartDetail(res.data.cartId);
      setcartDetail(res.data);
      console.log(res.data)
    } catch (err) {
      console.error(err);
    }finally{
      setIsLoadCart(false)
    }
  };

  const addCart =  async(data={cartId ,productId , quantity})=>{
    try{
      await axios.post("/api/carts/addcartdtl",data);
    } catch(err){
      console.error(err);
    }
  }

  useEffect(() => {
    loadCart();
  } , []) 

  return (
    <CartContext.Provider value={{ isLoadCart ,cartId, cartDetail , sumCart ,addCart, reload: loadCart }}>
      {children} 
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);