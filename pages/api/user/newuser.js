import User from "../../../models/User"
import dbConnect from "../../../middleware/mongoose"
var CryptoJS = require("crypto-js")

const handler = async (req, res) => {
    if (req.method == 'POST') {
        await dbConnect()
        // for (let i = 0; i < req.body.length; i++) {
        try {
            const userexistsusername = await User.findOne({ username: req.body.username })
            const userexistsemail = await User.findOne({ email: req.body.email })
            if (userexistsusername) {
                res.status(400).json({ error: "This Username already taken!" })
            }
            else if (userexistsemail) {
                res.status(400).json({ error: "This Email is already taken!" })
            }
            else {
                var enpass = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString();
                let nuser = new User({
                    name: req.body.name,
                    username: req.body.username,
                    email: req.body.email,
                    password: enpass,
                    is_active: req.body.is_active
                })
                await nuser.save()
                // }
                res.status(200).json({ success: "User added successfully" })
            }
        }
        catch{
            res.status(400).json({ error: "Something went wrong! try again later" })
        }

    }
    else {
        res.status(400).json({ error: "This method is not allowed" })
    }
}

export default handler;
