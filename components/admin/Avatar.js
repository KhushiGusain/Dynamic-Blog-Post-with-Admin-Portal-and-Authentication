"use client"
import React, { useEffect } from 'react'
import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';

const Avatar = () => {
    const {data: session, status} = useSession();
    const [drop, setdrop] = useState(false)

    useEffect(() => {
        if(drop){
            setTimeout(() => {
                setdrop(false);
            }, 3000);
        }
    },[drop])

    return (
        <div
            onClick={() => setdrop(!drop)} 
            className='flex gap-2 justify-center items-center mx-2 cursor-pointer border bg-white border-gray-200 rounded-lg p-2 hover:bg-gray-50 transition-colors duration-200'
        >
            <h2 className='text-sm font-medium text-black'>{session?.user?.email}</h2>
            <img 
                className='border-2 border-gray-200 rounded-full p-1 hover:border-gray-300 transition-colors duration-200' 
                width={30} 
                height={30} 
                src="/images/wired-outline-21-avatar-hover-jumping.png" 
                alt="avatar" 
            />
            
            {drop && (
                <div className="z-10 w-fit absolute top-14 my-1 right-5 bg-white divide-y divide-gray-100 rounded-lg shadow-sm">
                    <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownDelayButton">
                        <li>
                            <button 
                                onClick={() => signOut()}
                                className='block w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors duration-200'
                            >
                                Sign out
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Avatar
