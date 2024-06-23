import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
	fullName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
      
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"],
    },
    
    profilePic: {
        type: String,
        default: "",
    },

},
{ timestamps: true}
)

// password hashing before saving
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

// matching password function
userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}
//genrating access token for user
userSchema.methods.getAccessToken = function(){
    return jwt.sign({id: this._id}, process.env.TOKEN_SECRET, {expiresIn: "15d",
   
   
    },
    
    )
}

// const User =  mongoose.model("User", userSchema);
// export default User;

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;