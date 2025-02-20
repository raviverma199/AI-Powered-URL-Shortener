import { Router } from "express";
const router = Router();
import Authroute from "./Authroute";

// route to handle the auth request
router.use("/api/auth", Authroute);



export default router;