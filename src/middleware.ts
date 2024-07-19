import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // const referer = request.headers.get('referer')
  // console.log('Referer:', referer)

  // Add a header to all responses, except for the token and server-id endpoints
  // This only applies to Experience Manager
  // if (!request.url.includes('token') && !request.url.includes('server-id')) {
  //   response.headers.set('X-FRAME-OPTIONS', 'SAMEORIGIN')
  // }

  // if (referer && referer.includes('token') && referer.includes('server-id')) {
  //   response.headers.set('X-FRAME-OPTIONS', '')
  // }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
