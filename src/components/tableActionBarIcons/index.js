import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ProductsController from "controllers/products";

export default function TableActionBarIcons(props) {
  const { row, getData, handleEdit } = props;

  const handleDelete = async () => {
    await ProductsController.deleteProduct(row._id);
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
