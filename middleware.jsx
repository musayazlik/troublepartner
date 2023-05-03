import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    if (
      req.nextauth?.token?.role !== "admin" &&
      req.nextauth?.token?.memberType !== "admin"
    ) {
      return NextResponse.rewrite(new URL(process.env.APP_URL));
    }
  }
);
export const config = { matcher: ["/dashboard/:path*"] };
