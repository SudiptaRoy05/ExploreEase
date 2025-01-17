import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { FaRegListAlt, FaUserFriends } from 'react-icons/fa';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Card from '../Shared/Card/Card';

export default function TourismandTravel() {
    // Fetch random packages using useQuery
    const { data: packages, refetch } = useQuery({
        queryKey: ['packages'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:5000/package');
            console.log(res.data)
            return res.data;
        },
    });

    return (
        <div className="p-6 sm:p-12 text-gray-800 mb-6 border-4 border-gradient-to-r from-blue-500 to-green-400 rounded-lg">
            <h2 className="text-3xl font-semibold text-center mb-8">Explore Our Travel Options</h2>

            <Tabs>
                <div className="max-w-4xl mx-auto">
                    <TabList className="flex justify-center mb-6 space-x-4">
                        <Tab onClick={refetch} className="px-6 py-3 bg-gray-100 text-blue-600 rounded-md text-lg font-semibold flex items-center border border-gradient-to-r from-blue-500 to-green-400">
                            <FaRegListAlt className="mr-2" /> Our Packages
                        </Tab>
                        <Tab className="px-6 py-3 bg-gray-100 text-blue-600 rounded-md text-lg font-semibold flex items-center border border-gradient-to-r from-blue-500 to-green-400">
                            <FaUserFriends className="mr-2" /> Meet Our Guides
                        </Tab>
                    </TabList>

                    {/* Tab Panel for Our Packages */}
                    <TabPanel>
                        <div className="text-center">
                            <h3 className="text-2xl font-bold mb-4">Our Exclusive Travel Packages</h3>
                            <p className="mb-6 text-gray-600">Explore our wide range of travel packages designed to make your holidays unforgettable.</p>
                            {isLoading && <p>Loading packages...</p>}
                            {isError && <p>Error fetching packages. Please try again.</p>}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                                {
                                    packages?.map(pkg => <Card key={pkg._id} pkg={pkg}></Card>)
                                }
                            </div>
                        </div>
                    </TabPanel>

                    {/* Tab Panel for Meet Our Guides */}
                    <TabPanel>
                        <div className="text-center">
                            <h3 className="text-2xl font-bold mb-4">Meet Our Expert Guides</h3>
                            <p className="mb-6 text-gray-600">Our guides are passionate about making your trip unforgettable with their expertise.</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                                {/* Static example of guide data */}
                                <div className="bg-white p-6 rounded-lg shadow-md border-4 border-gradient-to-r from-blue-500 to-green-400">
                                    <img
                                        src="https://via.placeholder.com/150"
                                        alt="Tour Guide"
                                        className="w-32 h-32 rounded-full mx-auto mb-4"
                                    />
                                    <h4 className="text-xl font-semibold mb-2">John Doe</h4>
                                    <p className="text-gray-600">John has over 10 years of experience guiding mountain adventures.</p>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                </div>
            </Tabs>
        </div>
    );
}
