import { withAuth } from 'next-auth/middleware';
import { NextRequest } from 'next/server';

export default withAuth(
  // Note that this callback is only invoked if
  // the `authorized` callback has returned `true`
  // and not for pages listed in `pages`.
 
  {
    
    pages: {
      signIn: "/auth/login",
      
    },
    callbacks: {
      authorized: ({ token, req: { nextUrl } }) => {
        console.log(nextUrl.pathname, '--req');
        if (nextUrl.pathname.startsWith('/profile') && token == null) {
          return false
        } else {
          return true
        }
        // return token != null
      }
    }
  }
);


export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};