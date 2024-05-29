import express from "express";
import { CREATE_ANSWER,GET_ALL_ANSWERS } from "../controllers/replies.js";
import {auth}   from "../middlewares/auth.js";


const router = express.Router();





router.post("/replies",auth, CREATE_ANSWER);
router.get("/replies",auth, GET_ALL_ANSWERS)



export default router