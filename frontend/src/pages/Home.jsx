import React from "react"
import { Link } from "react-router-dom"
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa"
const Home = () => {
  return (
    <>
      <section className="heading">
        <h1>What do You need help with</h1>
        <p>Please choose an Option</p>
      </section>
      <Link to="/new-ticket" className="btn btn-reverse btn-block">
        <FaQuestionCircle /> Create New Ticket
      </Link>
      <Link to="/tickets" className="btn  btn-block">
        <FaTicketAlt /> View My tickets
      </Link>
    </>
  )
}

export default Home
