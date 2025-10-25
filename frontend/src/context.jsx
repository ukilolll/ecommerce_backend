import { createContext, useState, useContext ,useEffect} from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);

    useEffect(()=>{
    const checkLogin = async () => {
      try {
        const res = await axios.get("/api/user/info", { withCredentials: true });
        setIsLogin(true)
        setUserData(res.data)
      }catch(err){
        if (axios.isAxiosError(err)) {
            if (err.response) {
            setIsLogin(false)
            } 
        } else {
            console.error('Generic Error:', err.message);
        }
      }
    }
    checkLogin();
    } ,[])


  return (
    <UserContext.Provider value={{ isLogin, setIsLogin , userData, setUserData }}>
        {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
