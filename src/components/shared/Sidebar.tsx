"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { SignedIn } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { navLinks } from '@/constants'

const Sidebar = () => {
    const pathName = usePathname();

  return (
    <aside className='sidebar'>
        <div className="flex size-full flex-col gap-4">
            <Link href="/" className='sidebar-logo'>
                <Image src="/assets/images/logo-text.svg" alt='logo' width={180} height={28} />
            </Link>
            <nav className="sidebar-nav">
                <SignedIn>
                    <ul className="sidebar-nav_elements">
                        {navLinks.map((link) => {
                            const isActive = link.route === pathName

                            return (
                                <li key={link.route} className={`sidebar-nav_element group ${isActive ? 'bg-purple-gradient text-white' : 'text-gray-700'}`} >
                                    <Link className='sidebar-link' href={link.route}> </Link>
                                </li>
                            )
                        }
                        )}
                    </ul>
                </SignedIn>
            </nav>

        </div>
    </aside>

  )
}

export default Sidebar
