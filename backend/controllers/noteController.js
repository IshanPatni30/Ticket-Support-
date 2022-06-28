const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const Ticket = require("../models/ticketModel")
const Note=require('../models/noteModel');


// Description: get notes for a ticket
// @route  get api/tickets/:ticketId/notes
// @access Private
const getNotes = asyncHandler(async (req, res) => {
  // get user using the id and jet
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error("User Not Found")
  }
  const ticket = await Ticket.findById(req.params.ticketId)

//   make sure its the user's ticket
if(ticket.user.toString()!==req.user.id){
    res.status(401)
    throw new Error('User not AUthorized')
}

const notes=await Note.find({ticket:req.params.ticketId})

  res.status(200).json(notes)
})


// Description: create Ticket notes
// @route  POST api/tickets/:ticketId/notes
// @access Private
const addNote= asyncHandler(async (req, res) => {
  // get user using the id and jet
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error("User Not Found")
  }
  const ticket = await Ticket.findById(req.params.ticketId)

//   make sure its the user's ticket
if(ticket.user.toString()!==req.user.id){
    res.status(401)
    throw new Error('User not Authorized')
}

const note=await Note.create({
    text:req.body.text,//text from the body
    isStaff:false,
    ticket:req.params.ticketId,
    user:req.user.id        })

  res.status(200).json(note)
})







module.exports={
    getNotes,
    addNote
}