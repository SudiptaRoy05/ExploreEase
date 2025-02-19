import Banner from "../../Components/Banner";
import OverView from "../../Components/OverView";
import Location from "../Location/Location";
import RandomStory from "../RandomStory/RandomStory";
import TourismandTravel from "../TourismandTravel/TourismandTravel";
import TravelTips from "../TravelTips/TravelTips";

export default function Home() {
    return (
        <div className="bg-gray-200 pb-6">
            <Banner></Banner>
            <TourismandTravel></TourismandTravel>
            <RandomStory></RandomStory>
            <TravelTips></TravelTips>
            <Location></Location>
            <OverView></OverView>
        </div>
    )
}
