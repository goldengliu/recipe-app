import express from"express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";

const router = express.Router();

router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });

    if (user) {
        return res.json({message: "username already in use"});
    }

    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = new UserModel({username, password: hashedPass});
    await newUser.save();
    res.json({message: "user registered successfully"});
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username});
   
    if (!user) {
        return res.json({message: "user doesn't exist"});
    }

    const isPassValid = await bcrypt.compare(password, user.password);
    if (!isPassValid) {
        console.log('password is not valid');
        return res.json({message: "username or password is incorrect"});
    }

    const token = jwt.sign({id: user._id}, "secret");
    res.json({token, userID: user._id});
});

export {router as userRouter};