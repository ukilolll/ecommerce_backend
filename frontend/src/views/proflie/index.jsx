import styles from "./styles"

import Header from "../../components/header"
import Footer from "../../components/footer"
import blank_profile from "/images/blank_profile.jpg"

import React, { useState ,useEffect} from "react";
import axios from "axios";
import {useUser} from "../../context.jsx"
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const navigate = useNavigate()
  const {isLogin,userData , isLoading} = useUser()
  const [profileImage, setProfileImage] = useState(null);
  const [form, setForm] = useState({
      "username": "",
      "email": "",
      "profile_image": "",
      "first_name":"",
      "last_name":"",
      "phone_number":"",
      "date_of_birth":"",
  });

  const handleChange = async (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  setProfileImage(URL.createObjectURL(file));

  const formData = new FormData();
  formData.append("image", file);

  try {
    const res = await axios.post("/api/user/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("✅ Upload success:", res.data);
    alert("อัปโหลดรูปภาพสำเร็จแล้ว!");


  } catch (err) {
    console.error("❌ Upload failed:", err);
    alert("อัปโหลดรูปภาพไม่สำเร็จ");
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(form)
        const res = await axios.patch("/api/user/info",{
        first_name: form.first_name || "",
        last_name: form.last_name || "",
        phone_number: form.phone_number || "",
        date_of_birth: form.date_of_birth || "",
        });

      console.log(res.data);
      alert("อัปโหลดข้อมูลสำเร็จแล้ว!");
    } catch (err) {

        if (axios.isAxiosError(err)) {
        if (err.response) {
            alert(err.response.data.errorMsg);
            console.log(err.response.data)
        } 
        } else {
        console.error('Generic Error:', err.message);
        }
    }

  };

  const getUserData = async ()=>{
    if (isLoading) return; 
    if(!isLogin){
      navigate("/login")
      return
    };
    console.log(userData)

    if (userData.profile_image){
      setProfileImage(`http://localhost:3000/user/profile/${userData.profile_image}`)
    }
    userData.date_of_birth = userData.date_of_birth.substring(0,10)
    setForm(userData);
  }


  useEffect(() => {
      getUserData();
  }, [isLogin,isLoading,userData]);

  return (
<>
  <Header />

    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.profileContainer}>
          <img
            src={profileImage || blank_profile}
            alt="profile"
            style={styles.profileImage}
          />
          <label style={styles.uploadButton}>
            อัพโหลดรูปโปรไฟล์
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleUpload}
            />
          </label>
          <div style={styles.username}>{form.username}</div>
        </div>

        <div style={styles.menu}>
          <div style={styles.menuItem}>บัญชีของฉัน</div>
          <div style={{ ...styles.menuItem, color: "#ffa000" }}>ข้อมูลส่วนตัว</div>
          <div style={styles.menuItem}>ที่อยู่</div>
        </div>
      </div>

      <div style={styles.main}>
        <h3>ข้อมูลส่วนตัว</h3>
        <p style={{ fontSize: "12px", color: "#666" }}>
          ข้อมูลส่วนตัวของคุณจะช่วยเพิ่มความปลอดภัยของบัญชีผู้ใช้
        </p>

        <div style={styles.row}>
          <div style={styles.inputGroup}>
            <label>ชื่อผู้ใช้</label>
            <div style={styles.textValue}>{form.username || "-"}</div>
          </div>

          <div style={styles.inputGroup}>
            <label>อีเมล</label>
            <div style={styles.textValue}>{form.email || "-"}</div>
          </div>
        </div>

        {/* form */}
        <form style={styles.form} onSubmit={handleSubmit}>

          <div style={styles.row}>
            <div style={styles.inputGroup}>
              <label>ซื่อจริง</label>
              <input
                type="text"
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <label>นามสกุล</label>
              <input
                type="text"
                name="last_name"
                value={form.last_name}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.row}>
            <div style={styles.inputGroup}>
              <label>วันเดือนปีเกิด</label>
              <input
                type="date"
                name="date_of_birth"
                value={form.date_of_birth}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <label>เบอร์โทรศัพท์</label>
              <input
                type="tel"
                name="phone_number"
                value={form.phone_number}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
          </div>

          <button type="submit" style={styles.saveButton}>
            บันทึก
          </button>
        </form>

      </div>
    </div>

  <Footer />
</>
 );
}



