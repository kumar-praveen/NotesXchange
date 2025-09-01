import { Note } from "../models/noteModel.js";
import cloudinary, { uploadOnCloudinary } from "../utils/cloudinary.js";

export const uploadNote = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        message: "Please provide the required details",
        success: false,
      });
    }

    if (!req.file) {
      return res
        .status(400)
        .json({ message: "Please upload a PDF file", success: false });
    }

    const cloudinaryRes = await uploadOnCloudinary(req.file.path);
    const fileUrl = cloudinaryRes.secure_url;
    const filePublicId = cloudinaryRes.public_id;
    const localFileName = req.file.originalname;

    if (!cloudinaryRes) {
      return res.status(500).json({
        message: "Failed to upload file",
        success: false,
      });
    }

    const { title, description, subject } = req.body;
    const userId = req.id;

    if (!title || !description || !subject) {
      return res
        .status(401)
        .json({ message: "All fields are required", success: false });
    }

    const newNote = await Note.create({
      title,
      description,
      subject,
      fileUrl,
      filePublicId,
      localFileName,
      uploadedBy: userId,
    });

    return res.status(200).json({
      message: "Notes uploaded successfully",
      success: true,
      notes: newNote,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    return res.status(200).json({ notes: notes.reverse(), success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const getSingleNotes = async (req, res) => {
  const notesId = req.params.id;

  const notes = await Note.findOne({ _id: notesId });

  if (!notes) {
    return res.status(400).json({ message: "Notes not found", success: false });
  }

  return res.status(200).json({ notes, success: true });
};

export const myUploadedNotes = async (req, res) => {
  const userId = req.params.id;
  const notes = await Note.find({ uploadedBy: userId });

  if (notes.length === 0) {
    return res
      .status(400)
      .json({ message: "You haven't uploaded any notes yet", success: false });
  }

  return res
    .status(200)
    .json({ message: "Your uploaded notes", notes, success: true });
};

export const searchNotes = async (req, res) => {
  try {
    const { query } = req.query;
    const notes = await Note.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { subject: { $regex: query, $options: "i" } },
        { localFileName: { $regex: query, $options: "i" } },
      ],
    });

    if (notes.length === 0) {
      return res
        .status(400)
        .json({ message: `${query} related notes not found`, success: false });
    }

    return res.status(200).json({ notes, success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const updateNotesDetails = async (req, res) => {
  try {
    const notesId = req.params.id;

    const notes = await Note.findById(notesId);

    if (!notes) {
      return res
        .status(400)
        .json({ message: "Notes not found", success: false });
    }

    let updatedData = {
      title: req.body.title || notes.title,
      description: req.body.description || notes.description,
      subject: req.body.subject || notes.subject,
    };

    if (req.file) {
      await cloudinary.uploader.destroy(notes.filePublicId, {
        resource_type: "raw",
        invalidate: true,
      });

      const cloudinaryRes = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "raw",
        folder: "notesXchange_Notes",
        use_filename: true,
        unique_filename: false,
      });

      updatedData.fileUrl = cloudinaryRes.secure_url;
      updatedData.filePublicId = cloudinaryRes.public_id;
      updatedData.localFileName = req.file.originalname;
    }

    const updatedNotes = await Note.findByIdAndUpdate(notesId, updatedData, {
      new: true,
    });

    return res.status(200).json({
      message: "Notes updated successfully",
      updatedNotes,
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const deleteNotes = async (req, res) => {
  try {
    const notesId = req.params.id;
    const notes = await Note.findById(notesId);
    //delete from cloudinary first
    await cloudinary.uploader.destroy(notes.filePublicId, {
      resource_type: "raw",
      invalidate: true,
    });
    //Now delete from database
    const deletedNotes = await Note.findByIdAndDelete(notesId);

    return res.status(200).json({
      message: "Notes deleted successfully",
      success: true,
      deletedNotes,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
