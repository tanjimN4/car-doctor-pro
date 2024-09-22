'use client'
import SocialSignin from '@/components/shared/SocialSignin';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const signUp = () => {
    const handleSingup=async(e)=>{
        const newUser={
            name:e.target.name.value,
            email:e.target.email.value,
            password:e.target.password.value
        }
        try {
            const response = await fetch('signup/api', {
              method: 'POST',  // Ensure POST method is used
              headers: {
                'Content-Type': 'application/json',  // Send as JSON
              },
              body: JSON.stringify(newUser),  // Convert user data to JSON
            });
        
            if (response.ok) {
              const data = await response.json();
              console.log('User created:', data);
            } else {
              throw new Error('Failed to create user');
            }
          } catch (error) {
            console.error('Error creating user:', error);
          }
        
    }
    return (
        <div className="container px-24 mx-auto py-24 text-black">
            <div className="grid grid-cols-2 gap-12 items-center">
                <div>
                    <Image
                        src="/assets/images/login/login.svg"
                        height="540"
                        width="540"
                        alt="login image"
                    />
                </div>
                <div className="border-2 p-12">
                    <h6 className="text-3xl font-semibold text-primary text-center mb-12">
                        Sign Up
                    </h6>
                    <form onSubmit={handleSingup} action="">
                        <label htmlFor="email">Name</label> <br />
                        <input
                            type="text"
                            name="name"
                            placeholder="your name"
                            className="mt-3 w-full input input-bordered"
                        />
                        <br /> <br />
                        <label htmlFor="email">Email</label> <br />
                        <input
                            type="text"
                            name="email"
                            placeholder="your email"
                            className="mt-3 w-full input input-bordered"
                        />
                        <br /> <br />
                        <label htmlFor="password">Password</label> <br />
                        <input
                            type="password"
                            name="password"
                            placeholder="your password"
                            className="w-full mt-3 input input-bordered"
                        />
                        <br />
                        <button
                            type="submit"
                            className="w-full btn btn-primary mt-12 text-lg"
                        >
                            Sign Up
                        </button>
                    </form>
                    <div>
                        <h6 className="my-12 text-center">or sign in with</h6>
                        <SocialSignin />
                        <h6 className="my-12 text-center">
                            Already have account ?{" "}
                            <Link className="text-primary font-semibold" href={"/login"}>
                                Sign In
                            </Link>
                        </h6>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default signUp;