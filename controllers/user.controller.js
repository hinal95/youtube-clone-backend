import bcrypt from "bcrypt";
import jsonwebtoken from 'jsonwebtoken'
import user from "../models/user.model.js";


export async function createUser(req, res) {
  try {
    const { username, email, password, avatar } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //  Check if user already exists
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    //  Hash password
    const hash = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await user.create({ username, email, password: hash, avatar });

    return res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    console.error("Registration error:", err);
    return res.status(500).json({ message: err.message }); // 🔧 Fixed: was missing status code
  }
}

//  Login User
export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    console.log("Login Request Body:", req.body); //  Log request for debugging

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const users = await user.findOne({ email });
    if (!users) {
      return res.status(400).json({ message: "User not found" });
    }

    const valid = await bcrypt.compare(password, users.password);
    if (!valid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jsonwebtoken.sign(
  { id: users._id, username: users.username },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);
    res.status(200).json({ token, username: users.username });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
}
