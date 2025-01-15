import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import logo from '../../public/LOGO.png'
export default function Footer() {
  return (
    <footer className="footer bg-gradient-to-r from-green-400 to-blue-500 text-white py-10">
      <div className="container mx-auto flex flex-wrap justify-between items-center px-4">
        <div className="flex items-center mb-4 lg:mb-0">
          <img src={logo} alt="Logo" className="h-12 w-12 mr-3" />
          <span className="text-2xl font-bold">ExploreEase</span>
        </div>
        <div className="flex space-x-4 mb-4 lg:mb-0">
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-200"
          >
            <FaGithub className="h-6 w-6" />
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-200"
          >
            <FaLinkedin className="h-6 w-6" />
          </a>
          <a
            href="https://twitter.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-200"
          >
            <FaTwitter className="h-6 w-6" />
          </a>
        </div>
        <div className="text-center lg:text-right text-sm text-gray-200">
          <p>&copy; {new Date().getFullYear()} ExploreEase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
