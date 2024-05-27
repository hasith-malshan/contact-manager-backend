const express = require("express");
const {
  getContact,
  getAllContacts,
  createContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactCotroller");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

router.use(validateToken);
router.route("/").get(getAllContacts);

router.route("/:id").get(getContact);

router.route("/").post(createContact);

router.route("/:id").put(updateContact);

router.route("/:id").delete(deleteContact);

module.exports = router;
