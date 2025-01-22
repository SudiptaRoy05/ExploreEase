import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { FaRegListAlt, FaUserFriends } from 'react-icons/fa';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Card from '../Shared/Card/Card';

export default function TourismandTravel() {
    // Fetch packages
    const { data: packages, refetch: refetchPackages } = useQuery({
        queryKey: ['packages'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:5000/package');
            return res.data;
        },
    });

    // Fetch guides
    const { data: guides, refetch: refetchGuides } = useQuery({
        queryKey: ['guides'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:5000/guide?role=tourguide');
            return res.data;
        },
    });

    return (
        <div className="p-6 sm:p-12 bg-white text-gray-800 mb-6 border-4 border-gradient-to-r from-blue-500 to-green-400 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">Explore Our Travel Options</h2>

            <Tabs>
                <div className="max-w-5xl mx-auto">
                    <TabList className="flex justify-center mb-8 space-x-4">
                        <Tab onClick={refetchPackages} className="px-6 py-3 bg-gradient-to-r from-blue-500 to-green-400 text-white rounded-lg text-lg font-semibold flex items-center shadow-lg cursor-pointer hover:scale-105 transition-transform">
                            <FaRegListAlt className="mr-2" /> Our Packages
                        </Tab>
                        <Tab onClick={refetchGuides} className="px-6 py-3 bg-gradient-to-r from-blue-500 to-green-400 text-white rounded-lg text-lg font-semibold flex items-center shadow-lg cursor-pointer hover:scale-105 transition-transform">
                            <FaUserFriends className="mr-2" /> Meet Our Guides
                        </Tab>
                    </TabList>

                    {/* Tab Panel for Packages */}
                    <TabPanel>
                        <div className="text-center">
                            <h3 className="text-2xl font-bold mb-4 text-gray-800">Our Exclusive Travel Packages</h3>
                            <p className="mb-6 text-gray-600">Explore our wide range of travel packages designed to make your holidays unforgettable.</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {packages?.map(pkg => <Card key={pkg._id} pkg={pkg} />)}
                            </div>
                        </div>
                    </TabPanel>

                    {/* Tab Panel for Guides */}
                    <TabPanel>
                        <div className="text-center">
                            <h3 className="text-2xl font-bold mb-4 text-gray-800">Meet Our Expert Guides</h3>
                            <p className="mb-6 text-gray-600">Our guides are passionate about making your trip unforgettable with their expertise.</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {guides?.map(guide => (
                                    <div
                                        key={guide._id}
                                        className="bg-white p-6 rounded-lg shadow-md border-4 border-gradient-to-r from-blue-500 to-green-400 hover:shadow-lg transition-shadow"
                                    >
                                        <img
                                            src={guide?.image}
                                            alt={guide?.name}
                                            className="w-32 h-32 rounded-full mx-auto mb-4"
                                        />
                                        <h4 className="text-xl font-semibold mb-2 text-gray-800">{guide.name}</h4>
                                        <p className="text-gray-600">{guide.expertise}</p>
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
