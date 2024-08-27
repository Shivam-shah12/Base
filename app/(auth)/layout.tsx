import React from 'react';
import { ModeToggle } from '../../components/Mode';
import Image from 'next/image';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen  flex justify-center items-center">
            <div className="flex flex-col w-full md:flex-row md:w-[95vw] md:mx-6 md:my-3 h-[100vh] shadow-lg rounded overflow-hidden md:px-4">
                {/* Left Side */}
                <div className="w-full md:w-[47%] md:bg-[#605BFF] bg-[#836FFF] rounded overflow-hidden px-8 py-4">
                    <div className="w-full h-full bg-[#836FFF] md:shadow overflow-hidden flex flex-col rounded gap-y-16 relative">
                        {/* Top-left logo */}
                        <div className="hidden md:block relative top-6 left-6">
                            <img
                                src="/icon.png" // Replace with your actual logo path
                                alt="Base Logo"
                                className="w-[100px] h-[40px]" // Adjust dimensions as needed
                            />
                        </div>
                        <div className="flex space-x-3 h-fit items-center md:hidden">
                            <Image
                                src="/mobile_icon.png"
                                alt="mobileIcon"
                                width={80}
                                height={80}
                                className="object-contain"
                            />
                        </div>

                        {/* Text Content */}
                        <div className="relative text-left left-6 hidden md:block gap-y-6">
                            <p className="text-4xl text-white font-semibold tracking-wider leading-snug">
                                Generate detailed <br className="my-1" />
                                reports with just one <br className="my-1" />
                                click
                            </p>
                        </div>
                        
                        {/* Bottom-right Image */}
                        <div className="absolute bottom-0 right-0 hidden lg:block">
                            <img
                                src="/girl.png"
                                alt="Woman with Camera"
                                className="w-[120px] h-[170px] sm:w-[180px] sm:h-[230px] lg:w-[250px] lg:h-[300px] object-contain"
                            />
                        </div>

                        <ModeToggle />
                    </div>
                </div>
                
                {/* Right Side */}
                <div className="w-full md:w-[50%] p-8 flex flex-col justify-center items-center">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
