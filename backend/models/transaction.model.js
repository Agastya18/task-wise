import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    description: {
		type: String,
		required: true,
	},
    title: {
        type: String,
        required: true,
    },
  
    category: {
		type: String,
		enum: ["work", "personal", "shared"],
		required: true,
	},
    location: {
		type: String,
		default: "Unknown",
	},
	date: {
		type: Date,
		required: true,
	},
    
})

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
