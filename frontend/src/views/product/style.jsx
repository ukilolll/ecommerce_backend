const styles = {
    container: {
      paddingTop: "50px",
      fontFamily: "sans-serif",
      "margin-left": "auto",
      "margin-right": "auto",
      "width":"50%"
    },
    title: {
      fontWeight: "bold",
      marginBottom: "10px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
      gap: "20px",
    },
    pagination: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "20px",
      gap: "10px",
    },
    button: {
      padding: "8px 16px",
      backgroundColor: "#f0f0f0",
      border: "1px solid #ccc",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "bold",
    },
    disabledButton: {
      opacity: 0.5,
      cursor: "not-allowed",
    },
  };

export default styles