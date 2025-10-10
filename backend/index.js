// import dotenv from "dotenv"
// dotenv.config()

import express from "express"
import  body_parser from "body-parser"
import cookieParser from  "cookie-parser"
import cors from "cors"
import swaggerUI from "swagger-ui-express"
import yaml from "yaml"
import fs from "fs"

import authRoute from "./routes/auth.js"
import productRoute from "./routes/product.js"
import cartRoute from "./routes/cart.js"
import transitionRoute from "./routes/transition.js"
import adminRoute from "./routes/admin.js"

const app = express()
const port = process.env.PORT || 8080

const swaggerfile = fs.readFileSync('swagger.yaml','utf-8')
const swaggerDoc = yaml.parse(swaggerfile)
// กำหนด path ที่จะให้เรียกหน้า Document ขึ้นมา
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDoc))

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

app.use(authRoute)
app.use(productRoute)
app.use(cartRoute)
app.use(transitionRoute)
app.use(adminRoute)

app.listen(port,()=>{
    console.log(`server running at port ${port}`)
})