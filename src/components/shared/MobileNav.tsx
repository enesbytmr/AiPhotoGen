'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {SignedIn, SignedOut, UserButton} from "@clerk/nextjs";
import {Sheet,SheetContent,SheetTrigger,} from "@/components/ui/sheet"
import {navLinks} from "@/constants";
import {usePathname} from "next/navigation";
import {Button} from "@/components/ui/button";

const MobileNav = () => {
    const pathName = usePathname()
    return <header className={"header"}>
        <nav className={"flex gap-2"}>
            <SignedIn>
                <Sheet>
                    <SheetTrigger>
                        <Image src="/assets/icons/menu.svg" alt='menu' width={32} height={32} className={"cursor-pointer"}/>
                    </SheetTrigger>
                    <SheetContent side={'left'} className={"sheet-content sm:w-64"}>
                        <>
                            <Image src={"/assets/images/logo-text.svg"} alt={"logo"} width={152} height={23}/>
                            <ul className="header-nav_elements">
                                {navLinks.map((link) => {
                                        const isActive = link.route === pathName

                                        return (
                                            <li key={link.route}
                                                className={`${isActive && 'gradient-text'} cursor-pointer p-18 flex whitespace-nowrap text-dark-700`}>
                                                <Link className="sidebar-link" href={link.route}>
                                                    <Image
                                                        src={link.icon}
                                                        alt="logo"
                                                        width={24}
                                                        height={24}
                                                    />
                                                    {link.label}
                                                </Link>
                                            </li>
                                        )
                                    }
                                )}
                            </ul>
                        </>
                    </SheetContent>
                </Sheet>


            </SignedIn>
            <SignedOut>
                <Button asChild variant="outline" className="button bg-purple-gradient bg-cover">
                    <Link href="/sign-in"> Login </Link>
                </Button>
            </SignedOut>
        </nav>

        <Link href={"/"} className={'items-center flex gap-2 md:py-2'}>
            <Image src={"/assets/images/logo-text.svg"} alt={'logo'} width={180} height={28}/>
        </Link>
        <SignedIn> <UserButton afterSignOutUrl="/"/> </SignedIn>
    </header>
}

export default MobileNav