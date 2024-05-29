import express from "express";
import { CREATE_QUESTION,GET_ALL_QUESTIONS } from "../controllers/questions.js";
import {auth}   from "../middlewares/auth.js";


const router = express.Router();





router.post("/questions",auth, CREATE_QUESTION);
router.get("/questions",auth, GET_ALL_QUESTIONS)



export default router