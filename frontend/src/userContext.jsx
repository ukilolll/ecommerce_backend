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
        setUserData(res.data)
        console.log(res.data)
        setIsLogin(true)
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

    const logout = async () => {
    try {
      await axios.post("/api/logout", {}, { withCredentials: true });
    } catch (err) {
      console.error("Logout request failed:", err);
    } finally {
      setIsLogin(false);
      setUserData(null);
    }
  };

    useEffect(()=>{
        fetchUserData();
    } ,[])


  return (
    <UserContext.Provider value={{ isLogin,isLoading ,userData , setIsLogin , fetchUserData ,logout}}>
        {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
