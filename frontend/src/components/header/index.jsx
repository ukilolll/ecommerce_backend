import "./style.css";

import axios from "axios";
import {useState }from "react";
import { useNavigate } from "react-router-dom";

import cart from "/images/cart.png";
import blank_profile from "/images/blank_profile.jpg";
import search from "/images/search.png";

const Header = () => {  
  const [serchText , setserchText] = useState("")
  const navigatge = useNavigate()

  return (
    <header className="header">
      <div className="header-top">
        <div className="logo">
          <div className="circle">H</div>
          <div className="title">OBBEE</div>
          <img src={cart} alt="Cart" className="cart-icon" />
        </div>

        <div className="search-box">
          <input type="text" 
          placeholder="ค้นหาที่นี่" 
          value={serchText}
          onChange={(e) => setserchText(e.target.value)}
          onKeyDown={(e)=>{
            if (e.key === 'Enter') {
              navigatge(`/?search=${serchText}`)
            }
          }} 
          />
          <img src={search}  alt="Search" className="search-icon"onClick={()=>{navigatge(`/?search=${serchText}`)}}/>
        </div>

        <div className="user" onClick={()=>{navigatge("/profile")}}>
          <img src={blank_profile} alt="Profile" className="profile-img" />
          <span className="username">UkiTannyRiewkiNut</span>
        </div>
      </div>

      <nav className="navbar">
        <div className="nav-item">เครื่องใช้ไฟฟ้า</div>
        <div className="nav-item">ทีวี/เครื่องเสียง</div>
        <div className="nav-item">คอมพิวเตอร์</div>
        <div className="nav-item">มือถือ/แท็บเล็ต</div>
      </nav>
    </header>
  );
};

export default Header;