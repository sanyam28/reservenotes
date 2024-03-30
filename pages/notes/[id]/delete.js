import React from 'react'
var jwt = require('jsonwebtoken');
import Note from '../../../models/Note';
import dbConnect from '../../../middleware/mongoose';
import User from '../../../models/User';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import router from 'next/navigation';
import Link from 'next/link'
import Head from 'next/head';

const Deltenote = ({ userid, noteid }) => {
  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = { noteid, userid }
    let res = await fetch(`${process.env.NEXT_BASE_PUBLIC_URL}/api/notes/delete`, {
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
        router.push(`/notes`)
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
        <title>Delete Note - Reserve Notes</title>
      </Head>
      <div className="card-body text-center">
        <h5 className="card-title">Confirmation</h5>
        <p className="card-text">Are you sure you want to delete this note?</p>
        {/* <p className="card-text">{note.createdAt.substring(0, 10)}</p> */}
        <Link href={`/notes`}><span className="btn btn-primary mx-1">No</span></Link>
        <span className="btn btn-danger" onClick={handleSubmit}>Yes</span>
      </div>
    </div>
  )
}

export default Deltenote

export async function getServerSideProps(context) {
  try {
    const usertoken = JSON.parse(context.req.cookies['user']).token
    if (usertoken) {
      const verify = jwt.verify(usertoken, process.env.SECRET_KEY)
      if (verify) {
        await dbConnect();
        const noteid = context.params.id
        const finduser = await User.findById(verify.userid)
        const note = await Note.findOne({ _id: noteid, user: finduser });
        if (!note) {
          return {
            notFound: true
          }
        }
        return {
          props: { noteid: JSON.parse(JSON.stringify(note))._id, userid: verify.userid }
        }
      }
    }
  }
  catch {
    return {
      notFound: true
    }
  }
}