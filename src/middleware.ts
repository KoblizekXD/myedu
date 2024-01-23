import { NextRequest, NextResponse } from "next/server";
import { createMiddleware } from "next-easy-middlewares";

export function checkPermissions(permissions: 'admin' | 'student' | 'teacher', session: any): boolean {
  if (permissions === 'student') {
    return true
  } else if (permissions === 'teacher' && (session.user.teacher != null || session.user.admin != null)) {
    return true
  } else if (permissions === 'admin' && session.user.admin) {
    return true
  } else return false
}

export { default } from "next-auth/middleware";

const middlewares: Record<string, any> = {
  "/app/admin/:path*": async (request: NextRequest) => {
    const session = await (await fetch(
      new URL("/api/auth/session", request.url),
      { headers: Object.fromEntries(request.headers) }
    )).json();
    if (session && checkPermissions("admin", session))
      return NextResponse.next();
    else return NextResponse.redirect("/app/home?error=unauthorized");
  },
};

export const middleware = createMiddleware(middlewares);

export const config = {
  matcher: ["/app/:path*"],
};
