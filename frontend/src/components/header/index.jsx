import "./style.css";

import axios from "axios";
import {useState ,useEffect }from "react";
import { useNavigate } from "react-router-dom";

import cart from "/images/cart.png";
import blank_profile from "/images/blank_profile.jpg";
import search from "/images/search.png";
import {useUser} from "../../context"

const Header = () => { 
  const {isLogin} = useUser() 
  const [serchText , setserchText] = useState("")
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate()

  const handleSelect = (e) => {
    const selectedId = e.target.value;
      if (selectedId) {
        navigate(`/?category=${selectedId}`);
    }
  }

    useEffect(() => {
      const data = JSON.parse(localStorage.getItem("catagoryData"))
      setCategories(data);
  }, []);

  return (
    <header className="header">
      <div className="header-top">
        <div className="logo">
          <div className="circle">H</div>
          <div className="title">OBBEE</div>
        </div>

        <div className="search-box">
          <input type="text" 
          placeholder="ค้นหาที่นี่" 
          value={serchText}
          onChange={(e) => setserchText(e.target.value)}
          onKeyDown={(e)=>{
            if (e.key === 'Enter') {
              navigate(`/?search=${serchText}`)
            }
          }} 
          />
          <img src={search}  alt="Search" className="search-icon" onClick={()=>{navigate(`/?search=${serchText}`)}}/>
        </div>

      <div className="user">
        <img src={cart} alt="Cart" className="cart-icon" />
        <div className="profile" onClick={()=>{navigate("/profile")}}>
          <img src={blank_profile} alt="Profile" className="profile-img" />
            {isLogin ? (
              <span className="username">จัดการบัญชีของคุณ</span>
            ) : (
              <span className="username">login/register</span>
            )}
        </div>
      </div>

      </div>

      <nav className="navbar">
        <div className="nav-item" onClick={()=>{navigate(`/?category=${1}`)}}>Electronics</div>
        <div className="nav-item" onClick={()=>{navigate(`/?category=${2}`)}}>Home Appliances</div>
        <div className="nav-item" onClick={()=>{navigate(`/?category=${3}`)}}>Kitchen Appliances</div>

        <div className="nav-item">
          <select onChange={handleSelect} defaultValue="">
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

      </nav>
    </header>
  );
};

export default Header;