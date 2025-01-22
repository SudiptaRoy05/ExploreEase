import Banner from "../../Components/Banner";
import RandomStory from "../RandomStory/RandomStory";
import TourismandTravel from "../TourismandTravel/TourismandTravel";

export default function Home() {
    return (
        <div>
            <Banner></Banner>
            <TourismandTravel></TourismandTravel>
            <RandomStory></RandomStory>
        </div>
    )
}
