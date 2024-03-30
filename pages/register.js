import React, {useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import Link from 'next/link';

const Register = () => {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmpassword] = useState('')
  const [regbtn, setRegbtn] = useState(false)

  const checkregbtn = () => {
    if(username == '' || name==''||email==''||password==''||password!=confirmpassword){
      setRegbtn(false)
    }
    else{
      setRegbtn(true)
    }
  }

  const handleChange = (e) => {
    if(e.target.name == 'username'){
      setUsername(e.target.value)
    }
    else if(e.target.name == 'name'){
      setName(e.target.value)
    }
    else if(e.target.name == 'email'){
      setEmail(e.target.value)
    }
    else if(e.target.name == 'password'){
      setPassword(e.target.value)
    }
    else if(e.target.name == 'cpassword'){
      setConfirmpassword(e.target.value)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {username, name, email, password}
    let res = await fetch(`${process.env.NEXT_BASE_PUBLIC_URL}/api/user/newuser`, {
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
        <title>New Account - Reserve Notes</title>
      </Head>
      <div className="my-4 w-100">


        <section className="vh-100">
          <div className="container-fluid h-custom">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-md-9 col-lg-6 col-xl-5">
                <img src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-login-form/draw2.png"
                  className="img-fluid" alt="regiter image"/>
              </div>
              <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                <div className="container">
                  <h1 className="text-center">Register</h1>
                  <p className="text-center">Please fill the form correctly</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="username">Choose Your Unique Username</label>
                      <input type="text" name="username" value={username} onChange={handleChange} id="username" className="form-control form-control-lg"
                        placeholder="Username" required />
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="name">Your Name</label>
                      <input type="text" name="name" value={name} onChange={handleChange} id="name" className="form-control form-control-lg"
                        placeholder="Name" required />
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="email">Email address</label>
                      <input type="email" name="email" value={email} onChange={handleChange} id="email" className="form-control form-control-lg"
                        placeholder="Enter a valid email address" required />
                    </div>
                    <div className="form-outline mb-3">
                      <label className="form-label" htmlFor="password">Password</label>
                      <input type="password" name="password" value={password} onChange={handleChange} id="password" className="form-control form-control-lg"
                        placeholder="Enter password" required />
                    </div>
                    <div className="form-outline mb-3">
                      <label className="form-label" htmlFor="cpassword">Confirm Password</label>
                      <input type="password" name="cpassword" value={confirmpassword} onChange={handleChange} id="cpassword" className="form-control form-control-lg"
                        placeholder="Enter password again" required />
                    </div>
                    <div className="text-center text-lg-start mt-4 pt-2">
                      <button type="submit" className="btn btn-primary btn-lg login-btn" disabled={username == '' || name==''||email==''||password==''||password!=confirmpassword}>Register</button>
                      <p className="small fw-bold mt-2 pt-1 mb-0">Already Registered?<Link href={'/login'}>Login</Link></p>
                    </div>

                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Register