import { Registeruserhobbee, Backgroundmain, Boxlogin, ImportImage, Image1, Username, 
  EmailAddress, Password, ConfirmPassword, Group8, Next, Group2, Hcart, 
  H, Cart, Obbee, SignUp } from "./styles";

import BigCart from "/images/big-cart.png"
import SmallCart from "/images/cart.png"

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";


export default function Register(props) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const registerUser = async ()=>{
    if(!username.trim() || !password.trim() || !email.trim() || !confirmPassword.trim()){
      alert('อย่าใส่ค่าว่างไอ้โง่');
      return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
    
    let form = {
        email:email,
        username:username,
        password:password,
    }

    try {
        const res = await axios.post('/api/register', form);
        console.log(res.data);
        alert('register successful!');
        localStorage.setItem("verifyData", JSON.stringify({state:"register",email:email,data:form}));
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
    <Registeruserhobbee>
      <Backgroundmain>
        <Boxlogin>
          <ImportImage>
            <Image1 backgroundImage={BigCart} />
          </ImportImage>
          <EmailAddress 
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Username 
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Password 
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <ConfirmPassword 
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Group8 onClick={registerUser}>
            <Next>Next</Next>
          </Group8>
          <Group2>
            <Hcart>
              <H>H</H>
              <Cart backgroundImage={SmallCart} />
            </Hcart>
            <Obbee>OBBEE</Obbee>
          </Group2>
          <SignUp >Sign Up</SignUp>
        </Boxlogin>
      </Backgroundmain>
    </Registeruserhobbee>
  );
}
