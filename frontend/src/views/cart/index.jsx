// import Header from "../../components/header"
// import Footer from "../../components/footer"
// import styles from "./styles";
import cart from "/images/cart.png"
import { CartItem } from "../../components/cartList";

import React, { useState , useEffect } from "react";
import {useUser} from "../../userContext"
import { useCart } from "../../cartContext";

export default function CartPage() {
  const {isLoading , isLogin} = useUser()
  const {cartDetail , isLoadCart} = useCart()
  const [cartData, setCartData] = useState([]);

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartData(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const calculateTotal = () => {
    return cartData.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };
  
  
    useEffect(() => {
      const getCartData = async ()=>{
        setCartData(cartDetail)
      }

      getCartData();
    }, [isLogin,isLoading,isLoadCart]);

return (
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
            />
          ))}
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-xl font-semibold text-gray-800">
              รวมทั้งหมด : {calculateTotal().toLocaleString()}
            </div>
            
            <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
              <img src={cart} className="w-5 h-5" />
              ชำระเงิน
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

