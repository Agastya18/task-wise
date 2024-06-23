import User from "../models/user.model.js";

export const SignUp = async (req, res) => {
    const {  name:fullName, username, password,gender} = req.body
    //console.log(req.body);
    if(!fullName || !username || !password || !gender ){
        return res.status(400).json({message: "All fields are required"})
    }
    try {
        const userExists = await User.findOne({username});
        if(userExists){
            return res.status(400).json({message: "User already exists"})
        }
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
	const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
         // console.log(req.body);
        const newUser = await User.create({
            fullName,
            username,
            password,
            gender,
            profilePic:  gender === "male" ? boyProfilePic : girlProfilePic,
        })
        //console.log(newUser)

        if(newUser){

            const authtoken = await newUser.getAccessToken();
            res.cookie("authtoken", authtoken, {httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 1000 * 60 * 60 * 24 * 15});
            return res.status(201).json({message: "User created successfully",
            user: {
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic,}})
        }



        
    } catch (error) {
        console.log(error);
    }
}

export const login = async(req, res) =>{
    const {username, password} = req.body;
    if(!username || !password){
        return res.status(400).json({message: "All fields are required"})
    }
    try {
        const user = await User.findOne({username});
        if(!user){
            return res.status(400).json({message: "Invalid credentials1"})
        }
        const isMatch = await user.matchPassword(password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid credentials2"})
        }
        const authtoken = await user.getAccessToken();
        if(!authtoken){
            return res.status(400).json({message: "Invalid credentials3"})
        }
        res.cookie("authtoken", authtoken, {httpOnly: true,
               secure: true,
                sameSite: "strict",
                maxAge: 1000 * 60 * 60 * 24 * 15

        

        }, 
        
        );
      
        const loggedInUser = {
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
        }
        return res.status(200).json({message: "User logged in successfully", user: loggedInUser})
        

        
    } catch (error) {
        console.log(error);
    }
   
}

export const logout = (req, res) => {
    try {

      //  res.cookie("authToken", "", { maxAge: 0 });
        res.clearCookie("authtoken");
        

		res.status(200).json({ message: "Logged out successfully" });
        
    } catch (error) {
        console.log(error);
    }
}