<template>
  <header class="header">
    <div class="header-top">
      <div class="logo">
        <div class="circle">H</div>
        <div class="title">OBBEE</div>
        <img :src="cart" alt="Cart" class="cart-icon" />
      </div>

      <div class="search-box">
        <input type="text" placeholder="ค้นหาที่นี่" />
        <img :src="search" alt="Search" class="search-icon" />
      </div>

      <div class="user">
        <img :src="blank_profile" alt="Profile" class="profile-img" />
        <span class="username">UkiTannyRiewkiNut</span>
      </div>
    </div>

    <nav class="navbar">
      <div class="nav-item">เครื่องใช้ไฟฟ้า</div>
      <div class="nav-item">ทีวี/เครื่องเสียง</div>
      <div class="nav-item">คอมพิวเตอร์</div>
      <div class="nav-item">มือถือ/แท็บเล็ต</div>
    </nav>
  </header>
</template>

<script>
import cart from "../assets/cart.png";
import blank_profile from "../assets/blank_profile.jpg";
import search from "../assets/search.png";

export default {
  name: "Header",
  data() {
    return { cart, blank_profile, search };
  },
};
</script>

<style scoped>
.header {
  width: 100%;
  background-color: #ffbd09;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 1000;
}

.header-top {
  width: 100%;
  max-width: 1400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #ffbd09;
  flex-wrap: wrap;
}

.logo {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.circle {
  width: 70px;
  height: 70px;
  background-color: #ffa025;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 900;
  font-size: 32px;
}
.title {
  font-weight: 700;
  font-size: 32px;
  color: #000;
}
.cart-icon {
  width: 32px;
  height: 32px;
}

.search-box {
  position: relative;
  flex: 1;
  max-width: 500px;
  margin: 1rem;
}
.search-box input {
  width: 100%;
  padding: 0.8rem 3rem 0.8rem 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
}
.search-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 28px;
  height: 28px;
}

.user {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}
.profile-img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}
.username {
  font-weight: 700;
  font-size: 1.2rem;
}

.navbar {
  width: 100%;
  background-color: #ffa025;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0.8rem;
  gap: 2rem;
}
.nav-item {
  color: #fff;
  font-weight: 700;
  font-size: 1.2rem;
  white-space: nowrap;
  cursor: pointer;
}

@media (max-width: 1024px) {
  .header-top {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .search-box {
    width: 90%;
    max-width: none;
  }

  .navbar {
    gap: 1rem;
  }
}

@media (max-width: 600px) {
  .circle {
    width: 50px;
    height: 50px;
    font-size: 24px;
  }
  .title {
    font-size: 24px;
  }
  .username {
    display: none; 
  }
  .profile-img {
    width: 45px;
    height: 45px;
  }
  .nav-item {
    font-size: 1rem;
  }
}
</style>
