var jwt = require('jsonwebtoken');

const handler = async (req, res) => {
    const reserveuser = req.cookies.user
    if(!reserveuser) {
        res.status(401).json({ success: false, loggedin: false})
    }
    try {
        const parsed = JSON.parse(reserveuser)
        const usertoken = parsed.token
        jwt.verify(usertoken, process.env.SECRET_KEY)
        res.status(200).json({ success: true, loggedin: true, usertoken: usertoken })
    } catch (error) {
        res.status(401).json({ success: false, loggedin: false})
    }
}

export default handler;
