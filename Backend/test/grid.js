const fs = require("fs");
const mongodb = require("mongodb");

const uri = "mongodb://localhost:27017";
const dbName = "testgrid";

const client = new mongodb.MongoClient(uri);

client.connect((error) => {
  if (error) {
    throw error;
  }
  const db = client.db(dbName);
  let bucket = new mongodb.GridFSBucket(db);
  //   fs.createReadStream("./syntax.pdf").pipe(
  //     bucket
  //       .openUploadStream("syntax.pdf")
  //       .on("error", (error) => {
  //         console.error(error);
  //         process.exit(0);
  //       })
  //       .on("finish", () => {
  //         console.log("The File is uploaded");
  //         process.exit(0);
  //       })
  //   );
  bucket.openDownloadStreamByName("syntax.pdf").pipe(
    fs
      .createWriteStream("./verysimpletest.pdf")
      .on("error", (error) => {
        console.error(error);
        process.exit(0);
      })
      .on("finish", () => {
        console.log("The File is Downloaded");
        process.exit(0);
      })
  );
});
