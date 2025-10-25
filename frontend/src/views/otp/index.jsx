import { Registeruserotphobbee, Backgroundmain, Boxlogin, ImportImage, Image1, OtpEmailThgmailcom5,  Otp, Group9, Confirm, EnterYouOtpCode, Otp2, Group2, Hcart, H, Cart, Obbee } from "./styles";
import BigCart from "/images/big-cart.png"
import SmallCart from "/images/cart.png"

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import {useUser} from  "../../context"

export default function OTPPage(props) {
  const { fetchUserData } = useUser()
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const verifyOtp = async()=>{
        try {
          const verifyData  = JSON.parse(localStorage.getItem("verifyData"));

          if (!otp || otp.length !== 6) {
              alert("Please enter 6-digit OTP");
              return;
          }
            const res = await axios.post("/api/otp/verify", { email:verifyData.email, otp });
            console.log(res.data)
            alert('otp verify successful!');
            localStorage.removeItem("verifyData");
            await fetchUserData()
            navigate("/");
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

  const resendOtp = async()=>{
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


  return (
    <Registeruserotphobbee>
      <Backgroundmain>
        <Boxlogin>
          <ImportImage>
            <Image1 backgroundImage={BigCart} />
          </ImportImage>
          <OtpEmailThgmailcom5>โปรดยืนยันตัวตนด้วยรหัส OTP ระบบได้ส่งรหัสไปที่ E-mail โปรดยืนยันตัวตนในระยะเวลา 5 นาที</OtpEmailThgmailcom5>
          <Otp 
            type="text"
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <Group9 onClick={verifyOtp}>
            <Confirm>confirm</Confirm>
          </Group9>
          <EnterYouOtpCode>Enter you otp code</EnterYouOtpCode>
          <Otp2 onClick={resendOtp}>ส่งรหัส OTP อีกครั้ง</Otp2>
          <Group2>
            <Hcart>
              <H>H</H>
              <Cart backgroundImage={SmallCart} />
            </Hcart>
            <Obbee>OBBEE</Obbee>
          </Group2>
        </Boxlogin>
      </Backgroundmain>
    </Registeruserotphobbee>
  );
}
