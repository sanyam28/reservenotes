import dbConnect from '../../../middleware/mongoose';
import User from '../../../models/User';
import Resetpassword from '../../../models/Resetpassword';
var CryptoJS = require("crypto-js");


const handler = async (req, res) => {
    if (req.method == 'POST') {
        await dbConnect()
        const resetpasswordmodel = await Resetpassword.findOne({ reset_token: req.body.usertoken })
        const usermodel = await User.findById(req.body.userid)
        if (resetpasswordmodel || usermodel) {
            try {
                const delteresetmodel = await Resetpassword.findByIdAndDelete(resetpasswordmodel._id)
                if (delteresetmodel) {
                    var newpassword = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString();
                    const changepassword = await User.findByIdAndUpdate(req.body.userid, { password: newpassword })
                    if (changepassword) {
                        res.status(200).json({ success: "Password changed Successfully" })
                    }
                    else {
                        res.status(400).json({ error: "Something went wrong! Try agin later" })
                    }
                }
                else {
                    res.status(400).json({ error: "Something went wrong! Try agin later" })
                }

            }
            catch {
                res.status(400).json({ error: "Invalid token or user" })
            }
        }
        else {
            res.status(400).json({ error: "Invalid token or user" })
        }

    }
    else {
        res.status(400).json({ error: "This method is not allowed" })
    }
}

export default handler;
