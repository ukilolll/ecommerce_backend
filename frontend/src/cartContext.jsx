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
      setIsLoadCart(true)
      let res = await getCartId();
      console.log("get cartid data:",res.data)

      let currentCartId;
      if (res.data.cartExist) {
        currentCartId = res.data.cartId;
        setCartId(res.data.cartId);
      }else{
        const newCart = await createCart();
        currentCartId = newCart.data.cartId;
        setCartId(newCart.data.cartId);
      }

      let res2  = await getCartDetail(currentCartId);
      setcartDetail(res2.data);
      console.log(res2.data)
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