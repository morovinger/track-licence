import { getCookie, setCookie } from 'h3'

/**
 * Server middleware that ensures the `studio-session-check` cookie
 * is set when a valid Nuxt Studio session exists.
 *
 * Problem: Nuxt Studio sets an HttpOnly session cookie after OAuth,
 * but the client-side JS needs a non-HttpOnly `studio-session-check=true`
 * cookie to detect authentication state.
 *
 * This middleware reads the session cookie (server can access HttpOnly cookies)
 * and sets/syncs the `studio-session-check` cookie accordingly.
 */
export default defineEventHandler((event) => {
  // Only process on page requests, not API/asset requests
  const path = event.path || event.node.req.url || ''
  if (path.startsWith('/_nuxt') || path.startsWith('/__nuxt_studio/auth')) {
    return
  }

  const sessionCookie = getCookie(event, 'studio-session')
  const sessionCheckCookie = getCookie(event, 'studio-session-check')

  // If there's a session but no check cookie, set it
  if (sessionCookie && !sessionCheckCookie) {
    setCookie(event, 'studio-session-check', 'true', {
      path: '/',
      httpOnly: false, // Client-side JS must be able to read this
      secure: false, // Set to true if using HTTPS
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    })
  }

  // If there's no session but check cookie exists, remove it
  if (!sessionCookie && sessionCheckCookie) {
    setCookie(event, 'studio-session-check', '', {
      path: '/',
      maxAge: 0 // Delete the cookie
    })
  }
})
