// import dotenv from "dotenv"
// dotenv.config()

import express from "express"
import  body_parser from "body-parser"
import cookieParser from  "cookie-parser"
import cors from "cors"

import authRoute from "./routes/auth.js"
import productRoute from "./routes/product.js"
import cartRoute from "./routes/cart.js"
import transitionRoute from "./routes/transition.js"
import adminRoute from "./routes/admin.js"

const app = express()
const port = process.env.PORT || 8080

app.use(cors())
app.use(body_parser.json())
app.use(cookieParser())
app.use((req, res, next) => {
  const ip = req.ip;
  const method = req.method;
  const route = req.originalUrl;
  const time = new Date().toUTCString();

  console.log(`[${time}] ${ip} ${method} ${route}`);
  next();
});

app.use("/product/image",express.static("../project_db/product_images"))
app.use("/user/profile",express.static("../project_db/profile_images"))
app.use(authRoute)
app.use(productRoute)
app.use(cartRoute)
app.use(transitionRoute)
app.use(adminRoute)

app.listen(port,()=>{
    console.log(`server running at port ${port}`)
})