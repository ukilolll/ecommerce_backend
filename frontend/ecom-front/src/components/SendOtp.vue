<template>
  <div class="registeruser-OTP">
    <div class="background-main" />
    <div class="box-login" />
    <div class="import-image" />

    <div class="group">
      <div class="text-wrapper">OBBEE</div>
      <div class="hcart" />
      <div class="div">H</div>
      <img class="cart" alt="Cart" :src="cart" />
    </div>

  <div class="group-wrapper">
    <div class="group-2 otp-inputs">
      <input
        v-for="(digit, index) in otpDigits"
        :key="index"
        type="text"
        maxlength="1"
        class="otp-box"
        v-model="otpDigits[index]"
        @input="handleInput($event, index)"
        @keydown.backspace="handleBackspace($event, index)"
      />
    </div>
  </div>

    <p class="p">
      โปรดยืนยันตัวตนด้วยรหัส OTP ระบบได้ส่งรหัสไปที่ E-mail
      th****@gmail.com โปรดยืนยันตัวตนในระยะเวลา 5 นาที
    </p>

    <div class="text-wrapper-4 resend">
      <button class="resend-btn"  @click="resendOtp">ส่งรหัส OTP อีกครั้ง</button>
    </div>

    <div class="group-3">
      <button class="button-login" @click="verifyOtp">Confirm</button>
    </div>

    <img class="image" alt="Image" :src="big_cart" />
  </div>
</template>

<script>
import cart from '../assets/cart.png';
import big_cart from '../assets/big-cart.png';
import axios from 'axios';

export default {
  data() {
    return {
    cart,
    big_cart,
    otpDigits: ['', '', '', '', '', ''], 

    };
  },
  methods: {
    handleInput(e, index) {
      const value = e.target.value.replace(/[^0-9]/g, ''); 
      this.otpDigits[index] = value;

      // ถ้ามีการกรอก ให้ขยับไปช่องถัดไปอัตโนมัติ
      if (value && index < this.otpDigits.length - 1) {
        e.target.nextElementSibling?.focus();
      }
    },
    handleBackspace(e, index) {
      if (!this.otpDigits[index] && index > 0) {
        e.target.previousElementSibling?.focus();
      }
    },
    getOtp() {
      return this.otpDigits.join('');
    },
    
    async verifyOtp(){
        try {
          const otp = this.getOtp();
          const verifyData  = JSON.parse(localStorage.getItem("verifyData"));

          if (!otp || otp.length !== 6) {
              alert("Please enter 6-digit OTP");
              return;
          }
            const res = await axios.post("/api/otp/verify", { email:verifyData.email, otp });
            console.log(res.data)
            alert('otp verify successful!');
            localStorage.removeItem("verifyData");
            this.$router.push("/profile");
        } catch (err) {

            if (axios.isAxiosError(err)) {
            if (err.response) {
                alert(err.response.data.errorMsg);
            } 
            } else {
            console.error('Generic Error:', err.message);
            }
        }
    },

    async resendOtp() {
        try {
        const verifyData  = JSON.parse(localStorage.getItem("verifyData"));
        let path;
          if(verifyData.state == "login"){
            path= "/api/login"
          }else{
            path= "/api/register"
          }
          const res = await axios.post(path,verifyData.data);
          console.log(res.data);
          alert('send new otp');
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

  }
};
</script>

<style>
.resend-btn {
  background: none;
  border: none;
  color: #007bff;
  font-size: 16px;
  cursor: pointer;
  padding: 0;
}

.resend-btn:hover {
  color: #0056b3;
  text-decoration: underline;

}

.otp-inputs {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.otp-box {
  width: 40px;
  height: 50px;
  font-size: 24px;
  text-align: center;
  border: 2px solid #ccc;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.2s;
}

.otp-box:focus {
  border-color: #007bff;
}


.registeruser-OTP {
  background-color: #ffffff;
  min-height: 1470px;
  min-width: 2060px;
  position: relative;
  width: 100%;
}

.registeruser-OTP .background-main {
  background-color: #f4f4f4;
  height: 1470px;
  left: 0;
  position: absolute;
  top: 0;
  width: 2060px;
}

.registeruser-OTP .box-login {
  background-color: #ffffff;
  border-radius: 20px;
  height: 1000px;
  left: 180px;
  position: absolute;
  top: 235px;
  width: 1700px;
}

.registeruser-OTP .import-image {
  background-color: #ffa025;
  border-radius: 0px 40px 40px 0px;
  height: 1000px;
  left: 180px;
  position: absolute;
  top: 235px;
  width: 789px;
}

.registeruser-OTP .group {
  height: 100px;
  left: 1347px;
  position: absolute;
  top: 256px;
  width: 250px;
}

.registeruser-OTP .text-wrapper {
  color: #000000;
  font-family: "Inter-Bold", Helvetica;
  font-size: 40px;
  font-weight: 700;
  left: 112px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 26px;
  white-space: nowrap;
}

.registeruser-OTP .hcart {
  aspect-ratio: 1;
  background-color: #ffa025;
  border-radius: 50px;
  height: 100px;
  left: 0;
  position: absolute;
  top: 0;
  width: 100px;
}

.registeruser-OTP .div {
  color: #000000;
  font-family: "Inter-Black", Helvetica;
  font-size: 40px;
  font-weight: 900;
  left: 20px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 26px;
  white-space: nowrap;
}

.registeruser-OTP .cart {
  aspect-ratio: 1;
  height: 35px;
  left: 50px;
  object-fit: cover;
  position: absolute;
  top: 32px;
  width: 35px;
}

.registeruser-OTP .text-wrapper-2 {
  color: #000000;
  font-family: "Inter-Bold", Helvetica;
  font-size: 48px;
  font-weight: 700;
  left: 1226px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 417px;
}

.registeruser-OTP .group-wrapper {
  display: flex;
  height: 100px;
  left: 1147px;
  position: absolute;
  top: 703px;
  width: 600px;
}

.registeruser-OTP .group-2 {
  height: 100px;
  position: relative;
  width: 602px;
}

.registeruser-OTP .input-username {
  background-color: #ececec;
  border-radius: 20px;
  height: 100px;
  left: 0;
  position: absolute;
  top: 0;
  width: 600px;
}

.registeruser-OTP .text-wrapper-3 {
  color: #000000;
  font-family: "Inter-Bold", Helvetica;
  font-size: 32px;
  font-weight: 700;
  left: 27px;
  letter-spacing: 0;
  line-height: normal;
  opacity: 0.5;
  position: absolute;
  top: 30px;
}

.registeruser-OTP .p {
  color: #000000;
  font-family: "Jost-Bold", Helvetica;
  font-size: 32px;
  font-weight: 700;
  left: 1111px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 535px;
  width: 689px;
}

.registeruser-OTP .text-wrapper-4 {
  align-items: center;
  color: #1c7df4;
  display: flex;
  font-family: "Jost-Bold", Helvetica;
  font-size: 32px;
  font-weight: 700;
  height: 67px;
  justify-content: center;
  left: 1304px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 1046px;
  width: 281px;
}

.registeruser-OTP .group-3 {
  height: 100px;
  left: 1205px;
  position: absolute;
  top: 860px;
  width: 502px;
}

.registeruser-OTP .button-login {
  background-color: #ffa025;
  border-radius: 20px;
  height: 100px;
  left: 0;
  position: absolute;
  top: 0;
  width: 500px;
}

.registeruser-OTP .text-wrapper-5 {
  color: #ffffff;
  font-family: "Inter-Bold", Helvetica;
  font-size: 32px;
  font-weight: 700;
  left: 189px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 30px;
}

.registeruser-OTP .image {
  aspect-ratio: 1;
  height: 401px;
  left: 374px;
  object-fit: cover;
  position: absolute;
  top: 534px;
  width: 401px;
}
</style>