import { useState } from "react";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { Button } from "@mui/material";
import { toast } from "react-toastify";

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  // const { token } = useContext(authContext);

  const uploadFile = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      await axios.post(`/api/files`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log("Success");
      toast.success("Upload success!");
    } catch (error) {
      console.log(error);
    }
  };

  const changeHandler = (e) => {
    setSelectedFile(e.target.files[0]);
    setIsFilePicked(true);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        flexDirection: "column",
      }}
    >
      <div>
        <Typography component="h1" variant="h5">
          Upload your files
        </Typography>
      </div>
      <div style={{ marginTop: "10px", marginBottom: "10px" }}>
        <input
          type="file"
          name="file"
          id="file"
          onChange={changeHandler}
          style={{ marginTop: "5px", marginBottom: "5px", fontSize: "20px" }}
        />
        {isFilePicked ? (
          <div>
            <Typography
              component="h6"
              variant="h5"
              style={{ marginTop: "5px", marginBottom: "5px" }}
            >
              Filename: {selectedFile.name}
            </Typography>
            <Typography
              component="h6"
              variant="h5"
              style={{ marginTop: "5px", marginBottom: "5px" }}
            >
              Filetype: {selectedFile.type}
            </Typography>
            <Typography
              component="h6"
              variant="h5"
              style={{ marginTop: "5px", marginBottom: "5px" }}
            >
              Size in bytes: {selectedFile.size}
            </Typography>
            <Typography
              component="h6"
              variant="h5"
              style={{ marginTop: "5px", marginBottom: "5px" }}
            >
              lastModifiedDate:{" "}
              {selectedFile.lastModifiedDate.toLocaleDateString()}
            </Typography>
          </div>
        ) : (
          <Typography
            component="h6"
            variant="h5"
            style={{ marginTop: "5px", marginBottom: "5px" }}
          >
            Select a file to show details
          </Typography>
        )}
        {/* <button onClick={uploadFile}>Submit</button> */}
        <Button variant="contained" onClick={uploadFile}>
          Upload
        </Button>
      </div>
    </div>
  );
};

export default Upload;
