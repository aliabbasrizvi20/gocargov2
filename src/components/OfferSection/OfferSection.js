import bb from "../../assets/bb.jpg"
import orangecar from "../../assets/orangecar.png"
import "./style.css"
export default function OfferSection(){
    return(
<div className="card-deck d-flex">
<div className="card">
    <img className="card-img-top" src={orangecar} alt="Card image cap"></img>
    <div className="card-body">
      <h5 className="card-title">Unmatched Offers</h5>
      <p className="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
      <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
    </div>
  </div>
  <div className="card">
    <img className="card-img-top" src={orangecar} alt="Card image cap"></img>
    <div className="card-body">
      <h5 className="card-title">50% Off On First Ride</h5>
      <p className="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
      <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
    </div>
  </div>
  <div className="card">
    <img className="card-img-top" src={orangecar} alt="Card image cap"></img>
    <div className="card-body">
      <h5 className="card-title">Happy Clients</h5>
      <p className="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
      <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
    </div>
  </div>
</div>
    );
}
