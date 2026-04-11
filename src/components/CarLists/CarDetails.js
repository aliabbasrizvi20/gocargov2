import { useNavigate } from "react-router";
import "./index.css";
import Button from "../Button";
export default function CarDetails({
  car,
  Image,
  Name,
  Price,
  Description,
  id,
  index,
  onDelete,
  onEdit,
  showButtons,
}) {
  
  const navigate = useNavigate();
  function onCarClick() {
    navigate("/car/" + id);
  }

  return (
    <div className="car" onClick={onCarClick}>
      <div className="image">
        <img src={Image} alt="img-car" />
      </div>
      <div className="content">
        <p>{Name}</p>
        <p>₹{Price}/hr</p>
        <p id="car-description-id">{Description}</p>
        <button style={{
          // background: "#0f9e6f",
          background:"cadetblue",
          color: "white",
          border: "none",
          padding: "12px 24px",
          borderRadius: "8px",
          fontWeight: "600",
          cursor: "pointer",
          transition: "all 0.3s ease",
          width: "100%",
          marginTop: "15px"
        }}>View Car</button>
      </div>
      {showButtons && (
        <div className="cars-buttons">
          <Button className="edit-button" onClick={(e) => { e.stopPropagation(); onEdit(index); }}>
            Edit
          </Button>
          <Button className="delete-button" onClick={(e) => { e.stopPropagation(); onDelete(index); }}>
            Delete
          </Button>
        </div>
      )}
    </div>
  );
}
