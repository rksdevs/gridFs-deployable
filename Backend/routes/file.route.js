const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const {
  uploadFile,
  getAllFiles,
  deleteFile,
  downloadFile,
} = require("../controller/file.controller");
const multer = require("multer");
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

router.post("/", authMiddleware, upload.single("file"), uploadFile);

router.get("/all", authMiddleware, getAllFiles);

router.get("/download/:fileId", authMiddleware, downloadFile);

router.delete("/:fileId", authMiddleware, deleteFile);

module.exports = router;
