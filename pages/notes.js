import React from 'react'
import Link from 'next/link'
import dbConnect from '../middleware/mongoose'
import Note from '../models/Note'
import Head from 'next/head'
var jwt = require('jsonwebtoken');

const Notes = ({ notes }) => {

    return (
        <div>
            <Head>
                <title>Notes - Reserve Notes</title>
            </Head>
            <div className="container">
                <div className="bd-example row p-3">
                    <div className="card notes-card m-2">
                        <div className="card-body">
                            <h5 className="card-title">Add Note</h5>
                            {/* <p className="card-text">{note.createdAt.substring(0, 10)}</p> */}
                            <Link href={`/notes/add-note`}><span className="btn btn-primary mx-1">Add</span></Link>
                        </div>
                    </div>
                    {notes.map((note) => (
                        <div className="card notes-card m-2" key={note._id}>
                            <div className="card-body">
                                <h5 className="card-title">{note.title}</h5>
                                <p className="card-text">{note.body}</p>
                                {/* <p className="card-text">{note.createdAt.substring(0, 10)}</p> */}
                                <Link href={`/notes/${note._id}/edit`}><span className="btn btn-primary mx-1">Edit</span></Link>
                                <Link href={`/notes/${note._id}/delete`}><span className="btn btn-danger">Delete</span></Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Notes

export async function getServerSideProps(context) {
    try {
        const usertoken = JSON.parse(context.req.cookies['user']).token
        if (usertoken) {
            const verify = jwt.verify(usertoken, process.env.SECRET_KEY)
            if (verify) {
                await dbConnect();
                const notes = await Note.find({ user: verify.userid }).sort('-updatedAt');
                return {
                    props: { notes: JSON.parse(JSON.stringify(notes)) }
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

    // return {
    //     redirect: {
    //         permanent: false,
    //         destination: "/login",
    //     },
    //     props: {}
    // }
}