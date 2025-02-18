function AboutUs() {
    const developerInfo = {
        name: 'Sudipta Roy Ballave',
        bio: 'Sudipta is a passionate full-stack developer with expertise in creating dynamic, user-friendly web applications. With several years of experience, Sudipta has successfully contributed to various projects and continues to innovate in the tech space.',
        projectsCount: 2, // Update the project count as needed
        projects: [
            { name: 'ExploreEase', link: 'https://exploreease-c6a3f.web.app/' },
            { name: 'Hotel Management', link: 'https://book-your-hotel-18c2b.web.app/' },
            // Add your projects with links here
        ],
        contact: {
            email: 'ballavesudipta@gmail.com',
            phone: '01996331631',
            github: 'https://github.com/SudiptaRoy05',
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-xl">
            <h2 className="text-4xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-400">
                About the Developer
            </h2>

            <div className="space-y-12">

                {/* Developer Bio */}
                <div className="bg-white p-8 rounded-lg shadow-md border border-gray-300">
                    <h3 className="text-3xl font-semibold text-gray-800 mb-4">{developerInfo.name}</h3>
                    <p className="text-lg text-gray-700">{developerInfo.bio}</p>
                </div>

                {/* Projects */}
                <div className="bg-white p-8 rounded-lg shadow-md border border-gray-300">
                    <h3 className="text-3xl font-semibold text-gray-800 mb-4">Projects</h3>
                    <p className="text-lg text-gray-600 mb-4">Sudipta has worked on {developerInfo.projectsCount} notable projects. Here are a few of them:</p>
                    <ul className="list-disc list-inside space-y-2">
                        {developerInfo.projects.map((project, index) => (
                            <li key={index}>
                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-lg">
                                    {project.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact Information */}
                <div className="bg-white p-8 rounded-lg shadow-md border border-gray-300">
                    <h3 className="text-3xl font-semibold text-gray-800 mb-4">Contact</h3>
                    <p className="text-lg text-gray-700 mb-2">
                        Email: <a href={`mailto:${developerInfo.contact.email}`} className="text-blue-500 hover:underline">{developerInfo.contact.email}</a>
                    </p>
                    <p className="text-lg text-gray-700 mb-2">
                        Phone: <span className="text-gray-700">{developerInfo.contact.phone}</span>
                    </p>
                    <p className="text-lg text-gray-700">
                        GitHub: <a href={developerInfo.contact.github} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{developerInfo.contact.github}</a>
                    </p>
                </div>

            </div>
        </div>
    );
}

export default AboutUs;
