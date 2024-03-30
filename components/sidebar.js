import React from 'react'
import Link from 'next/link'

const Sidebar = ({ children, user, logout }) => {
  return (
    <div>
      <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <Link href={'/'}><span className="navbar-brand col-md-3 col-lg-2 me-0 px-3 pointer">Sanyam Bucha</span></Link>
        <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse"
          data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* <input className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search" /> */}
      </header>
      <div className="container-fluid">
        <div className="row">
          <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div className="position-sticky pt-3">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <Link href={'/'}>
                    <div className="nav-link pointer" aria-current="page">
                      <span data-feather="home"></span>
                      Dashboard
                    </div></Link>
                </li>
                <li className="nav-item">
                  <Link href={'/notes'}>
                    <div className="nav-link pointer" aria-current="page">
                      <span data-feather="home"></span>
                      Notes
                    </div></Link>
                </li>
                <li className="nav-item">
                  <Link href={'/notes/add-note'}>
                    <div className="nav-link pointer" aria-current="page">
                      <span data-feather="home"></span>
                      New Note
                    </div></Link>
                </li>
              </ul>
              <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                <span>Account</span>

                {/* <a className="link-secondary" href="/my-account/register/" aria-label="Create Account">
                  <span data-feather="plus-circle"></span>
                </a> */}

              </h6>
              {user.value ? <ul className="nav flex-column mb-2">
              <li className="nav-item">
                    <div className="nav-link pointer" aria-current="page" onClick={logout}>
                      <span data-feather="home"></span>
                      Logout
                    </div>
                  </li>
              </ul> :
                <ul className="nav flex-column mb-2">
                  <li className="nav-item">
                  <Link href={'/login'}>
                    <div className="nav-link pointer" aria-current="page">
                      <span data-feather="home"></span>
                      Login
                    </div></Link>
                </li>
                <li className="nav-item">
                  <Link href={'/register'}>
                    <div className="nav-link pointer" aria-current="page">
                      <span data-feather="home"></span>
                      Register
                    </div></Link>
                </li>
                </ul>
              }
            </div>
          </nav>
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div
              className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">Keep Notes</h1>

              {/* <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group me-2">
                  <button type="button" className="btn btn-sm btn-outline-secondary" data-bs-toggle="modal"
                    data-bs-target="#addnote">New Note</button>
                </div>
              </div> */}

            </div>
            <div className="modal fade" id="addnote" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"
              aria-labelledby="staticBackdropLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="addnote">Add Note</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <form>
                      <div className="mb-3">
                        <label htmlFor="notetitle" className="form-label">Title</label>
                        <input type="text" name="title" className="form-control" id="notetitle" required />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea type="password" name="description" className="form-control" id="addnotet"
                          rows="10"></textarea>
                      </div>
                      <button type="submit" className="btn btn-primary">Add Note</button>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}

export default Sidebar