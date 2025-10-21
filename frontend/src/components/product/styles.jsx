  const styles = {
    card: {
      width: "180px",
      backgroundColor: "#f5f5f5",
      borderRadius: "8px",
      padding: "10px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      fontFamily: "sans-serif",
    },
    imageContainer: {
      width: "100%",
      height: "180px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
      borderRadius: "6px",
      overflow: "hidden",
      marginBottom: "10px",
    },
    image: {
      maxWidth: "100%",
      maxHeight: "100%",
      objectFit: "contain",
    },
    name: {
      fontWeight: "bold",
      fontSize: "14px",
      marginBottom: "4px",
    },
    price: {
      fontSize: "16px",
      fontWeight: "bold",
      color: "black",
      margin: "5px 0",
    },
    bottomRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      marginTop: "auto",
    },
    cartIcon: {
      width: "22px",
      height: "22px",
      cursor: "pointer",
    },
  };

export default styles