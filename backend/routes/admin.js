import express from "express"

import {authMiddleware} from "../controllers/auth.js"
import * as handler from "../controllers/admin.js"

const router = express.Router();
const c = express.Router();

c.get("/order",handler.adminCheckTransition);
c.patch("/order/status",handler.updateStatus);
c.get("/allmembers",handler.listMember);
c.patch("/toadmin",handler.authorizeAdmin);

router.use("/admin", authMiddleware({ admin: true }), c);

export default router;
