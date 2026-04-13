import Cardata from "./Cardata";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { API } from "../../helpers/requests";
import { PATH } from "../../helpers/constants";
function ViewCar() {
  const [car, setCar] = useState({});
  let params = useParams();
  useEffect(() => {
    API.get(PATH.CARS + "/" + params.id).then((res) => {
      setCar(res.data);
      // console.log(res.data)
    });
  }, []);

  if (car && car.images) {
    return (
      <Cardata
        car={car}
        Banner={car.images[0]}
        Images={car.images}
        Host={car.host?.name}
        Detail={car.name}
        Des={car.description}
      />
    );
  }
  return <></>;
}
export default ViewCar;
