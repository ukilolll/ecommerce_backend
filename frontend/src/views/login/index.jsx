import { Loginhobbee, Backgroundmain, Boxlogin, ImportImage, Image1, Username, Inputpassword,
   LineLoginorwith, Boxlogogoogle, LogoGoogle, Google, LoginButton, Login, WelcomeBack, Group1,
    DontHaveAnAccount, SignUp, PleaseLoginToYourAccount, Hcart, H, Cart, Rectangle1, OrLoginWith, 
    Obbee, Boxlogofacebook, LogoFacebook, Facebook, ForgotPassword } from "./styles";

import BigCart from "/images/big-cart.png"
import SmallCart from "/images/cart.png"
import googleImage from "/images/logo-google.png";
import facebookImage from "/images/logo-facebook.png";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function LoginHOBBEE(props) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const Userlogin = async ()=>{
        if (!username || !password) {
            alert("Please enter username and password");
            return;
        }
        let reqData = {
            username:username,
            password:password
          }

        try {
            const res = await axios.post('http://localhost:3000/login',reqData);
            console.log(res.data);
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
    <Loginhobbee>
      <Backgroundmain>
        <Boxlogin>
          <ImportImage>
            <Image1 backgroundImage={BigCart} />
          </ImportImage>
          <Username 
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Inputpassword 
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <LineLoginorwith />
          <Boxlogogoogle>
            <LogoGoogle backgroundImage={googleImage} />
            <Google>Google</Google>
          </Boxlogogoogle>
          <LoginButton onClick={Userlogin}>
            <Login>Login</Login>
          </LoginButton>
          <WelcomeBack>WELCOME BACK</WelcomeBack>
          <Group1 onClick={()=>{navigate("/register")}}>
            <DontHaveAnAccount>Don’t have an account?</DontHaveAnAccount>
            <SignUp>Sign up</SignUp>
          </Group1>
          <PleaseLoginToYourAccount>Please login to your account</PleaseLoginToYourAccount>
          <Hcart>
            <H>H</H>
            <Cart backgroundImage={SmallCart} />
          </Hcart>
          <Rectangle1 />
          <OrLoginWith>Or Login with</OrLoginWith>
          <Obbee>OBBEE</Obbee>
          <Boxlogofacebook>
            <LogoFacebook backgroundImage={facebookImage} />
            <Facebook>Facebook</Facebook>
          </Boxlogofacebook>
          <ForgotPassword>Forgot password?</ForgotPassword>
        </Boxlogin>
      </Backgroundmain>
    </Loginhobbee>
  );
}
