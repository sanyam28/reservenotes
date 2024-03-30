import dbConnect from "../../../middleware/mongoose"
import Note from "../../../models/Note"
import User from "../../../models/User"

const handler = async (req, res) => {
    if (req.method == 'POST') {
        await dbConnect()

        try {
            const userdata = await User.findById(req.body.userid)
            const note = await Note.findOneAndDelete({ _id: req.body.noteid, user: userdata })
            if (note) {
                res.status(200).json({ success: "Note deleted successfully" })
            }
            else {
                res.status(400).json({ error: "Something went wrong. Try to relogin again" })
            }
        }
        catch {
            res.status(400).json({ error: "Something went wrong. Try to relogin again" })
        }
    }
    else {
        res.status(400).json({ error: "This method is not allowed" })
    }
}

export default handler;
