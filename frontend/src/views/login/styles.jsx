import styled from "styled-components";

export const Loginhobbee = styled.div`
  width: 100%;
  mask-type: ALPHA;
  min-height: 1470px;
  align-items: start;
  background: white;
  grid-row-gap: 0;
  grid-column-gap: 0;
  justify-content: center;
  display: flex;
`;

export const Backgroundmain = styled.div`
  width: 100%;
  mask-type: ALPHA;
  min-height: 1470px;
  background: rgba(244.95, 244.95, 244.95, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

export const Boxlogin = styled.div`
  width: 83.3%;
  mask-type: ALPHA;
  min-height: 1000px;
  background: white;
  border-radius: 20px 20px 20px 20px;
  position: relative;
`;

export const ImportImage = styled.div`
  top: 50px;
  left: 5.24%;
  width: 41.18%;
  mask-type: ALPHA;
  min-height: 900px;
  background: rgba(255, 160.54, 37.02, 1);
  border-radius: 40px 40px 40px 40px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

export const Image1 = styled.div`
  width: 401px;
  mask-type: ALPHA;
  min-height: 401px;
  background-size: cover;
  background-image: ${(props) => `url("${props.backgroundImage}")`};
`;

export const Username = styled.input`
  position: absolute;
  top: 344px;
  left: 58%;
  width: 35.29%;
  min-height: 100px;
  padding: 16px;
  border: none;
  border-radius: 20px;
  background: rgba(236, 236, 236, 1);
  font-size: 18px;
  color: #000;
  outline: none;

`;


export const Inputpassword = styled.input`
  top: 476px;
  left: 58%;
  width: 35.29%;
  mask-type: ALPHA;
  min-height: 100px;
  background: rgba(236.12, 236.12, 236.12, 1);
  border: none;
  font-size: 18px;
  border-radius: 20px;
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: space-between;
  padding: 16px;
`;


export const LineLoginorwith = styled.div`
  top: 768px;
  left: 58%;
  width: 35.29%;
  mask-type: ALPHA;
  min-height: 3px;
  background: rgba(236.12, 236.12, 236.12, 1);
  border-radius: 20px 20px 20px 20px;
  position: absolute;
`;

export const Boxlogogoogle = styled.div`
  top: 808px;
  left: 59.59%;
  width: 15.76%;
  mask-type: ALPHA;
  min-height: 98px;
  border-color: rgba(236, 236, 236, 0.80);
  border-style: solid;
  border-width: 2px;
  border-radius: 20px 20px 20px 20px;
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
`;

export const LogoGoogle = styled.div`
  width: 30px;
  mask-type: ALPHA;
  min-height: 30px;
  background-size: cover;
  background-image: ${(props) => `url("${props.backgroundImage}")`};
  margin-left: 22.76%;
`;

export const Google = styled.span`
  color: black;
  font-size: 20px;
  mask-type: ALPHA;
  font-family: Inter;
  font-weight: bold;
  white-space: pre-wrap;
  letter-spacing: 0em;
  text-decoration: NONE;
  margin-left: 6.34%;
  align-self: flex-start;
  margin-top: 21px;
`;

export const LoginButton = styled.button`
  top: 629px;
  left: 60.94%;
  width: 29.41%;
  mask-type: ALPHA;
  min-height: 100px;
  background: rgba(255, 160.54, 37.02, 1);
  border-radius: 20px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

export const Login = styled.span`
  color: white;
  font-size: 20px;
  mask-type: ALPHA;
  font-family: Inter;
  font-weight: bold;
  white-space: pre-wrap;
  letter-spacing: 0em;
  text-decoration: NONE;
  margin-left: 1.25%;
  align-self: flex-start;
  margin-top: 22px;
`;

export const WelcomeBack = styled.span`
  top: 224px;
  left: 63.99%;
  color: black;
  font-size: 48px;
  mask-type: ALPHA;
  font-family: Inter;
  font-weight: bold;
  white-space: pre-wrap;
  letter-spacing: 0em;
  text-decoration: NONE;
  position: absolute;
`;

export const Group1 = styled.div`
  top: 931px;
  left: 66.43%;
  width: 18.63%;
  mask-type: ALPHA;
  min-height: 24px;
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: space-around;
`;

export const DontHaveAnAccount = styled.span`
  color: black;
  font-size: 20px;
  mask-type: ALPHA;
  font-family: Inter;
  font-weight: bold;
  white-space: pre-wrap;
  letter-spacing: 0em;
  text-decoration: NONE;
`;

export const SignUp = styled.span`
  color: rgba(255, 160.54, 37.02, 1);
  font-size: 20px;
  mask-type: ALPHA;
  font-family: Inter;
  font-weight: bold;
  white-space: pre-wrap;
  letter-spacing: 0em;
  text-decoration: NONE;
  margin-left: 0.8%;
`;

export const PleaseLoginToYourAccount = styled.span`
  top: 290px;
  left: 67.6%;
  color: black;
  opacity: 0.5;
  font-size: 20px;
  mask-type: ALPHA;
  font-family: Inter;
  font-weight: bold;
  white-space: pre-wrap;
  letter-spacing: 0em;
  text-decoration: NONE;
  position: absolute;
`;

export const Hcart = styled.div`
  top: 100px;
  left: 69.06%;
  width: 5.88%;
  mask-type: ALPHA;
  min-height: 100px;
  background: rgba(255, 160.54, 37.02, 1);
  border-radius: 9999px;
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: start;
  padding-left: 16px;
  padding-top: 16px;
  padding-right: 15px;
  padding-bottom: 16px;
`;

export const H = styled.span`
  color: black;
  font-size: 40px;
  mask-type: ALPHA;
  font-family: Inter;
  font-weight: 900;
  white-space: pre-wrap;
  letter-spacing: 0em;
  text-decoration: NONE;
  margin-left: 5.88%;
  margin-top: 10px;
`;

export const Cart = styled.div`
  width: 35px;
  mask-type: ALPHA;
  max-width: 42px;
  min-height: 35px;
  background-size: cover;
  background-image: ${(props) => `url("${props.backgroundImage}")`};
  min-width: 28px;
  margin-top: 16px;
`;

export const Rectangle1 = styled.div`
  top: 766px;
  left: 72.71%;
  width: 5.88%;
  mask-type: ALPHA;
  min-height: 9px;
  background: white;
  position: absolute;
`;

export const OrLoginWith = styled.span`
  top: 759px;
  left: 72.81%;
  color: black;
  opacity: 0.5;
  font-size: 15px;
  mask-type: ALPHA;
  font-family: Inter;
  font-weight: bold;
  white-space: pre-wrap;
  letter-spacing: 0em;
  text-decoration: NONE;
  position: absolute;
`;

export const Obbee = styled.span`
  top: 126px;
  left: 75.77%;
  color: black;
  font-size: 40px;
  mask-type: ALPHA;
  font-family: Inter;
  font-weight: bold;
  white-space: pre-wrap;
  letter-spacing: 0em;
  text-decoration: NONE;
  position: absolute;
`;

export const Boxlogofacebook = styled.div`
  top: 808px;
  left: 75.94%;
  width: 15.76%;
  mask-type: ALPHA;
  min-height: 98px;
  border-color: rgba(236, 236, 236, 0.80);
  border-style: solid;
  border-width: 2px;
  border-radius: 20px 20px 20px 20px;
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
`;

export const LogoFacebook = styled.div`
  width: 30px;
  mask-type: ALPHA;
  min-height: 30px;
  background-size: cover;
  background-image: ${(props) => `url("${props.backgroundImage}")`};
  margin-left: 17.16%;
`;

export const Facebook = styled.span`
  color: black;
  font-size: 20px;
  mask-type: ALPHA;
  font-family: Inter;
  font-weight: bold;
  white-space: pre-wrap;
  letter-spacing: 0em;
  text-decoration: NONE;
  margin-left: 6.44%;
  align-self: flex-start;
  margin-top: 21px;
`;

export const ForgotPassword = styled.span`
  top: 590px;
  left: 85.6%;
  color: black;
  opacity: 0.5;
  font-size: 20px;
  mask-type: ALPHA;
  font-family: Inter;
  font-weight: bold;
  white-space: pre-wrap;
  letter-spacing: 0em;
  text-decoration: NONE;
  position: absolute;
`;
