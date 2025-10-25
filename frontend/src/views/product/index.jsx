import styles from "./style";
import Header from "../../components/header"
import Footer from "../../components/footer"

import React, { useState ,useEffect } from "react";
import { useSearchParams ,useNavigate } from 'react-router-dom';
import ProductCard from "../../components/product";
import axios from "axios";

export default function ShowProduct() {
    const [products, setProducts] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate()

  useEffect(() => {
    // define async function inside useEffect
    const fetchData = async () => {
      try {
        let serchText = searchParams.get("search");
        let serchCategory = searchParams.get("category");
        let url;

        if (serchText) {
          url = `/api/product/searching/${serchText}`;
        }
        else if(serchCategory){
          url = `/api/product/category/${serchCategory}`
        }
        else {
          url = `/api/products`;
        }

        const res = await axios.get(url);
        setProducts(res.data);

        const catagoryData = await axios.get(`/api/categories`);
        localStorage.setItem("catagoryData",JSON.stringify(catagoryData.data))
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData(); // call the async function
  }, [searchParams]); // re-run when query changes

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Pagination logic
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = products.slice(startIndex, startIndex + itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <>
    <Header/>

    <div style={styles.container}>
      <div style={styles.title}>สินค้าแนะนำ</div>
      <div style={styles.grid}>
        {currentItems.map((itemDetail) => (
          <ProductCard
            onClick={()=>{navigate(`/product/detail/${itemDetail.id}`)}}
            key={itemDetail.id}
            ProductData={itemDetail}
          />
        ))}
      </div>

      <div style={styles.pagination}>
        <button
          style={{
            ...styles.button,
            ...(currentPage === 1 ? styles.disabledButton : {}),
          }}
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          ก่อนหน้า
        </button>
        <span>หน้าที่ {currentPage} / {totalPages}</span>
        <button
          style={{
            ...styles.button,
            ...(currentPage === totalPages ? styles.disabledButton : {}),
          }}
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          ถัดไป
        </button>
      </div>
    </div>
    
    <Footer/>
    </>       
  );
}


