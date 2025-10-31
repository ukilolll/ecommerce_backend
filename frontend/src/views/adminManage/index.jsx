import React, { useState, useEffect } from 'react';
import { Package, ShoppingCart, UserPlus, Menu, X, LogOut, ChevronRight } from 'lucide-react';
import { useUser } from '../../userContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ProductForm } from "../../components/addProductForm";
import { CategoryForm } from "../../components/addcatagoryForm";

export default function AdminDashboard() {
const [currentPage, setCurrentPage] = useState('products');
const [sidebarOpen, setSidebarOpen] = useState(true);
const [catagories ,setCategories] = useState([])
const [orderState , setOrderState] = useState({})
const [data, setData] = useState(null);

  const [loading, setLoading] = useState(false);
  const { isLoading, isLogin } = useUser();
  const navigate = useNavigate();

  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);

  // เมนูหลัก
  const menuItems = [
    { id: 'products', icon: Package, label: 'จัดการสินค้า', endpoint: '/api/products' },
    { id: 'categories', icon: ShoppingCart, label: 'ประเภทสินค้า', endpoint: '/api/categories' },
    { id: 'orders', icon: ShoppingCart, label: 'ดูรายการสั่งซื้อ', endpoint: '/api/admin/order' },
    { id: 'admins', icon: UserPlus, label: 'เพิ่มสิทธิ Admin', endpoint: '/api/admin/allmembers' }
  ];

  // ฟังก์ชันเรียก API เพื่อดึงข้อมูล
  const fetchPageData = async (endpoint) => {
    setLoading(true);
    try {
        console.log(`Fetching data from: ${endpoint}`);
        const res = await axios.get(endpoint);
        setData(res.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (pageId) => {
    setCurrentPage(pageId);
  };
  // Handle Category Submit (เพิ่ม/แก้ไข)
  const handleCategorySubmit = async (categoryData) => {
    try {
        console.log(categoryData)
    await axios.post('/api/category', categoryData);
    console.log('Category added:', categoryData);

      
      setIsCategoryFormOpen(false);
      setEditingCategory(null);
      fetchPageData('/api/categories');
    } catch (error) {
      console.error('Error submitting category:', error);
      alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsProductFormOpen(true);
  };


   const fetchData = async () => {
    if (isLoading) return;
    if (!isLogin) {
      navigate("/admin/login");
      return;
    }

    try {
      const res = await axios.post(`/api/isadmin`);
      const currentMenu = menuItems.find(item => item.id === currentPage);
      if (currentMenu) {
        fetchPageData(currentMenu.endpoint);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          console.log('Not admin');
          navigate("/admin/login");
        }
      } else {
        console.error('Generic Error:', err.message);
      }
    }
  };
  const fetchCatagory = async()=>{
    const res = await axios.get("/api/categories")
    setCategories(res.data)
  }
  useEffect(() => {
    fetchData();
    fetchCatagory();
  }, [isLogin, isLoading, currentPage]);



  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
        </div>
      );
    }

    switch (currentPage) {
      case 'products':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">จัดการสินค้า</h2>
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                onClick={() => {
                  setEditingProduct(null);
                  setIsProductFormOpen(true);
                }}
              >
                + เพิ่มสินค้าใหม่
              </button>
            </div>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ชื่อสินค้า</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ราคา</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">คลัง</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">จัดการ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data?.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">{product.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{product.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">฿{product.price}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{product.stock} ชิ้น</td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          className="text-blue-600 hover:text-blue-800 mr-3"
                          onClick={() => handleEditProduct(product)}
                        >
                          แก้ไข
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Product Form Modal */}
            <ProductForm
              isOpen={isProductFormOpen}
              onClose={() => {
                setIsProductFormOpen(false);
                setEditingProduct(null);
              }}
              product={editingProduct}
              onSubmitSuccess={()=>{ fetchPageData('/api/products');}}
              catagories={catagories}
            />
          </div>
        );

      case 'categories':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">ประเภทสินค้า</h2>
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                onClick={() => {
                  setEditingCategory(null);
                  setIsCategoryFormOpen(true);
                }}
              >
                + เพิ่มประเภทใหม่
              </button>
            </div>

            <div className="space-y-3">
                {data?.map((category) => (
                    <div
                    key={category.id}
                    className="bg-white border border-gray-200 rounded-lg shadow-sm px-4 py-3 hover:bg-gray-50 transition"
                    >
                    <p className="text-sm text-gray-500">ID: {category.id}</p>
                    <h3 className="text-base font-medium text-gray-800">
                        {category.name}
                    </h3>
                    </div>
                ))}
            </div>

            {/* Category Form Modal */}
            <CategoryForm
              isOpen={isCategoryFormOpen}
              onClose={() => {
                setIsCategoryFormOpen(false);
                setEditingCategory(null);
              }}
              category={editingCategory}
              onSubmit={handleCategorySubmit}
            />
          </div>
        );

      case 'orders':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">รายการสั่งซื้อ</h2>
            <div className="space-y-4">
              {data?.map((order) => (
                <div key={order.id} className="bg-white rounded-lg shadow overflow-hidden">
                  {/* Order Header */}
                  <div className="bg-gray-50 px-6 py-4 border-b">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          Order #{order.id}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {order.username} ({order.email})
                        </p>
                        <p className="text-sm text-gray-600">
                          โทร: {order.phone_number}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="px-3 py-1 rounded-full text-sm font-medium"> 
                        {order.status}
                        </span>
                        <p className="text-lg font-bold text-gray-800 mt-2">
                          ฿{parseFloat(order.total_amount).toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(order.created_at).toLocaleDateString('th-TH', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Products List */}
                  <div className="px-6 py-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">รายการสินค้า:</h4>
                    <div className="space-y-2">
                      {order.products?.map((product, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                          <div className="flex items-center gap-3">
                            <span className="text-gray-600 font-medium">
                              {product.name}
                            </span>
                            <span className="text-sm text-gray-500">
                              (ID: {product.product_id})
                            </span>
                          </div>
                          <span className="text-gray-800 font-medium">
                            จำนวน: {product.quantity} ชิ้น
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="bg-gray-50 px-6 py-3 border-t">

                    <form
                        onSubmit={async (e)=>{
                            e.preventDefault();
                                try {
                                await axios.patch("/api/admin/order/status", {
                                    "orderId":orderState.orderId,
                                    "status":orderState.status,
                                });
                                alert("เปลี่ยนสถานะเรียบร้อยแล้ว");
                                fetchPageData("/api/admin/order")
                                } catch (err) {
                                console.error(err);
                                alert("เกิดข้อผิดพลาดในการเปลี่ยนสถานะ");
                                }
                            }
                        }
                        className="flex items-center gap-3 mt-2"
                        >
                        <select
                            value={order.status}
                            onChange={ (e) => setOrderState({"orderId":order.id,"status":e.target.value}) }
                            className="border border-gray-300 rounded-md px-2 py-1"
                        >
                            <option value="paid">paid</option>
                            <option value="shipping">shipping</option>
                            <option value="delivered">delivered</option>
                        </select>

                        <button
                            type="submit"
                            className="text-blue-600 hover:text-blue-800"
                        >
                            เปลี่ยนสถานะคำสั่งซื้อ
                        </button>
                    </form>

                  </div>
                </div>
              ))}
            </div>
          </div>
        );

  case 'admins':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">จัดการสิทธิ์ Admin</h2>
            </div>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Username</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">อีเมล</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ชื่อ-นามสกุล</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">เบอร์โทร</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">สิทธิ์</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">จัดการ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data?.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">{user.username}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{user.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {user.first_name && user.last_name 
                          ? `${user.first_name} ${user.last_name}` 
                          : '-'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {user.phone_number || '-'}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          user.is_admin 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {user.is_admin ? 'Admin' : 'User'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                          <button 
                            onClick={async () => {
                              try {
                                await axios.patch('/api/admin/toadmin', { userId: user.id });
                                fetchPageData('/api/admin/allmembers');
                              } catch (error) {
                                console.error('Error adding admin:', error);
                                alert('เกิดข้อผิดพลาดในการเพิ่มสิทธิ์');
                              }
                            }}
                            className="text-blue-600 hover:text-blue-800 font-medium"
                          >
                            เพิ่มสิทธิ์ Admin
                          </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );


      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-yellow-400 to-orange-500 transition-all duration-300 flex flex-col`}>
        {/* Logo */}
        <div className="p-4 flex items-center justify-between border-b border-yellow-500">
          {sidebarOpen ? (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-yellow-500 font-bold text-lg">H</span>
              </div>
              <span className="text-white font-bold text-xl">OBBEE</span>
            </div>
          ) : (
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mx-auto">
              <span className="text-yellow-500 font-bold text-lg">H</span>
            </div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white hover:bg-yellow-500 p-1 rounded">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handlePageChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition ${
                  currentPage === item.id
                    ? 'bg-white text-yellow-600 shadow-lg'
                    : 'text-white hover:bg-yellow-500'
                }`}
              >
                <Icon size={20} />
                {sidebarOpen && <span className="font-medium">{item.label}</span>}
                {sidebarOpen && currentPage === item.id && <ChevronRight size={16} className="ml-auto" />}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-yellow-500">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-yellow-500 rounded-lg transition">
            <LogOut size={20} />
            {sidebarOpen && <span className="font-medium">ออกจากระบบ</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}