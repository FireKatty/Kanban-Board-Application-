const User  = require("../models/signupSchema")
const bcrypt  = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (userId)=>{
    const token = jwt.sign( {userId}, process.env.JWT_SECRET, {
        expiresIn: "15d"
    } );
    return token;
};


const signup = async (req, res) => {
    try {
        console.log(req.body)
      const {name, email, password, confirmPassword } = req.body;
      // console.log(confirmPassword)

  
      // Check if passwords match
      // if (password !== confirmPassword) {
      //   return res.status(400).json({ error: "Passwords do not match" });
      // }
  
      // Check if the username already exists
      const existingUser = await User.findOne({ email });
      console.log(email)
      if (existingUser) {
        return res.status(400).json({ error: "Email already exists" });
      }
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      console.log(hashedPassword)
  
      // Create a new user
      const newUser = new User({
        name,
        email,
        password: hashedPassword, // Store the hashed password
      });
  
      // Save the user to the database
      await newUser.save();
      console.log(newUser)
      // Generate JWT token
      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "15d",
      });
  
      // Send the response with the new user and token
      res.status(201).json({
        result: newUser,
        auth: token,
      });
    } catch (error) {
      console.error("Error in signup controller", error.message);
      res.status(500).json({
        error: "Internal server error",
      });
    }
};
  
const check_email =  async (req, res) => {
  try {
    const { email } = req.body;

    // Validate that the email field is provided
    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    // Check if the email exists in the database
    const user = await User.findOne({ email });

    if (user) {
      return res.status(200).json({ exists: true });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (error) {
    console.error("Error checking email:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while checking the email." });
  }
};



const login = async(req,res)=>{
    try {
        // console.log(req.body)
        const {email,password} = req.body;
        const user = await User.findOne({email});
        console.log(user)
        const isPasswordCorrect = await bcrypt.compare(password,user?.password|| "");
        // console.log(user)
        if (!user || !isPasswordCorrect){
            return res.status(401).json({error:"Invalid email or password"})
        }

        const token = generateToken(user._id);
        console.log(user)
        // console.log(token)
        res.send({result:user,auth:token});
    
    } catch (error) {
        console.log("Error in login controller",error.message)
        res.status(500).json({
            error:"Internal server Error"
        });
    }
}


module.exports = {signup,check_email,login};