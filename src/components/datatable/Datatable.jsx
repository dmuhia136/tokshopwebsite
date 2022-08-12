import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import "../table/table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Datatable = () => {
  const [data, setData] = useState(userRows);
  const users=useSelector((state)=> state.allusers.value);
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (

    // <div className="datatable">
    //   <div className="datatableTitle">
    //     Add New User
    //     <Link to="/users/new" className="link">
    //       Add New
    //     </Link>
    //   </div>
    //   <DataGrid
    //     className="datagrid"
    //     rows={data}
    //     columns={userColumns.concat(actionColumn)}
    //     pageSize={9}
    //     rowsPerPageOptions={[9]}
    //     checkboxSelection
    //   />
    // </div>

    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">First Name</TableCell>
            <TableCell className="tableCell">Last Name</TableCell>
            <TableCell className="tableCell">Profile Photo</TableCell>
            <TableCell className="tableCell">Followers</TableCell>
            <TableCell className="tableCell">Following</TableCell>
            <TableCell className="tableCell">Username</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (
            <TableRow key={row._id}>
              <TableCell className="tableCell">{row.firstname}</TableCell>
              <TableCell className="tableCell">{row.lastname}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={row.profilePhoto} alt="" className="image" />
                  {row.email}
                </div>
              </TableCell>
              <TableCell className="tableCell">
                {row.followers.length}
              </TableCell>
              <TableCell className="tableCell">
                {row.following.length}
              </TableCell>
              <TableCell className="tableCell">{row.userName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Datatable;
