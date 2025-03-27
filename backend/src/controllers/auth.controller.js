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

export const login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                message: "Invaild credentials"
            })  
        }

 const isPasswordMatch = await bcrypt.compare(password, user.password);

 if(!isPasswordMatch){
    return res.status(400).json({
        message: "Invaild credentials"
    })
 }

 genaratetoken(user._id, res);

 res.status(200).json({
    _id: user._id,
    fullName: user.fullName,
    profilePic: user.profilePic,
    message: "User logged IN successfully"
  })


    } catch (error) {
        console.log("login error " , error.message);
        res.json(500).json({
            message: "Internal server error"
        })
    }
}


export const logout = (req, res) => {
    try {
        res.cookie('jwt', "", {
            maxAge: 0
        })
        res.status(200).json({
            message: "User logged Out successfully"
        })
    } catch (error) {
        console.log("logout error " , error.message);
        res.json(500).json({
            message: "Internal server error"
        })  
    }
}
