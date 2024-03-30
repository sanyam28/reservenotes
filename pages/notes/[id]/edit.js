import React, { useEffect, useState } from 'react'
var jwt = require('jsonwebtoken');
import Note from '../../../models/Note';
import dbConnect from '../../../middleware/mongoose';
import User from '../../../models/User';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import router from 'next/navigation';

const EditNote = ({ note, userid }) => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  useEffect(() => {
    setTitle(note.title)
    setBody(note.body)
  }, [])

  const handleChange = (e) => {
    if (e.target.name == 'title') {
      setTitle(e.target.value)
    }
    else if (e.target.name == 'description') {
      setBody(e.target.value)
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const _id = note._id
    const data = { _id, title, body, userid }
    let res = await fetch(`http://localhost:3000/api/notes/update`, {
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
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="notetitle" className="form-label">Title</label>
            <input type="text" name="title" value={title} onChange={handleChange} className="form-control" id="notetitle" required />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea type="password" name="description" value={body} onChange={handleChange} className="form-control" id="description"
              rows="10"></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Update Note</button>
        </form>
      </div>
    </div>
  )
}

export default EditNote

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
          props: { note: JSON.parse(JSON.stringify(note)), userid: verify.userid }
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