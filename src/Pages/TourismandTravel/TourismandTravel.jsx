import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; // Importing default styles for the tabs
import { FaRegListAlt, FaUserFriends } from 'react-icons/fa';

export default function TourismandTravel() {
    return (
        <div className="p-6 sm:p-12 text-gray-800 mb-6 border-4 border-gradient-to-r from-blue-500 to-green-400 rounded-lg">
            <h2 className="text-3xl font-semibold text-center mb-8">Explore Our Travel Options</h2>

            <Tabs>
                <div className="max-w-4xl mx-auto">
                    <TabList className="flex justify-center mb-6 space-x-4">
                        <Tab className="px-6 py-3 bg-gray-100 text-green-400 rounded-md text-lg font-semibold flex items-center border border-gradient-to-r from-blue-500 to-green-400">
                            <FaRegListAlt className="mr-2" /> Our Packages
                        </Tab>
                        <Tab className="px-6 py-3 bg-gray-100 text-green-400 rounded-md text-lg font-semibold flex items-center border border-gradient-to-r from-blue-500 to-green-400">
                            <FaUserFriends className="mr-2" /> Meet Our Guides
                        </Tab>
                    </TabList>

                    {/* Tab Panel for Our Packages */}
                    <TabPanel>
                        <div className="text-center">
                            <h3 className="text-2xl font-bold mb-4">Our Exclusive Travel Packages</h3>
                            <p className="mb-6 text-gray-600">Explore our wide range of travel packages designed to make your holidays unforgettable.</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                                {/* Package 1 */}
                                <div className="bg-white p-6 rounded-lg shadow-md border-4 border-gradient-to-r from-blue-500 to-green-400">
                                    <h4 className="text-xl font-semibold mb-4">Beach Paradise</h4>
                                    <p className="text-gray-600 mb-4">Relax on pristine beaches, enjoy breathtaking views, and unwind.</p>
                                    <p className="font-semibold">Price: $999</p>
                                </div>
                                {/* Package 2 */}
                                <div className="bg-white p-6 rounded-lg shadow-md border-4 border-gradient-to-r from-blue-500 to-green-400">
                                    <h4 className="text-xl font-semibold mb-4">Mountain Adventure</h4>
                                    <p className="text-gray-600 mb-4">Embark on an adventure with scenic hikes and breathtaking mountain views.</p>
                                    <p className="font-semibold">Price: $1299</p>
                                </div>
                                {/* Package 3 */}
                                <div className="bg-white p-6 rounded-lg shadow-md border-4 border-gradient-to-r from-blue-500 to-green-400">
                                    <h4 className="text-xl font-semibold mb-4">Cultural Exploration</h4>
                                    <p className="text-gray-600 mb-4">Explore rich cultural heritage, history, and iconic landmarks.</p>
                                    <p className="font-semibold">Price: $799</p>
                                </div>
                            </div>
                        </div>
                    </TabPanel>

                    {/* Tab Panel for Meet Our Guides */}
                    <TabPanel>
                        <div className="text-center">
                            <h3 className="text-2xl font-bold mb-4">Meet Our Expert Guides</h3>
                            <p className="mb-6 text-gray-600">Our guides are passionate about making your trip unforgettable with their expertise.</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                                {/* Guide 1 */}
                                <div className="bg-white p-6 rounded-lg shadow-md border-4 border-gradient-to-r from-blue-500 to-green-400">
                                    <img
                                        src="https://via.placeholder.com/150"
                                        alt="Tour Guide"
                                        className="w-32 h-32 rounded-full mx-auto mb-4"
                                    />
                                    <h4 className="text-xl font-semibold mb-2">John Doe</h4>
                                    <p className="text-gray-600">John has over 10 years of experience guiding mountain adventures.</p>
                                </div>
                                {/* Guide 2 */}
                                <div className="bg-white p-6 rounded-lg shadow-md border-4 border-gradient-to-r from-blue-500 to-green-400">
                                    <img
                                        src="https://via.placeholder.com/150"
                                        alt="Tour Guide"
                                        className="w-32 h-32 rounded-full mx-auto mb-4"
                                    />
                                    <h4 className="text-xl font-semibold mb-2">Jane Smith</h4>
                                    <p className="text-gray-600">Jane specializes in cultural tours and loves to share local stories.</p>
                                </div>
                                {/* Guide 3 */}
                                <div className="bg-white p-6 rounded-lg shadow-md border-4 border-gradient-to-r from-blue-500 to-green-400">
                                    <img
                                        src="https://via.placeholder.com/150"
                                        alt="Tour Guide"
                                        className="w-32 h-32 rounded-full mx-auto mb-4"
                                    />
                                    <h4 className="text-xl font-semibold mb-2">Mark Johnson</h4>
                                    <p className="text-gray-600">Mark is a seasoned guide for beach tours and coastal exploration.</p>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                </div>
            </Tabs>
        </div>
    );
}
