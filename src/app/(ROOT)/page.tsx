import React from 'react'
import { UserButton } from "@clerk/nextjs";
const Home = () => {
  return (
    <div className="h-screen">
      Home
        <UserButton afterSignOutUrl='/'/>
      </div>
  )
}

export default Home



