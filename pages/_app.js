import "../styles/globals.css";
import "../styles/dashboard.css";
import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
var jwt = require('jsonwebtoken');
import { useRouter } from "next/navigation";
import { Cookies, useCookies } from "react-cookie"
import 'react-toastify/dist/ReactToastify.css';
import NextNProgress from 'nextjs-progressbar';


function MyApp({ Component, pageProps }) {

  const [user, setUser] = useState({ value: null })
  const [key, setKey] = useState(0)
  const [cookie, setCookie, removeCookie] = useCookies(["user"])

  const router = useRouter()

  const logout = () => {
    const reserveuser = cookie.user
    if (reserveuser) {
      setCookie("user", '')
      setUser({ value: null })
      setKey(Math.random())
    }
  }

  const verifyuser = async () => {

    const reserveuser = cookie.user
    if (reserveuser) {
      try {
        const serverres = await fetch(`${process.env.NEXT_BASE_PUBLIC_URL}/api/user/getuser`).then(res => res.json())
        if (serverres.loggedin || serverres.success) {
          setUser({ value: serverres.usertoken })
          setKey(Math.random())
          return
        }
        else {
          logout()
          return
        }
      }
      catch {
        logout()
        return
      }
    }
  }

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
    verifyuser()

  }, [router.query]);


  return <>
    <NextNProgress
      color="red"
      options={{ showSpinner: false }}
    />
    <Sidebar user={user} logout={logout} key={key}>
      <Component {...pageProps} user={user} />
    </Sidebar>
  </>;
}

export default MyApp;