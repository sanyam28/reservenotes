import React, {useState} from 'react'
var jwt = require('jsonwebtoken');
import { ToastContainer, toast } from 'react-toastify';
import router from 'next/navigation';
import Head from 'next/head';

const Addnote = ({userid}) => {
  const [title, settitle] = useState('')
  const [body, setBody] = useState('')


  const handleChange = (e) => {
    if(e.target.name == 'title'){
      settitle(e.target.value)
    }
    else if(e.target.name == 'description'){
      setBody(e.target.value)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {title, body, userid}
    let res = await fetch(`${process.env.NEXT_BASE_PUBLIC_URL}/api/notes/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let response = await res.json()
    settitle('')
    setBody('')
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
        <title>Add Note</title>
      </Head>
      <div className="container">
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="notetitle" className="form-label">Title</label>
              <input type="text" name="title" value={title} onChange={handleChange} className="form-control" id="notetitle" required/>
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Content</label>
              <textarea name="description" value={body} onChange={handleChange} className="form-control" id="description"
                rows="10"></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Add Note</button>
        </form>
      </div>
    </div>
  )
}

export default Addnote

export async function getServerSideProps(context) {
  try {
      const usertoken = JSON.parse(context.req.cookies['user']).token
      if (usertoken) {
          const verify = jwt.verify(usertoken, process.env.SECRET_KEY)
          if (verify) {
              return {
                  props: {userid: verify.userid}
              }
          }
      }
  }
  catch {
      return {
          redirect: {
              permanent: false,
              destination: "/login",
          },
          props: {}
      }
  }
}