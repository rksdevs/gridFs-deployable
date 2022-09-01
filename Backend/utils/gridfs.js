const mongoose = require("mongoose");
const { Readable } = require("stream");

let info = () => {
  let db = mongoose.connection.db;
  let bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: "Drive" });
  return bucket;
};

const uploadFileHelper = (file, userId) => {
  let bucket = info();
  const buffer = file.buffer;
  function bufferToStream(buffer) {
    let stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    return stream;
  }
  return new Promise((res, rej) => {
    bufferToStream(buffer).pipe(
      bucket
        .openUploadStream(file.originalname, {
          metadata: {
            userId,
          },
          contentType: file.mimetype,
        })
        .on("error", () => {
          rej("File Upload Failed");
        })
        .on("finish", () => {
          res("done");
        })
    );
  });
};

const getAllFilesHelper = async (userId) => {
  let bucket = info();
  let x = await bucket.find({ metadata: { userId } });
  return x.toArray();
};

const deleteFileByIdHelper = (id) => {
  let bucket = info();
  id = new mongoose.mongo.ObjectID(id);
  return new Promise((res, rej) => {
    bucket.delete(id, (err, result) => {
      if (err) {
        rej(err);
      }
      res();
    });
  });
};

const findFileHelper = async (fileId, userId) => {
  let bucket = info();
  fileId = new mongoose.mongo.ObjectID(fileId);
  let file = await bucket.find({
    _id: fileId,
    metadata: {
      userId,
    },
  });
  return file.toArray();
};
const downloadFileHelper = (id) => {
  let bucket = info();
  id = mongoose.mongo.ObjectID(id);
  return bucket.openDownloadStream(id);
};

module.exports = {
  uploadFileHelper,
  getAllFilesHelper,
  deleteFileByIdHelper,
  findFileHelper,
  downloadFileHelper,
};
