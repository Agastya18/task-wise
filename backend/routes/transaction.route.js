import express from "express";
import { createTransaction, deleteTransaction, getTransaction, getTransactionByCategory, getTransactionById, updateTransaction } from "../controllers/transaction.controller.js";
import { verifyUser } from "../middleware/protectRoute.js";

const router = express.Router();

router.post('/create',verifyUser,createTransaction)
router.get('/get-all',verifyUser,getTransaction)
router.delete('/delete/:id',verifyUser,deleteTransaction)
router.put('/update/:id',verifyUser,updateTransaction)
router.get('/get-id/:id',verifyUser,getTransactionById)
router.get('/get-chart',verifyUser,getTransactionByCategory)




export default router;