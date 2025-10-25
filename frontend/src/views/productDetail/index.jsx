// import styles from "./style";
import Header from "../../components/header"
import Footer from "../../components/footer"


import React, { useState ,useEffect } from "react";
import { useParams   } from 'react-router-dom';
import axios from "axios";

export default function ProductDetail() {
    const [productData, setProducData] = useState({});
    let param = useParams()

    useEffect(() => {
        const fetchData = async()=>{
            let serchId = param.id
            try{
                const res = await axios.get(`/api/product/${serchId}`);
                console.log(res.data)
                setProducData(res.data)
            } catch (error) {
                console.error("Error fetching:", error);
            }

        }
        fetchData();
    }, [param]);

return (
<>
    <Header/>
    <div>
      <p>
        { JSON.stringify(productData) }
      </p>
    </div>
    <Footer />
</>

  );
}
