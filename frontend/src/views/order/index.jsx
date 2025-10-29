import Header from "../../components/header"
import Footer from "../../components/footer"

import React, { useState , useEffect } from 'react';
import { useUser } from '../../userContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function OrderResultsPage() {
    const [orderData, setOrderData] = useState([])
    const {isLoading,isLogin} = useUser(null)
    const navigate = useNavigate()

    const getOrderData = async ()=>{
      if (isLoading) return; 
      if(!isLogin){
        navigate("/login")
        return
      };
    try{
        const res = await axios.get(`/api/order?offset=0&limit=100`);
        setOrderData(res.data);
        console.log(res.data)
    } 
        catch (error) {
        console.error("Error fetching:", error);
    }

    }
  
    useEffect(() => {
        getOrderData();
    }, [isLogin,isLoading]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB'
    }).format(amount);
  };

  const getStatusConfig = (status) => {
    if (status === 'paid') {
      return {
        label: 'ชำระเงินแล้ว',
        bgColor: 'bg-green-100',
        textColor: 'text-green-800',
        borderColor: 'border-green-300'
      };
    }
    return {
      label: 'รอชำระเงิน',
      bgColor: 'bg-amber-100',
      textColor: 'text-amber-800',
      borderColor: 'border-amber-300'
    };
  };

  return (
    <>
    <Header />

    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">ประวัติการสั่งซื้อ</h1>
          <p className="text-gray-600">รายการหรัสคำสั่งซื้อทั้งหมดของคุณ</p>
        </div>

        <div className="space-y-6">
          {orderData.map((order) => {
            const statusConfig = getStatusConfig(order.status);

            return (
              <div
                key={order.order_id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-orange-100"
              >
                <div className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4">
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center space-x-3">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                      <span className="text-white font-semibold text-lg">
                        รหัสคำสั่งซื้อ  {order.order_id}
                      </span>
                    </div>
                    <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${statusConfig.bgColor} border ${statusConfig.borderColor}`}>
                      {order.status === 'paid' ? (
                        <svg className={`w-4 h-4 ${statusConfig.textColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className={`w-4 h-4 ${statusConfig.textColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                      <span className={`text-sm font-semibold ${statusConfig.textColor}`}>
                        {statusConfig.label}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center text-gray-600 mb-4">
                    <svg className="w-5 h-5 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm">{formatDate(order.created_at)}</span>
                  </div>

                  <div className="border-t border-orange-100 pt-4 mb-4">
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                      รายการสินค้า
                    </h3>
                    <div className="space-y-3">
                      {order.products.map((product) => (
                        <div
                          key={product.product_id}
                            onClick={()=>{navigate(`/product/detail/${product.product_id}`)}}
                          className="flex items-center justify-between bg-orange-50 rounded-lg p-4 hover:bg-orange-100 transition-colors border border-orange-100"
                        >
                          <div className="flex-1">
                            <p className="font-medium text-gray-800">{product.name}</p>
                            <p className="text-sm text-gray-500">รหัสสินค้า: {product.product_id}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="px-3 py-1 bg-orange-500 text-white rounded-full text-sm font-semibold shadow-sm">
                              x{product.quantity}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-orange-100 pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-700">
                        <svg className="w-5 h-5 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                        <span className="font-semibold">ยอดรวมทั้งหมด</span>
                      </div>
                      <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                        {formatCurrency(parseFloat(order.total_amount))}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {orderData.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg border border-orange-100">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <p className="text-gray-500 text-lg">ไม่มีคำสั่งซื้อ</p>
          </div>
        )}
      </div>
    </div>

  <Footer/>
  </>    
  );
}