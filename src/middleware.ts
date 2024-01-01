import { NextRequest, NextResponse } from "next/server";


export function middleware(request: NextRequest) {
    return NextResponse.redirect(new URL('/login'))
}

export const config = {
    matcher: '/app/:path*'
}