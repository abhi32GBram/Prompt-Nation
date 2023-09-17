"use client";
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import React from 'react'

const NavBar = () => {
  // Get the user session using the useSession hook
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null)
  const [toggleDropDown, settoggleDropDown] = useState(false)

  // Fetch authentication providers when the component mounts
  useEffect(() => {
    const setUpProviders = async () => {
      // Fetch authentication providers using the getProviders function
      const response = await getProviders()
      setProviders(response)
    }
    setUpProviders()
  }, [])

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      {/* Logo and navigation */}
      <Link href="/" className='flex gap-2 flex-center'>
        <Image src="/assets/images/logo.svg" alt='promptNation Logo' width={30} height={30} className='object-contain'>
        </Image>
        <p className='logo_text'>Prompt Nation</p>
      </Link>

      {/* DESKTOP FRIENDLY SECTION */}
      <div className='sm:flex hidden'>
        {/* Display options for authenticated user */}
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href="/create-prompt" className='black_btn'> Create Post </Link>
            <button type='button' onClick={signOut} className='outline_btn'>Sign Out </button>
            <Link href="/profile">
              <Image src={session?.user.image} width={37} height={37} className='rounded-full' alt='profile' />
            </Link>
          </div>
        ) : (
          // Display sign-in options for unauthenticated user
          <>
            {providers && Object.values(providers).map((provider) => (
              // Display a button for each authentication provider
              <button type='button' key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'>Sign In </button>
            ))}
          </>
        )}
      </div>

      {/* MOBILE FRIENDLY SECTION */}
      <div className='sm:hidden flex relative'>
        {/* Display options for authenticated user */}
        {session?.user ? (
          <div className='flex '>
            <Image src="/assets/images/logo.svg" alt='promptNation Logo' width={30} height={30} className='object-contain' onClick={() => settoggleDropDown((prev) => !prev)} />
            {toggleDropDown && (
              // Display a dropdown menu for authenticated user
              <div className='dropdown'>
                <Link href="/profile" className='dropdown_link' onClick={() => settoggleDropDown(false)}> My Profile </Link>
                <Link href="/create-prompt" className='dropdown_link' onClick={() => settoggleDropDown(false)}> Create Prompt </Link>
                <button type='button' onClick={() => { settoggleDropDown(false); signOut() }} className='mt-5w w-full black_btn'>Sign Out </button>
              </div>
            )}
          </div>
        ) : (
          // Display sign-in options for unauthenticated user
          <>
            {providers && Object.values(providers).map((provider) => (
              // Display a button for each authentication provider
              <button type='button' key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'>Sign In </button>
            ))}
          </>
        )}
      </div>
    </nav>
  )
}

export default NavBar
