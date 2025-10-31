import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const handleLogin = async ()=>{
        if (!username || !password) {
            alert("Please enter username and password");
            return;
        }
        let reqData = {
            username:username,
            password:password
          }

        try {
            const res = await axios.post('/api/admin/login',reqData);
            alert('login successful!');
            localStorage.setItem("verifyData", JSON.stringify({state:"login",email:res.data.email,data:reqData}));
            navigate('/otp');
        } catch (err) {

            if (axios.isAxiosError(err)) {
            if (err.response) {
                alert(err.response.data.errorMsg);
            } 
            } else {
            console.error('Generic Error:', err.message);
            }
        }
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Logo Section */}
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-8 text-center">
            <div className="inline-flex items-center justify-center bg-white rounded-xl p-4 shadow-lg mb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">H</span>
                </div>
                <span className="text-2xl font-bold text-gray-800">OBBEE</span>
              </div>
            </div>
            <h2 className="text-white text-2xl font-bold">Admin Portal</h2>
            <p className="text-yellow-100 text-sm mt-2">Sign in to manage your dashboard</p>
          </div>

          {/* Login Form */}
          <div className="p-8">
            <div className="space-y-6">
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  username
                </label>
                <div className="relative">
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="admin@obbee.com"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition"
                  />
                </div>
              </div>

              {/* Forgot Password */}
              <div className="flex items-center justify-end">
                <button className="text-sm text-yellow-600 hover:text-yellow-700 font-medium transition">
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold py-3 rounded-lg hover:from-yellow-500 hover:to-orange-600 transform hover:scale-105 transition duration-200 shadow-lg"
              >
                Sign In
              </button>
            </div>

            {/* Footer */}
            <div className="mt-6 text-center">
            </div>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-center text-gray-600 text-sm mt-6">
          © 2024 OBBEE. All rights reserved.
        </p>
      </div>
    </div>
  );
}