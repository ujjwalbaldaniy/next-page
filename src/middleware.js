import { NextResponse } from "next/server";
import { ROLE_TOKEN_KEY, TOKEN_KEY } from "./utils/constant";
import { jwtDecode } from "jwt-decode";

const authPages = ["/signin", "/signup", "/"];
const teacherPages = ["/server", "/client", "/static", "/isr"];
const studentPages = ["/home", "/about", "/contact"];

export const middleware = (request) => {
  let authToken = request.cookies.get(TOKEN_KEY)?.value;
  let roleBaseToken = request.cookies.get(ROLE_TOKEN_KEY)?.value;

  const isTokenExpired = () => {
    if (authToken) {
      const decodedToken = jwtDecode(authToken);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp < currentTime;
    }
    return false;
  };

  const isLoginPage = authPages.includes(request.nextUrl.pathname);
  const userPaths = request.nextUrl.pathname;

  if (authToken && !isTokenExpired()) {
    const userPages = roleBaseToken === "teacher" ? teacherPages : studentPages;

    if (
      isLoginPage ||
      (!userPages.includes(request.nextUrl.pathname) &&
        !userPages.some((pages) => userPaths.startsWith(pages)))
    ) {
      return NextResponse.redirect(new URL(userPages[0], request.url));
    }
  } else if (!isLoginPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }
};

export const config = {
  matcher: [
    "/",
    "/signin",
    "/signup",
    "/server/:path*",
    "/client/:path*",
    "/static/:path*",
    "/isr/:path*",
    "/home/:path*",
    "/about/:path*",
    "/contact/:path*",
  ],
};
