import axios from "axios";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import Spinner from "../Components/Spinner";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const downloadFile = async (id, filename) => {
    try {
      setIsLoading(true);
      const res = await axios.get(`/api/files/download/${id}`, {
        responseType: "blob",
      });

      //Setting up the file as url and creating a download link

      const url = URL.createObjectURL(res.data);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getAllFiles = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get("/api/files/all");
        setData(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    getAllFiles();
  }, []);

  return (
    <TableContainer component={Paper}>
      {isLoading ? (
        <Spinner />
      ) : (
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>File Name</TableCell>
              <TableCell align="right">Size</TableCell>
              <TableCell align="right">Uploaded On</TableCell>
              <TableCell align="right">Content Type</TableCell>
              <TableCell align="right">Download</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.filename}
                </TableCell>
                <TableCell align="right">{row.length}</TableCell>
                <TableCell align="right">
                  {new Date(row.uploadDate).toLocaleString("en-IN")}
                </TableCell>
                <TableCell align="right">{row.contentType}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    onClick={() => {
                      downloadFile(row._id, row.filename);
                    }}
                  >
                    Download
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
}
