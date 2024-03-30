import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from 'next/server'
export default authMiddleware({
  publicRoutes: ['/api/webhooks/clerk']
});

export const config = {
  matcher: [

    "/((?!.+\\.[\\w]+$|_next).*)",

    "/(api|trpc)(.*)",

    "/"
  ]
};


