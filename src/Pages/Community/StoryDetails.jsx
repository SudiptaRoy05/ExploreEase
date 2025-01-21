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
        <div className="max-w-6xl mx-auto p-6 sm:p-12 bg-gradient-to-r from-blue-50 to-white rounded-lg shadow-lg">
            {/* Title and User Info */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                <div className="text-center md:text-left">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
                    <div className="flex items-center space-x-4">
                        <img
                            src={user.image}
                            alt={user.name}
                            className="w-16 h-16 rounded-full shadow-md"
                        />
                        <p className="text-lg font-semibold text-gray-700">{user.name}</p>
                    </div>
                </div>
                <div className="mt-6 md:mt-0">
                    <div className="flex space-x-4">
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
            </div>

            {/* Gallery Section */}
            <div
                id="lightgallery"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
            >
                {images.map((image, index) => (
                    <a
                        href={image.imageUrl}
                        key={index}
                        className="block overflow-hidden rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                    >
                        <img
                            src={image.imageUrl}
                            alt={`Story Image ${index + 1}`}
                            className="w-full h-56 object-cover"
                        />
                    </a>
                ))}
            </div>

            {/* Content Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-lg leading-relaxed text-gray-700">{content}</p>
            </div>
        </div>
    );
}

export default StoryDetails;
