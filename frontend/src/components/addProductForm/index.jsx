import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';

export function ProductForm({ isOpen, onClose, product, onSubmitSuccess ,catagories}) {
  const [formData, setFormData] = useState({
    name: '',
    category_id: '',
    price: '',
    stock: '',
    image_name: '',
    description: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [descError, setDescError] = useState(null);

  useEffect(() => {
    console.log("in form catagory",catagories)
    if (product) {
      setFormData({
        name: product.name || '',
        category_id: product.category_id || '',
        price: product.price || '',
        stock: product.stock || '',
        image_name: product.image_name || '',
        description: product.description
          ? JSON.stringify(product.description, null, 2)
          : ''
      });
    } else {
      setFormData({
        name: '',
        category_id: '',
        price: '',
        stock: '',
        image_name: '',
        description: ''
      });
      setImageFile(null);
    }
  }, [product, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setDescError(null);

    let parsedDescription = {};
    if (formData.description.trim()) {
      try {
        parsedDescription = JSON.parse(formData.description);
        if (typeof parsedDescription !== 'object' || Array.isArray(parsedDescription)) {
          throw new Error('Description must be a JSON object');
        }
      } catch (err) {
        setDescError('⚠️ รูปแบบ description ไม่ถูกต้อง (ต้องเป็น JSON object)');
        setLoading(false);
        return;
      }
    }

    try {
      if (!product) {
        // --- POST /api/product (form-data)
        const form = new FormData();
        form.append('name', formData.name);
        form.append('category_id', formData.category_id);
        form.append('price', formData.price);
        form.append('stock', formData.stock);
        form.append('description', JSON.stringify(parsedDescription));

        if (imageFile) {
          form.append('image', imageFile);
        }

        const res = await axios.post('/api/product', form, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        onSubmitSuccess();
      } else {
        // --- PUT /api/product (JSON)
        const pushData = {
            "productId": product.id,
            "name": formData.name,
            "description":formData.description || null,
            "category_id": parseInt(formData.category_id),
            "price": parseInt(formData.price),
            "stock":parseInt(formData.stock)
        }
        console.log(pushData)
        await axios.put('/api/product', pushData, {
          headers: { 'Content-Type': 'application/json' }
        });

        // --- PATCH /api/product/image ถ้ามีไฟล์ใหม่
        if (imageFile) {
          const imageForm = new FormData();
          imageForm.append('productId', product.id);
          imageForm.append('image', imageFile);
          await axios.patch('/api/product/image', imageForm, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
        }

        onSubmitSuccess();
      }

      onClose();
    } catch (err) {
      console.error('Error submitting product:', err);
      alert('เกิดข้อผิดพลาดในการบันทึกสินค้า');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-yellow-400 to-orange-500 px-6 py-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">
            {product ? 'แก้ไขสินค้า' : 'เพิ่มสินค้าใหม่'}
          </h3>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* ชื่อสินค้า */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อสินค้า *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            {/* หมวดหมู่ */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">หมวดหมู่ *</label>
              <select
                value={formData.category_id}
                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
              >
                {
                  catagories.map((data)=> (
                    <option key={data.id} value={data.id}>
                      {data.name}
                    </option>
                  )
                  )
                }
              </select>
            </div>

            {/* ราคา */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ราคา *</label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            {/* จำนวนในคลัง */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">จำนวนในคลัง *</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
              />
            </div>
          </div>

          {/* อัปโหลดภาพ */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">อัปโหลดรูปภาพ</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="w-full"
            />
            {formData.image_name && !imageFile && (
              <p className="text-gray-500 text-sm mt-1">
                ไฟล์ปัจจุบัน: {formData.image_name}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="border-t pt-4 mt-4">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">รายละเอียด (JSON)</h4>
            <textarea
              rows="5"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder={`ตัวอย่างเช่น:\n{\n  "brand": "Samsung",\n  "color": "Blue"\n}`}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg font-mono focus:ring-2 focus:ring-yellow-400"
            />
            {descError && (
              <p className="text-red-600 text-sm mt-1">{descError}</p>
            )}
          </div>

          {/* ปุ่ม */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg hover:from-yellow-500 hover:to-orange-600"
            >
              {loading ? 'กำลังบันทึก...' : product ? 'บันทึกการแก้ไข' : 'เพิ่มสินค้า'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}