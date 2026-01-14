import { getRequestProtocol } from 'h3'

/**
 * Server plugin to fix Nuxt Studio session cookies for HTTP connections.
 *
 * Problem: The h3 session uses `secure: true` by default, which prevents
 * cookies from being stored when accessing the site over HTTP (not HTTPS).
 *
 * This plugin intercepts the OAuth callback response and re-sets the
 * session cookies with `secure: false` for HTTP connections.
 *
 * NOTE: For production, you should use HTTPS instead of this workaround.
 */
export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('beforeResponse', async (event, response) => {
    const path = event.path || event.node.req.url || ''

    // Only intercept OAuth callback responses
    if (!path.startsWith('/__nuxt_studio/auth/github') &&
        !path.startsWith('/__nuxt_studio/auth/google') &&
        !path.startsWith('/__nuxt_studio/auth/gitlab')) {
      return
    }

    // Check if this is an HTTP request (not HTTPS)
    const protocol = getRequestProtocol(event)
    const isSecure = protocol === 'https'

    if (isSecure) {
      return // No fix needed for HTTPS
    }

    // Get the Set-Cookie headers and fix them
    const headers = event.node.res.getHeaders()
    const setCookieHeaders = headers['set-cookie']

    if (!setCookieHeaders) {
      return
    }

    // Convert to array if needed
    const cookies = Array.isArray(setCookieHeaders) ? setCookieHeaders : [setCookieHeaders]

    // Clear existing Set-Cookie headers
    event.node.res.removeHeader('set-cookie')

    // Re-add cookies with secure=false for HTTP
    for (const cookie of cookies) {
      // Remove 'Secure' flag from the cookie
      const fixedCookie = cookie.replace(/;\s*Secure/gi, '')
      event.node.res.appendHeader('set-cookie', fixedCookie)
    }
  })
})
