import User from "../../../models/User"
import dbConnect from "../../../middleware/mongoose"
var jwt = require('jsonwebtoken');
var CryptoJS = require("crypto-js");


const handler = async (req, res) => {
    if (req.method == 'POST') {
        await dbConnect()
        let user = await User.findOne({ "email": req.body.email })

        if (user) {
            var bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
            var originalpassword = bytes.toString(CryptoJS.enc.Utf8);
            if (req.body.email == user.email && req.body.password == originalpassword) {
                var token = jwt.sign({ userid: user._id, identitiy: user.username, email: user.email, name: user.name }, process.env.SECRET_KEY, {
                    expiresIn: "2d"
                });
                res.status(200).json({ success: true, token, username: user.username, email: user.email, userid: user._id })
            }
            else {
                res.status(200).json({ success: false, error: "Invalid Crediantials" })
            }
        }
        else {
            res.status(200).json({ success: false, error: "Invalid Crediantials" })
        }

    }
    else {
        res.status(400).json({ error: "This method is not allowed" })
    }
}

export default handler;
