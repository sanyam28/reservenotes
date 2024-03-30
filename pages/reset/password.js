import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import dbConnect from '../../middleware/mongoose';
import Resetpassword from '../../models/Resetpassword';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';
// import User from '../models/User';

const PasswordReset = ({ usertoken, userid }) => {
    const router = useRouter();
    const token = router.query["token"];

    const [password, setpassword] = useState('')
    const [confirmpassword, setconfirmpassword] = useState('')

    const handleChange = (e) => {
        if (e.target.name == 'password') {
            setpassword(e.target.value)
        }
        else if (e.target.name == 'cpassword') {
            setconfirmpassword(e.target.value)
        }
    }

    const resetformsubmit = async (e) => {
        e.preventDefault()
        const data = { password, usertoken, userid }
        let res = await fetch(`/api/user/change-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        let response = await res.json()
        if (response.success) {
            toast.success(response.success, {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setTimeout(() => {
                router.push(`/login`)
            }, 1000);
        }
        else {
            toast.error(response.error, {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }
    return (
        <div>
            <ToastContainer />
            <Head>
                <title>Reset Password - Reserve Notes</title>
            </Head>
            PasswordReset token : <p>{token}</p>
            <div className="conatiner mx-4 m-auto" style={{ width: "70%" }}>
                <div>
                    <form>
                        <div className="form-group">
                            <label htmlFor='password'>Choose New Password</label>
                            <input type="text" name="password" value={password} className="form-control" id="password" placeholder="New Password" onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor='cpassword'>Re-Enter your Password</label>
                            <input type="text" name='cpassword' value={confirmpassword} className="form-control" id="cpassword" placeholder="Confirm Password" onChange={handleChange} />
                        </div>
                        <button disabled={password != confirmpassword || password == ''} type='submit' onClick={resetformsubmit}>Change Password</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PasswordReset

export async function getServerSideProps(context) {
    await dbConnect();
    const usertoken = context.query["token"]

    let passwordreset = await Resetpassword.findOne({ reset_token: usertoken });
    let usersession = JSON.parse(JSON.stringify(passwordreset))

    if (!usersession) {
        return {
            notFound: true,
        }
    }
    const userid = usersession.userid
    return {
        props: { usertoken, userid }
    }
}