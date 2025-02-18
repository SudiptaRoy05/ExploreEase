import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import img1 from '../assets/images/img1.jpg'
import img2 from '../assets/images/img2.jpg'
import img3 from '../assets/images/img3.jpg'
import img4 from '../assets/images/img4.jpg'

export default function Banner() {
    return (
        <div className="w-10/12 mx-auto">
            <Carousel showThumbs={false} autoPlay infiniteLoop>
                <div>
                    <img src={img1} className="h-[80vh] object-cover w-full" />
                </div>
                <div>
                    <img src={img2} className="h-[80vh] object-cover w-full" />
                </div>
                <div>
                    <img src={img3} className="h-[80vh] object-cover w-full" />
                </div>
                <div>
                    <img src={img4} className="h-[80vh] object-cover w-full" />
                </div>
            </Carousel>
        </div>
    )
}
