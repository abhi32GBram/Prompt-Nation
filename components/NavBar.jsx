"use client";
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProvider } from 'next-auth/react'
import React from 'react'

const NavBar = () => {
  const isUserLoggedIn = true;
  const [providers, setProviders] = useState(null)
  const [toggleDropDown, settoggleDropDown] = useState(false)

  useEffect(() => {
    const SetProviders = async () => {
      const repsonse = await getProvider()
      setProviders(repsonse)
    }
    setProviders()
  }, [])

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href="/" className='flex gap-2 flex-center'>
        <Image src="/assets/images/logo.svg" alt='promptNation Logo' width={30} height={30} className='object-contain'>
        </Image>
        <p className='logo_text'>Prompt Nation</p>
      </Link>

      {/* DESKTOP FRIENDLY SECTION  */}
      <div className='sm:flex hidden'>
        {isUserLoggedIn ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href="/create-prompt" className='black_btn'> Create Post </Link>
            <button type='button' onClick={signOut} className='outline_btn'>Sign Out </button>
            <Link href="/profile">
              <Image src="/assets/icons/loader.svg" width={37} height={37} className='rounded-full' alt='profile' />
            </Link>
          </div>
        ) :
          <>
            {providers &&
              Object.values(providers).map((providers) => (
                <button type='button' key={providers.name} onClick={() => signIn(providers.id)} className='black_btn'>Sign In </button>
              ))}
          </>
        }
      </div>

      {/* MOBILE FRIENDLY SECTION  */}
      <div className='sm:hidden flex relative'>
        {isUserLoggedIn ? (
          <div className='flex '>
            <Image src="/assets/images/logo.svg" alt='promptNation Logo' width={30} height={30} className='object-contain' onClick={() => settoggleDropDown((prev) => !prev)} />
            {toggleDropDown && (
              <div className='dropdown'>
                <Link href="/profile" className='dropdown_link' onClick={() => settoggleDropDown(false)}> My Profile </Link>
                <Link href="/create-prompt" className='dropdown_link' onClick={() => settoggleDropDown(false)}> Create Prompt </Link>
                <button type='button' onClick={() => { settoggleDropDown(false); signOut() }} className='mt-5w w-full black_btn'>Sign Out </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((providers) => (
                <button type='button' key={providers.name} onClick={() => signIn(providers.id)} className='black_btn'>Sign In </button>
              ))}
          </>
        )}
      </div>
    </nav>
  )
}

export default NavBar
