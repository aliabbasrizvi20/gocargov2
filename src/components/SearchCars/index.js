import { Navigate, useNavigate } from "react-router";
import Button from "../Button";
import "./index.css";

import CarList from "../CarLists/carList";
import { useEffect, useState } from "react";
import Footer from "../Footer";
export default function SearchCars() {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [lastDate, setLastDate] = useState("");
  useEffect(() => {
    console.log("Welcome");
  }, []);
  function onSearchClick() {
    console.log(location);
    console.log(startDate);
    console.log(lastDate);
    navigate(`/list?location=${location}`);
  }
  const onLocationChange = (e) => {
    setLocation(e.target.value);
  };
  const onStartDateChange = (e) => {
    setStartDate(e.target.value);
  };
  const onLastDateChange = (e) => {
    setLastDate(e.target.value);
  };

  function onClick() {
    navigate(`/list?location=${location}`);
  }

  return (
    <section>
      <div className="SearchCar">
        <div className="content">
          <div className="heading">
            <h1>
              Search for cars in <span className="highlight-city">India</span>
            </h1>
            
          </div>
          <div className="bottom-container">
            <div className="input-box">
              <input
                type="text "
                className="txts"
                placeholder="Location"
                onChange={onLocationChange}
              ></input>
            </div>
    <div className="trip-details">
            <div className="trip-start">
              <input
                type="date"
                placeholder=""
                onChange={onStartDateChange}
              ></input>
            </div>
            <div className="trip-ends">
              <input
                type="date"
                placeholder=""
                onChange={onLastDateChange}
              ></input>
            </div></div>
           
          </div>
          <div className="button-container">
           <Button className="search-btn" onClick={onClick}>
              Search Cars
            </Button></div>
        </div>
      </div>
      <div className="car-list">
        <CarList />
      </div>
      {/* <OfferSection/> */}
      <Footer />
    </section>
  );
}
