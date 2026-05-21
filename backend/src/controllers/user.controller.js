import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
    try {
        const { username, email , password } = req.body;
        
        // basic validation

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are important!"});
        }

        // check if user already exists

        const existing = await User.findOne({ email : email.toLowerCase() });
        if (existing) {
            return res.status(400).json({ message : "User already exists!"});
        }

        // create user

        const user = await User.create({
            username,
            email,
            password,
            loggedIn:false,
        });

        res.status(201).json({
            message: "User registered",
            user: { id : user._id, email: user.email, username: user.username }
        })
        
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error : error.message});
    }
};


const loginUser = async (req, res) => {
    try {
        // check if user already exists

        const { email, password} = req.body;
        
        const user = await User.findOne({
            email : email
        });

        if(!user) return res.status(400).json({ 
                meassage : "Invalid Username"
        });

        // password validation
        const isMatch = await user.comparePassword(password);

        if(!isMatch) return res.status(400).json({
            message : "Invalid password"
        });

        res.status(200).json({
            meassage : "User logged in",
            user: {
                id : user._id,
                email : user.email
            }
        });
        
    }
    catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error : error.message
        });
    }
};

const logoutUser = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({
            email : email
        });

        if(!user) return res.status(400).json({
            message : "User not logged in"
        });

        return res.status(200).json({
            message: "User logged out"
        });
    } catch (error) {
        res.status(500).json({
            error : error.meassage
        });
    }
}
export {
    registerUser,
    loginUser,
    logoutUser
};