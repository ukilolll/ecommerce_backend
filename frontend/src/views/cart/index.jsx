import Header from "../../components/header"
import Footer from "../../components/footer"
import styles from "./styles";

import React, { useState } from "react";

export default function CartPage() {
  const [quantity, setQuantity] = useState(1);
  const price = 1600;

  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => quantity > 1 && setQuantity(quantity - 1);

  const total = price * quantity;


  return (
    <>
    <Header/>

    <div style={styles.container}>
      <div style={styles.cartBox}>
        <div style={styles.header}>ตะกร้าสินค้าของคุณ</div>
        <div style={styles.tableHeader}>
          <span>รายการสินค้า</span>
          <span>จำนวน</span>
          <span>ราคา</span>
        </div>

        <div style={styles.productRow}>
          <div style={styles.productInfo}>
            <img
              src="https://via.placeholder.com/50"
              alt="KAI"
              style={styles.productImage}
            />
            <div>
              <div>
                <strong>KAI เครื่องโกนหนวดไร้สาย</strong>
              </div>
              <div style={{ fontSize: "12px", color: "#555" }}>
                รหัสสินค้า: E-0010120005
              </div>
            </div>
          </div>

          <div style={styles.qtyBox}>
            <button style={styles.qtyButton} onClick={handleDecrement}>
              -
            </button>
            <span>{quantity}</span>
            <button style={styles.qtyButton} onClick={handleIncrement}>
              +
            </button>
          </div>

          <div>฿{total.toLocaleString()}</div>
        </div>

        <div style={styles.summary}>
          <div>
            <strong>รวมทั้งหมด :</strong>{" "}
            <span>฿{(price * quantity).toLocaleString()}</span>
          </div>
          <button style={styles.payButton}>
            🛒 ชำระเงิน
          </button>
        </div>
      </div>
    </div>

    </>
  );
}