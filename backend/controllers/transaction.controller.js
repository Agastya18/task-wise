import Transaction from "../models/transaction.model.js";
import jwt from "jsonwebtoken";

export const createTransaction = async (req, res) => {
    const {description,title,category,location,date} = req.body;
    if(!description || !title  || !category || !date){
        return res.status(400).json({message:"All fields are required"});
    }
    try {
        
        const newTransaction = await Transaction.create({
            user: req.user._id,
            
            description,
            title,
            
            category,
            location,
            date
        });
        if(!newTransaction){
            return res.status(400).json({message:"Transaction not created"});
        }
        return res.status(201).json({message:"Transaction created successfully",newTransaction});
       
           
      
        
    } catch (error) {
        console.log(error);
    }
}

export const getTransaction = async (req, res) => {
    try {
        const transactions = await Transaction.find({user: req.user._id}).populate("user",
       " profilePic"
        );
        if(!transactions){
            return res.status(400).json({message:"No transactions found"});
        }
        return res.status(200).json({transactions});
    } catch (error) {
        console.log(error);
    }
}

export const deleteTransaction = async (req, res) => {
    
    try {
        const {id} = req.params;
        const deletedTransaction = await Transaction.findByIdAndDelete(id);
        if(!deletedTransaction){
            return res.status(400).json({message:"Transaction not deleted"});
        }
        return res.status(200).json({message:"Transaction deleted successfully"});

        

      
    } catch (error) {
        console.log(error);
    }
}

export const updateTransaction = async (req, res) => {
    const {id} = req.params;
    const {description,title,category,location,date} = req.body;
    console.log(req.body)
    
    try {
      const transaction = await Transaction.findById(req.params.id);
        if(transaction){
            transaction.description = description || transaction.description;
            transaction.title = title || transaction.title;
           
            transaction.category = category || transaction.category;
            transaction.location = location || transaction.location;
            transaction.date = date || transaction.date;
            const updatedTransaction = await transaction.save({validateBeforeSave:false});
            if(updatedTransaction){
                return res.status(200).json({message:"Transaction updated successfully",updatedTransaction});
            }
        }else{
            return res.status(400).json({message:"Transaction not found"});
        }

    } catch (error) {
        console.log(error);
    }
}

export const getTransactionById = async (req, res) => {
    const {id} = req.params;
    try {
        const transaction = await Transaction.findById(id);
        if(!transaction){
            return res.status(400).json({message:"Transaction not found"});
        }
        return res.status(200).json({transaction});
    } catch (error) {
        console.log(error);
    }
}
export const getTransactionByCategory = async (req, res) => {
   // const {category} = req.params;
    try {
        const transactions = await Transaction.find({user: req.user._id})
        if(!transactions){
            return res.status(400).json({message:"No transactions found"});
        }
        const categoryMap = {};
        transactions.forEach((transaction) => {
            if(!categoryMap[transaction.category]){
                categoryMap[transaction.category] = 0;
            }
            categoryMap[transaction.category] += transaction.amount;

        })

       // return res.status(200).json({categoryMap});
       // return res.status(200).json({transactions});
       const ret= Object.entries(categoryMap).map(([category,totalAmount]) => ({category,totalAmount}));
       return res.status(200).json({categoryStatistics:ret});
    } catch (error) {
        console.log(error);
    }
}