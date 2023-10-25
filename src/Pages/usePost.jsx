import { useState, useEffect } from "react";
import RuleIcon from "@mui/icons-material/Rule";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { ContactPageSharp, DeleteOutline } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../store/postSlice";
import { DeleteFetchPosts } from "../store/postSlice";

const usePost = () => {
  const [Rows, setRows] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [OpenDeleteModal, setOpenDeleteModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);

  const dispatch = useDispatch();
  const Posts = useSelector((state) => state.posts.posts);

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
          <RuleIcon
            style={{ cursor: "pointer", marginRight: "20px" }}
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

  const handleUpdate = (formData) => {
    setRows((prevRows) =>
      prevRows.map((row) => {
        if (row.id === formData.id) {
          return formData;
        }
        return row;
      })
    );
  };

  const GridRows =
    Posts.length > 0
      ? Posts.map((row, index) => ({
          id: index + 1,
          userId: row.userId,
          title: row.title,
          body: row.body,
        }))
      : [];

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

  const handleDelete = () => {
    dispatch(DeleteFetchPosts(rowData["id"]));
    setOpenDeleteModal(false);
  };

  const handleAddPost = (newPost) => {
    // console.log(newPost,'newPost')
    //   setRows((prevRows) => [newPost, ...prevRows ]);
    //   setRows((prevRows) =>
    //         prevRows.map((row, index) => ({
    //           ...row,
    //           id: index + 1,
    //         }))
    //       );
    // console.log(Rows[0],"Row")
  };

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return {
    Rows,
    setRows,
    openModal,
    setOpenModal,
    rowData,
    setRowData,
    OpenDeleteModal,
    setOpenDeleteModal,
    openUpdateModal,
    setOpenUpdateModal,
    openAddModal,
    setOpenAddModal,
    columns,
    handleUpdate,
    GridRows,
    handleView,
    handleClose,
    handleDelete,
    handleAddPost,
    useEffect,
    Posts,
  };
};

export default usePost;
