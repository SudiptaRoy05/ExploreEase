import Banner from "../../Components/Banner";
import OverView from "../../Components/OverView";
import RandomStory from "../RandomStory/RandomStory";
import TourismandTravel from "../TourismandTravel/TourismandTravel";

export default function Home() {
    return (
        <div className="bg-gray-200 pb-6">
            <Banner></Banner>
            <TourismandTravel></TourismandTravel>
            <RandomStory></RandomStory>
            <OverView></OverView>
        </div>
    )
}
