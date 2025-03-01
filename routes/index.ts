import { Router } from "express";
const router = Router();
import Authroute from "./Authroute";
import Urlroute from "./urlroute";

// route to handle the auth request
router.use("/api/auth", Authroute);


// route to handle the url request
router.use("/api/url", Urlroute);

export default router;