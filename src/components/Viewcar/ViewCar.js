import Cardata from './Cardata'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { API } from '../../helpers/requests';
import { PATH } from '../../helpers/constants';
function ViewCar() {
    const [car, setCar] = useState({});
    let params = useParams();
    useEffect(() => {
        API.get(PATH.CARS +"/"+ params.id).then((res) => {
            setCar(res.data)
            // console.log(res.data)
        }

        )
    }, []);
    // const profile =
    // {
    //     Banner: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Tesla/Model-3/5251/1693556345148/front-left-side-47.jpg?impolicy=resize&imwidth=420",
    //     Img1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpA1cmlej8VBakom0q3OkvGr5D1gCoOedFWJPDrVW4Ms-Kd6cvQZaaZswkpCeaNQm25Rw&usqp=CAU",
    //     Img2: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpA1cmlej8VBakom0q3OkvGr5D1gCoOedFWJPDrVW4Ms-Kd6cvQZaaZswkpCeaNQm25Rw&usqp=CAU",
    //     Img3: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpA1cmlej8VBakom0q3OkvGr5D1gCoOedFWJPDrVW4Ms-Kd6cvQZaaZswkpCeaNQm25Rw&usqp=CAU",
    //     Img4: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpA1cmlej8VBakom0q3OkvGr5D1gCoOedFWJPDrVW4Ms-Kd6cvQZaaZswkpCeaNQm25Rw&usqp=CAU",
    //     Host: "John Cena",
    //     Detail: "Tesla XuV750",
    //     Des: "Manual"
    // }
    if (car && car.images) {
        return (
            <Cardata
                car={car}
                Banner={car.images[0]}
                Images={car.images}
                // Img1={car.images[1]}
                // Img2={car.images[1]}
                // Img3={car.images[1]}
                // Img4={car.images[1]}
                Host={car.host?.name}
                Detail={car.name}
                Des={car.description} />

        );
    }
    return <></>

}
export default ViewCar;