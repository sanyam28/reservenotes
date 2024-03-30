import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import {useRouter} from 'next/navigation';
import Head from 'next/head';
import { useCookies } from "react-cookie"
import Link from 'next/link';
import Image from 'next/image';

const Login = () => {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cookie, setCookie] = useCookies(["user"])

  const handleChange = (e) => {
    if (e.target.name == 'email') {
      setEmail(e.target.value)
    }
    else if (e.target.name == 'password') {
      setPassword(e.target.value)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = { email, password }
    let res = await fetch(`${process.env.NEXT_BASE_PUBLIC_URL}/api/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let response = await res.json()
    setEmail('')
    setPassword('')
    if (response.success) {
      setCookie("user", JSON.stringify({ email: response.email, token: response.token, username: response.username, userid: response.userid }), {
        path: "/",
        maxAge: 3600, // Expires after 1hr
        sameSite: true,
      })

      toast.success('Succesfully logged in', {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        router.push(`/`)
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
        <title>Login - Reserve Notes</title>
      </Head>
      <div className="my-4 w-100">


        <section className="vh-100">
          <div className="container-fluid h-custom">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-md-9 col-lg-6 col-xl-5">
                <Image src='/login.png' className="img-fluid"
                  alt="login image" width={500} height={500} />
              </div>
              <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                <div className="container">
                  <h1 className="text-center">Login</h1>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="email">Your Email:</label>
                    <input value={email} onChange={handleChange} type="email" name="email" id="email" className="form-control form-control-lg"
                      placeholder="Enter your correct username" required />
                  </div>
                  <div className="form-outline mb-3">
                    <label className="form-label" htmlFor="password">Your Password:</label>
                    <input value={password} onChange={handleChange} type="password" name="password" id="password" className="form-control form-control-lg"
                      placeholder="Enter password" required />
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                  </div>
                  <div className="text-center text-lg-start mt-4 pt-2">
                    <button className="btn btn-primary btn-lg login-btn" type='submit'>Login</button>
                    <p className="fw-bold mt-2 pt-1 mb-0">Dont have an account? <Link href={'/register'} className="link-danger">Register</Link></p>
                    <p className="fw-bold mt-2 pt-1 mb-0">Have You forgotten your password?<Link href={'/password-reset'} className="link-danger">Reset Password</Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5">
            <div>
              <span className="text-white me-4">
                <i className="fab fa-facebook-f"></i>
              </span>
              <span className="text-white me-4">
                <i className="fab fa-twitter"></i>
              </span>
              <span className="text-white me-4">
                <i className="fab fa-google"></i>
              </span>
              <span className="text-white">
                <i className="fab fa-linkedin-in"></i>
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Login