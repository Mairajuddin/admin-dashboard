import { useState,useEffect } from "react";
import RuleIcon from "@mui/icons-material/Rule";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { ContactPageSharp, DeleteOutline } from "@mui/icons-material";

const usePost=()=>{
    const [Rows, setRows] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [rowData, setRowData] = useState([]);
    const [OpenDeleteModal, setOpenDeleteModal] = useState(false);
    const[openUpdateModal,setOpenUpdateModal]=useState(false)
    const [openAddModal, setOpenAddModal] = useState(false);

    const columns = [
        { field: "id", headerName: "ID", flex: 1, minWidth: 70 },
        { field: "userId", headerName: "User ID", flex: 1 },
        { field: "title", headerName: "Title", flex: 2, minWidth: 170 },
        { field: "body", headerName: "Body", flex: 2 },
        {
          field: "action",
          headerName: "Actions",
          flex: 2,
          renderCell: (params) => (
            <div>
              <VisibilityOutlinedIcon
                style={{ cursor: "pointer", marginRight: "20px" }}
                onClick={() => handleView(params.row)}
              />
              <RuleIcon style={{ cursor: "pointer", marginRight: "20px" }}
              onClick={() => {
                setRowData(params.row);
                setOpenUpdateModal(true);
              }}
              />
              <DeleteOutline
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setRowData(params.row);
                  setOpenDeleteModal(true);
                }}
              />
            </div>
          ),
        },
      ];

      const GetFecthData = async () => {
        const url = "https://jsonplaceholder.typicode.com/posts";
        try {
          const response = await fetch(url, {
            method: "Get",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();
          setRows(data);
        } catch (error) {
          console.log(error);
        }
      };
      
      const handleUpdate = (formData) => {
        // Update the row data in the parent component's state
        setRows((prevRows) =>
          prevRows.map((row) => {
            if (row.id === formData.id) {
              return formData;
            }
            return row;
          })
        );
      };
    
      const GridRows = Rows.map((row) => ({
        id: row.id,
        userId: row.userId,
        title: row.title,
        body: row.body,
      }));
    
      const handleView = (row) => {
        setOpenModal(true);
        setRowData(row);
      };
      const handleClose = () => {
        setOpenModal(false);
        setOpenDeleteModal(false);
        setOpenUpdateModal(false);
        setOpenAddModal(false);
      };
      const handleDelete = async () => {
        const url = `https://jsonplaceholder.typicode.com/posts/${rowData.id}`;
        try {
          const response = await fetch(url, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (response.ok) {
            setRows((prevRows) =>
              prevRows.filter((row) => row.id !== rowData.id)
            );
            setRows((prevRows) =>
              prevRows.map((row, index) => ({
                ...row,
                id: index + 1,
              }))
            );
            setOpenDeleteModal(false);
          } else {
            console.log("failed to delete");
          }
        } catch (error) {
          console.log(error);
        }
      };
      const handleAddPost =  (newPost) => {
        setRows((prevRows) => [newPost, ...prevRows ]);
        setRows((prevRows) =>
              prevRows.map((row, index) => ({
                ...row,
                id: index + 1,
              }))
            );
           
        
      }

      // useEffect(() => {
      //   GetFecthData();
      // }, []);

      return{
        Rows, setRows, 
        openModal, setOpenModal,
        rowData, setRowData,
        OpenDeleteModal, setOpenDeleteModal,
        openUpdateModal,setOpenUpdateModal,
        openAddModal, setOpenAddModal,
        columns,
        GetFecthData,
        handleUpdate,
        GridRows,
        handleView,
        handleClose,
        handleDelete,
        handleAddPost
      }
}

export default  usePost