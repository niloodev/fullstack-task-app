// import NextRequest type
import type { NextRequest } from 'next/server'
// import NextResponse class, that is used to return the value of middleware
import { NextResponse } from 'next/server'

// import getAuth and fireApp
import { getAuth } from 'firebase/auth'
import fireApp from '../../lib/firebase-config'

// In rewrite method you pass a page folder name(as a string). which // you create to handle underConstraction  functionalty.
export function middleware(req: NextRequest) {
    if (!getAuth(fireApp).currentUser)
        return NextResponse.redirect(new URL('/auth/login', req.url))

    return NextResponse.next()
}
