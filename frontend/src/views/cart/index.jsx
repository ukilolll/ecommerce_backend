import Header from "../../components/header"
import Footer from "../../components/footer"
// import styles from "./styles";
import cart from "/images/cart.png"
import { CartItem } from "../../components/cartList";

import React, { useState , useEffect } from "react";
import {useUser} from "../../userContext"
import { useCart } from "../../cartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const {isLoading , isLogin} = useUser()
  const {cartId , cartDetail , isLoadCart , reload} = useCart()
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate()

  const handleUpdateQuantity = async (cartId,productId, quantity) => {
    console.log("call handle update",cartId,productId, quantity)
    if (quantity < 0) return;

    try{
    const res = await axios.post(`/api/carts/addcartdtl`,{
      cartId,
      productId,
      quantity
    });
    reload()
  } catch (error) {
    console.error("Error fetching:", error);
  }
    // setCartData(items =>
    //   items.map(item =>
    //     item.id === id ? { ...item, quantity: newQuantity } : item
    //   )
    // );
  };

  const calculateTotal = () => {
    return cartData.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  
  const makeOrder = async () =>{
    
    try{
    const res = await axios.post(`/api/order/${cartId}`);
    console.log("makeOrder")
    navigate("/")
    reload()
    } 
    catch (error) {
    console.error("Error fetching:", error);
    }
  }

    useEffect(() => {
      const getCartData = async ()=>{
        setCartData(cartDetail)
      }

      getCartData();
    }, [isLogin,isLoading,isLoadCart]);

return (
  <>
  <Header/>

    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">ตะกร้าสินค้า</h1>
        
      <div className="space-y-4">
          <div className="grid grid-cols-12 gap-4 px-4 pb-2 border-b border-gray-300 font-semibold text-gray-700">
            <div className="col-span-6">รายการสินค้า</div>
            <div className="col-span-3 text-center">จำนวน</div>
            <div className="col-span-3 text-right">ราคา</div>
          </div>
          
          {cartData.map((item) => (
            <CartItem 
              key={item.product_id} 
              item={item} 
              onUpdateQuantity={ handleUpdateQuantity }
              cartId = {cartId}
            />
          ))}
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-xl font-semibold text-gray-800">
              รวมทั้งหมด : {calculateTotal().toLocaleString()}
            </div>
            
            <button 
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            onClick={makeOrder}
            >
              <img src={cart} className="w-5 h-5" />
              ชำระเงิน
            </button>
          </div>
        </div>
      </div>
    </div>

  <Footer/>
  </>
  );
}

