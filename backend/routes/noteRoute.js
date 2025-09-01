import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import {
  deleteNotes,
  getAllNotes,
  getSingleNotes,
  myUploadedNotes,
  searchNotes,
  updateNotesDetails,
  uploadNote,
} from "../controller/noteController.js";
import { upload } from "../utils/multer.js";

const router = express.Router();

router
  .post("/upload", isAuthenticated, upload.single("file"), uploadNote)
  .get("/all", getAllNotes)
  .get("/search", isAuthenticated, searchNotes)
  .put(
    "/update/:id",
    isAuthenticated,
    upload.single("file"),
    updateNotesDetails
  )
  .delete("/delete/:id", isAuthenticated, deleteNotes)
  .get("/:id/notes", isAuthenticated, myUploadedNotes)
  .get("/:id", getSingleNotes);

export default router;
