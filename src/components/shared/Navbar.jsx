import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IoCartOutline, IoSearch } from "react-icons/io5";

const Navbar = () => {
    const links=[
        {
            title:'Home',
            path:'/'
        },
        {
            title:'About',
            path:'/about'
        },
        {
            title:'Services',
            path:'/services'
        },
        {
            title:'Blog',
            path:'/blog'
        },
        {
            title:'Contacts',
            path:'/contacts'
        },
    ]
    return (
        <div className=' bg-base-100 text-black'>
            <div className="navbar container mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                           {
                            links.map((link)=>(
                                <li key={link.path}>
                                    <Link href={link.path}>{link.title}</Link>
                                </li>
                            ))
                           }
                        </ul>
                    </div>
                    <Link href='/'>
                    <Image alt="logo"  src='/assets/logo.svg' height={60} width={100}></Image>
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                    {
                            links.map((link)=>(
                                <li key={link.path}>
                                    <Link className='font-semibold hover:text-primary duration-300' href={link.path}>{link.title}</Link>
                                </li>
                            ))
                           }
                    </ul>
                </div>
                <div className="navbar-end">
                <div className='flex space-x-3 items-center'>
                <IoCartOutline className='text-xl'/>
                <IoSearch className='text-xl' />
                    <a className="btn btn-primary btn-outline px-4">Appoinment</a>
                </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;