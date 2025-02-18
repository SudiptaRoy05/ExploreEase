import { useLoaderData } from "react-router-dom";
import lightGallery from "lightgallery";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";
import { useEffect } from "react";
import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    FacebookIcon,
    TwitterIcon,
    WhatsappIcon,
} from "react-share";

function StoryDetails() {
    const data = useLoaderData();
    const { title, content, images, user } = data;
    const shareUrl = window.location.href;

    useEffect(() => {
        lightGallery(document.getElementById("lightgallery"), {
            plugins: [lgThumbnail, lgZoom],
            speed: 500,
        });
    }, []);

    return (
        <div className="max-w-6xl mx-auto p-8 sm:p-12 bg-white rounded-lg shadow-2xl my-6">
            {/* Title and User Info */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-14 space-y-6 md:space-y-0">
                <div className="text-center md:text-left">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-4">{title}</h2>
                    <div className="flex items-center space-x-6 justify-center md:justify-start">
                        <img
                            src={user?.image}
                            alt={user?.name}
                            className="w-20 h-20 rounded-full shadow-lg border-4 border-white"
                        />
                        <div className="text-left">
                            <p className="text-lg font-semibold text-gray-800">{user?.name}</p>
                            <p className="text-sm text-gray-500">Story Author</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center md:justify-end space-x-6">
                    <FacebookShareButton url={shareUrl} quote={title}>
                        <FacebookIcon size={40} round />
                    </FacebookShareButton>
                    <TwitterShareButton url={shareUrl} title={title}>
                        <TwitterIcon size={40} round />
                    </TwitterShareButton>
                    <WhatsappShareButton url={shareUrl} title={title}>
                        <WhatsappIcon size={40} round />
                    </WhatsappShareButton>
                </div>
            </div>

            {/* Gallery Section */}
            <div
                id="lightgallery"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-14"
            >
                {images.map((image, index) => (
                    <a
                        href={image?.imageUrl}
                        key={index}
                        className="block overflow-hidden rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
                    >
                        <img
                            src={image?.imageUrl}
                            alt={`Story Image ${index + 1}`}
                            className="w-full h-72 object-cover rounded-lg"
                        />
                    </a>
                ))}
            </div>

            {/* Content Section */}
            <div className="bg-white p-8 rounded-lg shadow-md mb-14">
                <p className="text-lg leading-relaxed text-gray-700">{content}</p>
            </div>
        </div>
    );
}

export default StoryDetails;
