import { createContext, useState, useContext ,useEffect} from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true); 

      const fetchUserData = async () => {
      try {
        const res = await axios.get("/api/user/info", { withCredentials: true });
        setIsLogin(true)
        setUserData(res.data)
        console.log(res.data)
      }catch(err){
        if (axios.isAxiosError(err)) {
            setIsLogin(false)
        } else {
            console.error('Generic Error:', err.message);
            setIsLogin(false)
        }
        } finally {
            setIsLoading(false);
      }
    }

    useEffect(()=>{
        fetchUserData();
        // console.log(`fetchUserData for update user state , is userlogin:${isLogin}`)
    } ,[])


  return (
    <UserContext.Provider value={{ isLogin,isLoading ,userData , setIsLogin , fetchUserData }}>
        {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
