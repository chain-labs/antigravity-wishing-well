import { useState } from 'react';

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="bg-gray-800 text-white w-1/2 h-[56px] lg:h-[72px] rounded-lg bg-gradient-to-r from-brblue via-brred p-1">
            <div className="container w-full h-full bg-agblack mx-auto py-4 px-4 md:flex md:items-center md:justify-between">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <img src='icon.svg' alt='icon' />
                        <p className='bg-gradient-to-top from-white to-gray-500 pl-2 font-sans'>ANTIGRAVITY</p>
                    </div>
                    <div className="block md:hidden">
                        <button onClick={toggleMenu} className="text-white focus:outline-none">
                            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                                <path
                                    d="M4 6h16M4 12h16m-7 6h7"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <nav className={`md:flex md:flex-grow md:items-center md:justify-end ${isOpen ? 'block' : 'hidden'}`}>
                    <a href="#" className="block mt-4 md:inline-block md:mt-0 mr-4">VALUE</a>
                    <a href="#" className="block mt-4 md:inline-block md:mt-0 mr-4">UTILITIES</a>
                    <a href="#" className="block mt-4 md:inline-block md:mt-0">HOME</a>
                </nav>
            </div>
        </header>
    );
};

export default Header;

