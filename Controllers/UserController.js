import User from "../Models/User.js";
import {ValidateLogin, __isErrors, validateRegister} from '../Validation/Auth.js';
import bcrpt from "bcryptjs";
import Jwt from "jsonwebtoken";

export const singIn = async (req, res) => {
    const errors = ValidateLogin(req.body);

    if (__isErrors(errors)) return res.status(422).json({
        message: errors
    });

    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({email});
        if (!existingUser) {
            return res.status(404).json({message: "User doesn't exists."});
        }
        const isPassword = await bcrpt.compare(password, existingUser.password);
        if (!isPassword) {
            return res.status(400).json({message: "INVALID CREDENTIALS."});
        }
        const token = Jwt.sign(
            {email: existingUser.email, id: existingUser._id},
            "test",
            {expiresIn: "1h"}
        );
        res.status(200).json({result: existingUser, token});
    } catch (error) {
        res.status(500).json({message: "Something Want to Wrong."});
    }
};

export const singUp = async (req, res) => {

    const errors = validateRegister(req.body);

    if (__isErrors(errors)) return res.status(422).json({
        message: errors
    });

    const { name, email, password, confirmPassword } = req.body;

    try {
        const existUser = await User.findOne({ email });
        if (existUser) return res.status(400).json({message: "User already registered."});
        if (password !== confirmPassword) return res.status(400).send({ message: "Password doesn't match !" });
        const hashPassword = await bcrpt.hash(password, 12);
        const result = await User.create({ email, password: hashPassword, name: name });
        const token = Jwt.sign({ email: result.email, id: result._id },
            "test", {expiresIn: "1h"});
        res.status(200).json({result, token});

    } catch (error) {
        res.status(500).json({ message: "Something Want to Wrong." });
    }
}

export const getRegisterUser = async (req, res) => {
    try {
        const existUser = await User.find({})
        res.status(200).json({registerUser:existUser});

    } catch (error) {
        res.status(500).json({ message: "Something Want to Wrong." });
    }
}
