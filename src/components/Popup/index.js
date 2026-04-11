import cross from "../../assets/cross.png"
import check from "../../assets/check.png"
import Button from "../Button";
import "./popup.css"
import InputField from "../InputField";
export default function Popup({ heading, subHeading, onClose, buttonText, image, className }) {

    return (

        <div className="popup-outer-container">
            <div className="Popup-container">
                <div className="Popup-content">
                    <div className="Image">
                        {/* <img src=""></img> */}
                        {/* <img src="cross" ></img> */}
                        {/* <img src={cross}></img>  */}
                        <div className="image-1">
                            <img src={image}></img>
                        </div>

                    </div>
                    <div className="Main-text">
                        <h2>{heading}</h2>

                    </div>
                    <div className="text-info">
                        <p>{subHeading}</p>
                    </div>

                    <Button onClick={onClose} className={className}>{buttonText}</Button>
                </div>
            </div>
        </div>
        
    );
}