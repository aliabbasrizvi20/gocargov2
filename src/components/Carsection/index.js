import blackcar from "../../assets/blackcar.jpeg"
import ni from "../../assets/ni.jpg"
import "./style.css"
export default function CarSection(){
    return(
        <div className="car-banner">
            <div className="car-content">
                <h2>Top Categories</h2>
            </div>
            <div className="car-images">
                <div className="car-1">
        <img src={ni}></img>
                </div>
                <div className="car-1"><img src={ni}></img></div>
                <div className="car-1"><img src={ni}></img></div>
                <div className="car-1"><img src={ni}></img></div>
                <div className="car-1"><img src={ni}></img></div>
            </div>
        </div>

    );
}