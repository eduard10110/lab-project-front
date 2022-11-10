import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function ProductTableRowActionBar(props) {
  const { row, getData, handleEdit, deleteProduct } = props;

  const handleDelete = async () => {
    await deleteProduct(row._id);
    await getData();
  };

  return (
    <div className="table-icons-wrapper">
      <div
        className="edit-icon-wrapper table-icon-item"
        onClick={handleEdit(row)}
      >
        <EditIcon titleAccess="title show" sx={{ color: "white" }} />
      </div>
      <div
        onClick={handleDelete}
        className="delete-icon-wrapper table-icon-item"
      >
        <DeleteIcon sx={{ color: "white" }} />
      </div>
    </div>
  );
}
