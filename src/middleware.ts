import { NextRequest, NextResponse } from "next/server";
import { createMiddleware } from 'next-easy-middlewares';
import { MiddlewareConfig } from "next/dist/build/analysis/get-page-static-info";
import { checkPermissions, fetchSession } from "./util/util";

export { default } from "next-auth/middleware"

const middlewares: Record<string, any> = {
  '/app/admin/:path*': async (request: NextRequest) => {
    const session = await fetchSession()
    if (session && checkPermissions('admin', session))
      return NextResponse.next();
    else
      return NextResponse.redirect('/app/home?error=unauthorized');
  },
}

export const middleware = createMiddleware(middlewares);

export const config = {
  matcher: ['/app/:path*']
}