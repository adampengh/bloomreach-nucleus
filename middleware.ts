import { NextResponse, NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL('/home', request.url))
}

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};


// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// // This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {
//   const response = NextResponse.next()

//   const referer = request.headers.get('referer')
//   console.log('Referer:', referer)
//   response.headers.set('X-FRAME-OPTIONS', 'SAMEORIGIN')

//   // Add a header to all responses, except for the token and server-id endpoints
//   // This only applies to Experience Manager
//   if (!request.url.includes('token') && !request.url.includes('server-id')) {
//     response.headers.set('X-FRAME-OPTIONS', 'SAMEORIGIN')
//   }

//   if (referer && referer.includes('token') && referer.includes('server-id')) {
//     response.headers.set('X-FRAME-OPTIONS', '')
//   }

//   return response
// }

// export const config = {
//   // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
//   // matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
// };
