<template>
  <div class="registeruser-HOBBEE">
    <div class="background-main" />
    <div class="box-login" />
    <div class="import-image" />
    
    <div class="group">
      <div class="text-wrapper">OBBEE</div>
      <div class="hcart" />
      <div class="div">H</div>
      <img class="cart" alt="Cart" :src="cart" />
    </div>

    <div class="text-wrapper-2">Sign Up</div>

    <form class="form-signup" @submit.prevent="registerUser">
      <div class="group-3">
        <input v-model="form.email" type="email" class="input-username" placeholder="Enter your email" required />
      </div>

      <div class="group-2">
        <input v-model="form.username" type="text" class="input-username" placeholder="Enter username" required />
      </div>

      <div class="group-4">
        <input v-model="form.password" type="password" class="input-username" placeholder="Enter password" required />
      </div>

      <div class="group-5">
        <input v-model="form.confirmPassword" type="password" class="input-username" placeholder="Confirm password" required />
      </div>

      <div class="group-6">
        <button type="submit" class="button-login">Next</button>
      </div>
    </form>

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
      form: {
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
      }
    };
  },
  methods: {
    async registerUser() {
      if (this.form.password !== this.form.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
    
    let form = {
        email:this.form.email,
        username:this.form.username,
        password:this.form.password,
    }

    try {
        const res = await axios.post('/api/register', form);
        console.log(res.data);
        alert('register successful!');
        localStorage.setItem("verifyData", JSON.stringify({state:"register",email:form.email,data:form}));
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

    }
  }
};
</script>

<style>
.registeruser-HOBBEE {
  background-color: #ffffff;
  min-height: 1470px;
  min-width: 2060px;
  position: relative;
  width: 100%;

}

.registeruser-HOBBEE .background-main {
  background-color: #f4f4f4;
  height: 1470px;
  left: 0;
  position: absolute;
  top: 0;
  width: 2060px;
}

.registeruser-HOBBEE .box-login {
  background-color: #ffffff;
  border-radius: 20px;
  height: 1000px;
  left: 180px;
  position: absolute;
  top: 235px;
  width: 1700px;
}

.registeruser-HOBBEE .import-image {
  background-color: #ffa025;
  border-radius: 0px 40px 40px 0px;
  height: 1000px;
  left: 180px;
  position: absolute;
  top: 235px;
  width: 789px;
}

.registeruser-HOBBEE .group {
  height: 100px;
  left: 1347px;
  position: absolute;
  top: 256px;
  width: 250px;
}

.registeruser-HOBBEE .text-wrapper {
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

.registeruser-HOBBEE .hcart {
  aspect-ratio: 1;
  background-color: #ffa025;
  border-radius: 50px;
  height: 100px;
  left: 0;
  position: absolute;
  top: 0;
  width: 100px;
}

.registeruser-HOBBEE .div {
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

.registeruser-HOBBEE .cart {
  aspect-ratio: 1;
  height: 35px;
  left: 50px;
  object-fit: cover;
  position: absolute;
  top: 32px;
  width: 35px;
}

.registeruser-HOBBEE .text-wrapper-2 {
  color: #000000;
  font-family: "Inter-Bold", Helvetica;
  font-size: 48px;
  font-weight: 700;
  left: 1368px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 364px;
}

.registeruser-HOBBEE .group-2 {
  height: 100px;
  left: 1161px;
  position: absolute;
  top: 630px;
  width: 602px;
}

.registeruser-HOBBEE .input-username {
  background-color: #ececec;
  border-radius: 20px;
  height: 100px;
  left: 0;
  position: absolute;
  top: 0;
  width: 600px;
}

.registeruser-HOBBEE .text-wrapper-3 {
  color: #000000;
  font-family: "Inter-Bold", Helvetica;
  font-size: 32px;
  font-weight: 700;
  left: 42px;
  letter-spacing: 0;
  line-height: normal;
  opacity: 0.5;
  position: absolute;
  top: 30px;
}

.registeruser-HOBBEE .group-3 {
  height: 100px;
  left: 1157px;
  position: absolute;
  top: 495px;
  width: 602px;
}

.registeruser-HOBBEE .group-4 {
  height: 100px;
  left: 1161px;
  position: absolute;
  top: 775px;
  width: 602px;
}

.registeruser-HOBBEE .group-5 {
  height: 100px;
  left: 1161px;
  position: absolute;
  top: 911px;
  width: 602px;
}

.registeruser-HOBBEE .group-6 {
  height: 100px;
  left: 1199px;
  position: absolute;
  top: 1050px;
  width: 502px;
}

.registeruser-HOBBEE .button-login {
  background-color: #ffa025;
  border-radius: 20px;
  display: block;
  height: 100px;
  left: 0;
  position: absolute;
  top: 0;
  width: 500px;
}

.registeruser-HOBBEE .text-wrapper-4 {
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

.registeruser-HOBBEE .image {
  aspect-ratio: 1;
  height: 401px;
  left: 374px;
  object-fit: cover;
  position: absolute;
  top: 534px;
  width: 401px;
}
</style>