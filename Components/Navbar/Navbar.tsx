'use client'

import React from 'react';
import { useState } from "react";
import { Link, Button, Spinner } from "@heroui/react";
import { signOut, useSession } from '@/app/lib/auth-client';
import { useRouter } from 'next/navigation';


const Navbar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { data: session, isPending } = useSession()
    const router = useRouter()

    console.log('user session in navbar', session)

    if(isPending){
      return <div className="flex flex-col items-center my-3">
        <Spinner size="lg" color="success" />
      </div>
    }

    const link = <>
    <li>
            <Link href="/services">Services</Link>
          </li>
          <li>
            <Link href="/dashboard">
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/profile">Profile</Link>
          </li>
    </>


    const authLink = <>
    {
      session?.user ? <>
      <h1>Welcome <Link href='/profile' className='text-green-600 font-bold'>{session.user.name}</Link></h1>
      <Button onClick={() => signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/sign-in")
          },
        }
      })} className={'bg-green-600'}>Sign Out</Button>
      </>
      :
      <>
      <Link href="/sign-in">Sign In</Link>
      <Link href='/sign-up'><Button className={'bg-green-600'}>Sign Up</Button></Link>
      </>
    }
    </>

    return (
        <div className='sticky top-0 z-40'>
            <nav className="w-full border-b border-separator bg-background/70 backdrop-blur-lg">
      <header className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
          <div className="flex items-center gap-3">
            <Link href='/' className="font-bold">ACME</Link>
          </div>
        </div>
        <ul className="hidden items-center gap-4 md:flex">
          {link}
        </ul>
        <div className="hidden items-center gap-4 md:flex">
          {authLink}
        </div>
      </header>
      {isMenuOpen && (
        <div className="border-t border-separator md:hidden">
          <ul className="flex flex-col gap-2 p-4">
            {link}
            <li className="mt-4 flex flex-col gap-2 border-t border-separator pt-4">
              {authLink}
            </li>
          </ul>
        </div>
      )}
    </nav>
        </div>
    );
};

export default Navbar;