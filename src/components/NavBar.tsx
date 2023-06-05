'use client'
import { Facebook, Twitter } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
    };

    return (
        <nav className="border-gray-200 bg-gray-50 dark:bg-slate-900 dark:border-gray-700">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4">
                <Link
                    href={'/'}
                    className="flex items-center text-indigo-400 no-underline hover:no-underline font-bold text-2xl lg:text-4xl">
                    Crypto
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-red-500 to-yellow-500">
                        Newbie
                    </span>
                </Link>
                <button
                    data-collapse-toggle="navbar-solid-bg"
                    type="button"
                    className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-solid-bg"
                    aria-expanded={isMenuOpen}
                    onClick={toggleMenu}
                >
                    <span className="sr-only">Open main menu</span>
                    <svg
                        className="w-6 h-6"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </button>
                <div
                    className={`${isMenuOpen ? 'block' : 'hidden'
                        } w-full md:block md:w-auto`}
                    id="navbar-solid-bg"
                >
                    <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-1 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                        <li>
                            <Link
                                href="/currencies/guide"
                                className="block py-2 px-4 font-medium text-sm text-gray-900 dark:text-zinc-400 rounded-lg hover:bg-gray-400 md:border-0 md:hover:text-white md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-blue-800 mr-1"
                            >

                                Beginner’s Guide
                            </Link>
                        </li>

                        <li>
                            <Link
                                href="/currencies/wallets"
                                className="block py-2 px-4 font-medium text-sm text-gray-900 dark:text-zinc-400 rounded-lg hover:bg-gray-400 md:border-0 md:hover:text-white md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-blue-800 mr-1"
                            >
                                Hardware Wallets
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/currencies/wallets"
                                className="block py-2 px-4 font-medium text-sm text-gray-900 dark:text-zinc-400 rounded-lg hover:bg-gray-400 md:border-0 md:hover:text-white md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-blue-800 mr-1"
                            >
                                Connect Wallet
                            </Link>
                        </li>

                        {/* <li>
                            <a
                                href="#"
                                className="block py-2 pl-3 pr-4 font-light text-gray-900 dark:text-zinc-400 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ml-12"
                            >
                                <Facebook />
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block py-2 pl-3 pr-4 font-light text-gray-900 dark:text-zinc-400 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                            >
                                <Twitter />
                            </a>
                        </li> */}

                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
