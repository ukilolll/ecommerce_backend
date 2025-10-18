<template>
  <div class="login-HOBBEE">
    <div class="background-main" />
    <div class="box-login" />
    <div class="text-wrapper">OBBEE</div>
    <div class="import-image" />
    <div class="hcart" />
    <div class="div">H</div>
    <img class="cart" alt="Cart" :src="cart" />
    <div class="text-wrapper-2">WELCOME BACK</div>
    <p class="p">Please login to your account</p>
    <div class="input-password" />
    <div class="line-loginorwith" />
    <div class="text-wrapper-3">
        <input
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Password"
          class="input-password"
        />
        <img
          class="eye-password"
          alt="Toggle password"
          :src="eyePassword"
          @click="togglePassword"
        />
      </div>
    <div class="group">
        <button class="button-login" @click="login">login</button>
    </div>
    <div class="text-wrapper-5">Forgot password?</div>
    <img class="eye-password" alt="Eye password" :src="eyePassword" />
    <div class="rectangle" />
    <div class="text-wrapper-6">Or Login with</div>
    <div class="box-logo-google" />
    <div class="box-logo-facebook" />
    <img class="logo-google" alt="Logo google" :src="logoGoogle" />
    <img class="logo-facebook" alt="Logo facebook" :src="logoFacebook" />
    <div class="text-wrapper-7">Google</div>
    <div class="text-wrapper-8">Facebook</div>
    <div class="group-2">
      <div class="text-wrapper-9">Don&apos;t have an account?</div>
      <div class="text-wrapper-10">Sign up</div>
    </div>
    <img class="image" alt="Image" :src="big_cart" />
    <div class="group-3">
      <div class="input-username" />
      <div class="text-wrapper-11">
        <input
          v-model="username"
          type="text"
          placeholder="Username"
          class="input-username"
        />
      </div>
    </div>
  </div>
</template>

<script>
import cart from "../assets/cart.png";
import eyePassword from "../assets/eye-password.png";
import big_cart from "../assets/big-cart.png";
import logoFacebook from "../assets/logo-facebook.png";
import logoGoogle from "../assets/logo-google.png";

import axios from "axios";

export default {
  data() {
    return {
      cart,
      eyePassword,
      big_cart,
      logoFacebook,
      logoGoogle,
    };
  },

  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    async login() {
        if (!this.username || !this.password) {
            alert("Please enter username and password");
            return;
        }
        let reqData = {
            username:this.username,
            password:this.password
          }

        try {
            const res = await axios.post('/api/login',reqData);
            console.log(res.data);
            alert('login successful!');
            localStorage.setItem("verifyData", JSON.stringify({state:"login",email:res.data.email,data:reqData}));
            this.$router.push('/otp');
        } catch (err) {

            if (axios.isAxiosError(err)) {
            if (err.response) {
                alert(error.response.data.errorMsg);
            } 
            } else {
            console.error('Generic Error:', err.message);
            }
        }
    },

}
}
</script>

<style>
.login-HOBBEE {
  background-color: #ffffff;
  min-height: 1470px;
  min-width: 2060px;
  position: relative;
  width: 100%;
}

.login-HOBBEE .background-main {
  background-color: #f4f4f4;
  height: 1470px;
  left: 0;
  position: absolute;
  top: 0;
  width: 2060px;
}

.login-HOBBEE .box-login {
  background-color: #ffffff;
  border-radius: 20px;
  height: 1000px;
  left: 180px;
  position: absolute;
  top: 235px;
  width: 1700px;
}

.login-HOBBEE .text-wrapper {
  color: #000000;
  font-family: "Inter-Bold", Helvetica;
  font-size: 40px;
  font-weight: 700;
  left: 1466px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 361px;
  white-space: nowrap;
}

.login-HOBBEE .import-image {
  background-color: #ffa025;
  border-radius: 40px;
  height: 900px;
  left: 269px;
  position: absolute;
  top: 285px;
  width: 700px;
}

.login-HOBBEE .hcart {
  aspect-ratio: 1;
  background-color: #ffa025;
  border-radius: 50px;
  height: 100px;
  left: 1354px;
  position: absolute;
  top: 335px;
  width: 100px;
}

.login-HOBBEE .div {
  color: #000000;
  font-family: "Inter-Black", Helvetica;
  font-size: 40px;
  font-weight: 900;
  left: 1374px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 361px;
  white-space: nowrap;
}

.login-HOBBEE .cart {
  aspect-ratio: 1;
  height: 35px;
  left: 1404px;
  object-fit: cover;
  position: absolute;
  top: 367px;
  width: 35px;
}

.login-HOBBEE .text-wrapper-2 {
  color: #000000;
  font-family: "Inter-Bold", Helvetica;
  font-size: 48px;
  font-weight: 700;
  left: 1267px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 459px;
}

.login-HOBBEE .p {
  color: #000000;
  font-family: "Inter-Bold", Helvetica;
  font-size: 20px;
  font-weight: 700;
  left: 1328px;
  letter-spacing: 0;
  line-height: normal;
  opacity: 0.5;
  position: absolute;
  top: 525px;
  white-space: nowrap;
}

.login-HOBBEE .input-password {
  background-color: #ececec;
  border-radius: 20px;
  height: 100px;
  left: 1166px;
  position: absolute;
  top: 711px;
  width: 600px;
}

.login-HOBBEE .line-loginorwith {
  background-color: #ececec;
  border-radius: 20px;
  height: 3px;
  left: 1166px;
  position: absolute;
  top: 1003px;
  width: 600px;
}

.login-HOBBEE .text-wrapper-3 {
  color: #000000;
  font-family: "Inter-Bold", Helvetica;
  font-size: 32px;
  font-weight: 700;
  left: 1223px;
  letter-spacing: 0;
  line-height: normal;
  opacity: 0.5;
  top: 741px;
}

.login-HOBBEE .group {
  height: 100px;
  left: 1216px;
  position: absolute;
  top: 864px;
  width: 502px;
}

.login-HOBBEE .button-login {
  background-color: #ffa025;
  border-radius: 20px;
  height: 100px;
  left: 0;
  position: absolute;
  top: 0;
  width: 500px;
}

.login-HOBBEE .text-wrapper-4 {
  color: #ffffff;
  font-family: "Inter-Bold", Helvetica;
  font-size: 20px;
  font-weight: 700;
  left: 227px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 38px;
  white-space: nowrap;
}

.login-HOBBEE .text-wrapper-5 {
  color: #000000;
  font-family: "Inter-Bold", Helvetica;
  font-size: 20px;
  font-weight: 700;
  left: 1634px;
  letter-spacing: 0;
  line-height: normal;
  opacity: 0.5;
  position: absolute;
  top: 825px;
  white-space: nowrap;
}

.login-HOBBEE .eye-password {
  aspect-ratio: 1;
  height: 30px;
  left: 1710px;
  object-fit: cover;
  position: absolute;
  top: 746px;
  width: 30px;
}

.login-HOBBEE .rectangle {
  background-color: #ffffff;
  height: 9px;
  left: 1416px;
  position: absolute;
  top: 1001px;
  width: 100px;
}

.login-HOBBEE .text-wrapper-6 {
  color: #000000;
  font-family: "Inter-Bold", Helvetica;
  font-size: 15px;
  font-weight: 700;
  left: 1417px;
  letter-spacing: 0;
  line-height: normal;
  opacity: 0.5;
  position: absolute;
  top: 994px;
  white-space: nowrap;
}

.login-HOBBEE .box-logo-google {
  border: 2px solid;
  border-color: #ecececcc;
  border-radius: 20px;
  height: 100px;
  left: 1192px;
  position: absolute;
  top: 1042px;
  width: 270px;
}

.login-HOBBEE .box-logo-facebook {
  border: 2px solid;
  border-color: #ecececcc;
  border-radius: 20px;
  height: 100px;
  left: 1470px;
  position: absolute;
  top: 1042px;
  width: 270px;
}

.login-HOBBEE .logo-google {
  aspect-ratio: 1;
  height: 30px;
  left: 1270px;
  object-fit: cover;
  position: absolute;
  top: 1077px;
  width: 30px;
}

.login-HOBBEE .logo-facebook {
  aspect-ratio: 1;
  height: 30px;
  left: 1533px;
  object-fit: cover;
  position: absolute;
  top: 1077px;
  width: 30px;
}

.login-HOBBEE .text-wrapper-7 {
  color: #000000;
  font-family: "Inter-Bold", Helvetica;
  font-size: 20px;
  font-weight: 700;
  left: 1314px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 1080px;
  white-space: nowrap;
}

.login-HOBBEE .text-wrapper-8 {
  color: #000000;
  font-family: "Inter-Bold", Helvetica;
  font-size: 20px;
  font-weight: 700;
  left: 1577px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 1080px;
  white-space: nowrap;
}

.login-HOBBEE .group-2 {
  display: flex;
  gap: 13px;
  height: 24px;
  left: 1308px;
  position: absolute;
  top: 1166px;
  width: 320px;
}

.login-HOBBEE .text-wrapper-9 {
  color: #000000;
  font-family: "Inter-Bold", Helvetica;
  font-size: 20px;
  font-weight: 700;
  height: 24px;
  letter-spacing: 0;
  line-height: normal;
  white-space: nowrap;
  width: 229px;
}

.login-HOBBEE .text-wrapper-10 {
  color: #ffa025;
  font-family: "Inter-Bold", Helvetica;
  font-size: 20px;
  font-weight: 700;
  height: 24px;
  letter-spacing: 0;
  line-height: normal;
  white-space: nowrap;
  width: 74px;
}

.login-HOBBEE .image {
  aspect-ratio: 1;
  height: 401px;
  left: 419px;
  object-fit: cover;
  position: absolute;
  top: 534px;
  width: 401px;
}

.login-HOBBEE .group-3 {
  height: 100px;
  left: 1166px;
  position: absolute;
  top: 579px;
  width: 602px;
}

.login-HOBBEE .input-username {
  background-color: #ececec;
  border-radius: 20px;
  height: 100px;
  left: 0;
  position: absolute;
  top: 0;
  width: 600px;
}

.login-HOBBEE .text-wrapper-11 {
  color: #000000;
  font-family: "Inter-Bold", Helvetica;
  font-size: 32px;
  font-weight: 700;
  left: 42px;
  letter-spacing: 0;
  line-height: normal;
  opacity: 0.5;
  top: 30px;
}
</style>