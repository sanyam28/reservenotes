import dbConnect from "../../../middleware/mongoose"
import Note from "../../../models/Note";
import User from "../../../models/User";

const handler = async (req, res) => {
    if (req.method == 'POST') {
        await dbConnect()

        // code for adding multiple notes
        // for (let i = 0; i < req.body.length; i++) {
        //     let note = new Note({
        //         title: req.body[i].title,
        //         body: req.body[i].body,
        //         user: req.body[i].userid
        //     })
        //     await note.save()
        // }
        if(req.body.userid){
            const checkuser = await User.findById(req.body.userid)
            if(checkuser){
                let note = new Note({
                    title: req.body.title,
                    body: req.body.body,
                    user: req.body.userid
                })
                await note.save()
                res.status(200).json({ success: "Note added successfully" })
            }
            else{
                res.status(400).json({ error: "Something went wrong. Try to relogin again" })
            }
        }
        else{
            res.status(400).json({ error: "Something went wrong" })
        }
    }
    else {
        res.status(400).json({ error: "This method is not allowed" })
    }
}

export default handler;
  