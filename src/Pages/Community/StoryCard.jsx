export default function StoryCard({ story }) {
    return (
        <div className="card bg-base-100 shadow-xl">
            <figure>
                <img
                    src={story.images[0]?.imageUrl || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
                    alt={story.title}
                    className="w-full h-48 object-cover"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{story.title}</h2>
                <p>{story.content.slice(0, 100)}...</p>
                <div className="card-actions justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <img
                            src={story.user.image}
                            alt={story.user.name}
                            className="w-8 h-8 rounded-full"
                        />
                        <span className="text-sm text-gray-600">{story.user.name}</span>
                    </div>
                    <Link to='/details/${story._id}'>
                        <button className="btn btn-primary">Read More</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
