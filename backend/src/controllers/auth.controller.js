import { genaratetoken } from "../lib/units.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt"


export const signup = async (req, res) => {
    const fullName = req.body.fullName;
    const email = req.body.email;
    const password = req.body.password;
    
    try {
   
        if(!fullName || !email || !password){
            return res.status(400).json({
                error: "All fields are required"
            })
        }   



        if(password.length < 6){
            return res.status(400).json({
                error: "Password should be at least 6 characters long"
            })
        }

        const user = await User.findOne({email});

        if(user){    
            return res.status(400).json({
                error: "User already exists"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        });

        if(newUser){
           genaratetoken(newUser._id, res);
           await newUser.save();
           
   res.status(200).json({
              _id: newUser._id,
              fullName: newUser.fullName,
              profilePic: newUser.profilePic,
              message: "User created successfully"
            })

        } else {
            return res.status(400).json({
                error: "User not created"
            })  
        }

    } catch (error) {
        console.log("signup error " , error.message);
        res.json(500).json({
            message: "Internal server error"
        })
    }


}

export const login = (req, res) => {
    res.send('login route')
}


export const logout = (req, res) => {
    res.send('logout route')
}
