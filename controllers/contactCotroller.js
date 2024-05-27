// Endpoint = /api/contacts/
const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// GET
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  isContactFound(contact, res);

  res.status(200).json(contact);
});

// GET All
const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({user_id : req.user.id});
  res.status(200).json(contacts);
});

// POST
// Endpoint = /api/contacts/
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandotory");
  }

  const contact = await Contact.create({ name, email, phone , user_id : req.user.id});

  res.status(201).json(contact);
});

// PUT
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  isContactFound(contact, res);

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json({ updatedContact });
});

// DELETE
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  isContactFound(contact, res);

  await Contact.deleteOne({ _id: req.params.id });

  res.status(200).json(contact);
});

module.exports = {
  getContact,
  getAllContacts,
  createContact,
  updateContact,
  deleteContact,
};
function isContactFound(contact, res) {
  if (!contact) {
    res.status(404);
    throw new Error("Contact with given id NOT FOUND");
  }
}
