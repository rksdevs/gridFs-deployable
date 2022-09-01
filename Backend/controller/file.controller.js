let {
  uploadFileHelper,
  getAllFilesHelper,
  deleteFileByIdHelper,
  findFileHelper,
  downloadFileHelper,
} = require("../utils/gridfs.js");

const uploadFile = async (req, res) => {
  try {
    console.log(req.file);
    uploadFileHelper(req.file, req.userId);
    res.send("Thanks");
  } catch (error) {
    console.error(error);
  }
};
const getAllFiles = async (req, res) => {
  let files = await getAllFilesHelper(req.userId);
  res.status(200).json(files);
};

const deleteFile = async (req, res) => {
  let { fileId } = req.params;
  let file = await findFileHelper(fileId, req.userId);
  file = file[0];
  if (!file) {
    return res.status(404).json({ error: "File not found" });
  }
  await deleteFileByIdHelper(fileId);
  res.send("fileDeleted");
};

const downloadFile = async (req, res) => {
  try {
    let { fileId } = req.params;
    let file = await findFileHelper(fileId, req.userId);
    file = file[0];
    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }
    res.set({
      "Content-Type": file.contentType,
      "Content-Disposition": "attachment; filename=" + file.filename,
      "Content-Length": file.length,
    });
    downloadFileHelper(fileId).pipe(res);
  } catch (error) {
    res.status(500).json({ error });
    console.log(error);
  }
};

module.exports = {
  uploadFile,
  getAllFiles,
  deleteFile,
  downloadFile,
};
