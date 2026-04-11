import "./style.css"
import { useNavigate } from "react-router";

function BackButton({BackButton, className}){
    const navigate=useNavigate();  
    return(
           <div className="back-btn"> 
        <button onClick={BackButton=()=>navigate(-1)}>Go Back</button>
        </div>
    );
}
export default BackButton;