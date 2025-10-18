<template>
  <footer class="footer">
    <p>
      © 2025 บริษัท ฮ๊อบบี จำกัด บริษัทจดทะเบียนภายใต้ราชอาณาจักรไทย
    </p>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
.footer {
  width: 100%;
  background-color: #d9d9d9;
  color: #000;
  font-family: "Freeman-Regular", Helvetica, sans-serif;
  font-size: 1.2rem;
  text-align: center;
  padding: 1.5rem 1rem;
  position: relative; 
  bottom: 0;
  left: 0;
}


.footer {
  margin-top: auto;
}

@media (max-width: 768px) {
  .footer {
    font-size: 1rem;
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .footer {
    font-size: 0.9rem;
  }
}
</style>
