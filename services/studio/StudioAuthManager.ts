export type StudioAuthState = 'unknown' | 'authenticated' | 'unauthenticated'

export type StudioSessionUser = {
  name?: string
  email?: string
  avatar?: string
  provider?: string
  providerId?: string
}

export type StudioSessionResponse = {
  id: string
  user?: StudioSessionUser
}

/**
 * Handles client-side Studio auth visibility checks.
 *
 * Nuxt Studio sets a non-httpOnly cookie `studio-session-check=true` when the user is authenticated.
 * The `/__nuxt_studio/auth/session` endpoint always returns an `id`, even for anonymous users,
 * so "truthy response" is NOT a valid auth check.
 */
export class StudioAuthManager {
  private readonly sessionEndpoint: string
  private readonly sessionCheckCookieName: string

  constructor(options?: { sessionEndpoint?: string; sessionCheckCookieName?: string }) {
    this.sessionEndpoint = options?.sessionEndpoint ?? '/__nuxt_studio/auth/session'
    this.sessionCheckCookieName = options?.sessionCheckCookieName ?? 'studio-session-check'
  }

  public isAuthenticated(session: StudioSessionResponse | null): boolean {
    return Boolean(session?.user?.email)
  }

  public hasSessionCheckCookie(): boolean {
    if (typeof document === 'undefined') return false
    const cookie = `${this.sessionCheckCookieName}=`
    return document.cookie.split(';').some((part) => part.trim().startsWith(cookie))
  }

  public async fetchSession(): Promise<StudioSessionResponse | null> {
    // $fetch is globally available in Nuxt client runtime.
    // We keep this class framework-agnostic by using it directly.
    const response = await $fetch<StudioSessionResponse>(this.sessionEndpoint, {
      credentials: 'include',
    })
    return response ?? null
  }

  public async resolveAuthState(): Promise<StudioAuthState> {
    // Fast optimistic path (works even if endpoint is temporarily failing)
    if (this.hasSessionCheckCookie()) return 'authenticated'

    try {
      const session = await this.fetchSession()
      return this.isAuthenticated(session) ? 'authenticated' : 'unauthenticated'
    } catch {
      return 'unauthenticated'
    }
  }
}

