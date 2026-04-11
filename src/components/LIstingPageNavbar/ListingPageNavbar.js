import { Link } from "react-router";
import "./style.css"
export default function ListingPageNavbar() {
    return (
        <>
          <ul className="nav nav-pills nav-fill">
  <li className="nav-item">
    <a className="nav-link active" aria-current="page" href="#">Active</a>
  </li>
  <li className="nav-item ">
  <Link className="view-list" to="your-listing">View Your Listing</Link>
  </li>
  
</ul>
        </>
    );
}
