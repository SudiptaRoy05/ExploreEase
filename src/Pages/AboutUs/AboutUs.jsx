function AboutUs() {
    const developerInfo = {
        name: 'John Doe',
        bio: 'John is a passionate full-stack developer with a knack for creating intuitive and dynamic web applications. With several years of experience in the tech industry, he has contributed to numerous successful projects.',
        projectsCount: 10,
        projects: [
            { name: 'Project One', link: 'https://projectone.example.com' },
            { name: 'Project Two', link: 'https://projecttwo.example.com' },
            // Add more projects as needed
        ],
        contact: {
            email: 'john.doe@example.com',
            github: 'https://github.com/johndoe',
            linkedin: 'https://linkedin.com/in/johndoe',
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-gray-50 to-gray-200 rounded-xl shadow-2xl">
            <h2 className="text-4xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-400">
                About the Developer
            </h2>
            <div className="space-y-6">
                {/* Developer Bio */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-2xl font-semibold mb-4">{developerInfo.name}</h3>
                    <p className="text-lg text-gray-700">{developerInfo.bio}</p>
                </div>

                {/* Projects */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-2xl font-semibold mb-4">Projects</h3>
                    <p className="mb-4">John has created {developerInfo.projectsCount} projects. Here are a few of them:</p>
                    <ul className="list-disc list-inside">
                        {developerInfo.projects.map((project, index) => (
                            <li key={index}>
                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                    {project.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact Information */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-2xl font-semibold mb-4">Contact</h3>
                    <p>Email: <a href={`mailto:${developerInfo.contact.email}`} className="text-blue-500 hover:underline">{developerInfo.contact.email}</a></p>
                    <p>GitHub: <a href={developerInfo.contact.github} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{developerInfo.contact.github}</a></p>
                    <p>LinkedIn: <a href={developerInfo.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{developerInfo.contact.linkedin}</a></p>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;
