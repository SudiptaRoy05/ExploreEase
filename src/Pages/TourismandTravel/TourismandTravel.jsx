import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { FaRegListAlt, FaUserFriends } from 'react-icons/fa';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Card from '../Shared/Card/Card';
import { Link } from 'react-router-dom';

export default function TourismandTravel() {
    const { data: packages, refetch: refetchPackages } = useQuery({
        queryKey: ['packages'],
        queryFn: async () => {
            const res = await axios.get('https://tourmanagement-puce.vercel.app/package');
            return res.data;
        },
    });

    // Fetch guides
    const { data: guides, refetch: refetchGuides } = useQuery({
        queryKey: ['guides'],
        queryFn: async () => {
            const res = await axios.get('https://tourmanagement-puce.vercel.app/guide?role=tourguide');
            return res.data;
        },
    });

    return (
        <div className="w-11/12 sm:w-10/12 mx-auto mt-6 p-4 sm:p-8 md:p-12 bg-white text-gray-800 mb-6 rounded-lg shadow-lg">
    <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-gray-800">Explore Our Travel Options</h2>

    <Tabs>
        <div className="max-w-5xl mx-auto">
            <TabList className="flex flex-wrap justify-center gap-3 sm:gap-6 mb-6 sm:mb-8">
                <Tab onClick={refetchPackages} className="px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-500 to-green-400 text-white rounded-lg text-base sm:text-lg font-semibold flex items-center shadow-lg cursor-pointer hover:scale-105 transition-transform">
                    <FaRegListAlt className="mr-2" /> Our Packages
                </Tab>
                <Tab onClick={refetchGuides} className="px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-500 to-green-400 text-white rounded-lg text-base sm:text-lg font-semibold flex items-center shadow-lg cursor-pointer hover:scale-105 transition-transform">
                    <FaUserFriends className="mr-2" /> Meet Our Guides
                </Tab>
            </TabList>

            {/* Tab Panel for Packages */}
            <TabPanel>
                <div className="text-center">
                    <h3 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">Our Exclusive Travel Packages</h3>
                    <p className="mb-6 text-gray-600 text-sm sm:text-base">Explore our wide range of travel packages designed to make your holidays unforgettable.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {packages?.map(pkg => <Card key={pkg._id} pkg={pkg} />)}
                    </div>
                </div>
            </TabPanel>

            {/* Tab Panel for Guides */}
            <TabPanel>
                <div className="text-center">
                    <h3 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">Meet Our Expert Guides</h3>
                    <p className="mb-6 text-gray-600 text-sm sm:text-base">Our guides are passionate about making your trip unforgettable with their expertise.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {guides?.map(guide => (
                            <div
                                key={guide._id}
                                className="bg-gradient-to-br from-blue-100 via-white to-green-100 p-4 sm:p-6 rounded-lg shadow-lg border-2 border-blue-500 hover:scale-105 transition-transform duration-300 hover:shadow-xl"
                            >
                                <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4">
                                    <img
                                        src={guide?.image}
                                        alt={guide?.name}
                                        className="w-full h-full rounded-full border-4 border-blue-500 shadow-md"
                                    />
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-green-400 opacity-0 group-hover:opacity-50 transition-opacity"></div>
                                </div>
                                <h4 className="text-xl sm:text-2xl font-bold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors">
                                    {guide.name}
                                </h4>
                                <p className="text-gray-600 mb-2 text-xs sm:text-sm">{guide.email}</p>
                                <Link to={`/guide/${guide._id}`}>
                                    <button
                                        className="mt-3 sm:mt-4 px-3 py-2 sm:px-4 sm:py-2 bg-gradient-to-r from-blue-500 to-green-400 text-white font-semibold rounded-lg shadow hover:opacity-90 hover:shadow-lg transition-all"
                                    >
                                        View Details
                                    </button>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </TabPanel>
        </div>
    </Tabs>
</div>

    );
}
