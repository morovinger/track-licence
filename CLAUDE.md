# Track Licence Project

## Interaction Style

Always ask clarifying questions before starting work if the requirements are ambiguous or unclear. Do not make assumptions.

## Project Overview

This is a Nuxt 4 SSR website for "Тракторные-права.РФ" - an educational center for tractor licenses. The site uses **Nuxt Content** for content management and **Nuxt Studio** for in-production content editing.

## Nuxt Studio (Self-Hosted)

The project uses the self-hosted Nuxt Studio module for editing content directly in production.

### How It Works

1. Access `/_studio` on production to open the editor
2. Login via GitHub OAuth
3. Edit content through the visual interface
4. Changes are committed to GitHub automatically
5. GitHub Actions pulls changes, rebuilds, and restarts PM2
6. Content updates after rebuild (~30-60 seconds)

**Important**: Nuxt Content v3 compiles content into SQLite (`.output/server/contents.sqlite`) at build time. Content changes ALWAYS require a rebuild to take effect.

### Environment Variables (Production)

Required in `/var/www/track-licence/.env`:
```
NODE_ENV=production
STUDIO_GITHUB_CLIENT_ID=<your-client-id>
STUDIO_GITHUB_CLIENT_SECRET=<your-client-secret>
STUDIO_GITHUB_REDIRECT_URL=http://176.124.208.50:3000/__nuxt_studio/auth/github
```

### GitHub OAuth App Settings

- **Homepage URL**: `http://176.124.208.50:3000/`
- **Callback URL**: `http://176.124.208.50:3000/__nuxt_studio/auth/github`

## VPS Server Information

- **IP**: 176.124.208.50
- **OS**: Ubuntu 24.04
- **Web Server**: Nginx (reverse proxy on port 8080)
- **Process Manager**: PM2

### Deployed Applications

| App | Path on VPS | Port | URL |
|-----|-------------|------|-----|
| track-licence | `/var/www/track-licence` | 3000 | http://176.124.208.50:3000/ |
| spectech-front | `/var/www/test-front` | 3001 | http://176.124.208.50/ |
| spectech-back (Strapi) | `/var/www/test-back` | 1337 | http://176.124.208.50/api/ |

### Key Files on VPS

- **App directory**: `/var/www/track-licence`
- **PM2 config**: `/var/www/track-licence/ecosystem.config.cjs`
- **Environment**: `/var/www/track-licence/.env`
- **Nginx config**: `/etc/nginx/sites-available/track-licence`
- **Content files**: `/var/www/track-licence/content/`

## Deployment

### How It Works

**Nuxt Content v3** compiles markdown to SQLite at build time. All changes (content or code) require a rebuild.

**Deployment is automated via GitHub Actions**:
1. Push to `main` triggers the workflow
2. GitHub Actions builds the project (faster servers)
3. Built `.output` folder is deployed to VPS via rsync
4. PM2 restarts the app

This approach is faster than building on VPS because GitHub runners are more powerful.

### GitHub Actions Workflow

**File**: `.github/workflows/deploy.yml`

**What it does**:
1. **Build job** (on GitHub): checkout → npm ci → npm run build → upload artifact
2. **Deploy job**: download artifact → rsync to VPS → PM2 restart

**Secrets required**:
- `VDS_SSH_KEY` - SSH private key
- `VDS_HOST` - Server IP (176.124.208.50)
- `VDS_USER` - SSH user (root)
- `VDS_PATH` - Deployment path (/var/www/track-licence)
- `STUDIO_GITHUB_CLIENT_ID` - GitHub OAuth client ID (for Nuxt Studio)
- `STUDIO_GITHUB_CLIENT_SECRET` - GitHub OAuth client secret
- `STUDIO_GITHUB_REDIRECT_URL` - OAuth redirect URL

### Manual Deploy (if needed)

```bash
cd /var/www/track-licence
git pull
source .env && export STUDIO_GITHUB_CLIENT_ID STUDIO_GITHUB_CLIENT_SECRET STUDIO_GITHUB_REDIRECT_URL
npm run build
pm2 restart track-licence
```

## Common VPS Commands

```bash
# Check app status
pm2 list
pm2 logs track-licence

# Restart app (without rebuild)
pm2 restart track-licence

# Check deployed files
ls -la /var/www/track-licence/.output/
```

## MCP Servers

### SSH MCP

- **Purpose**: Remote server access and command execution
- **Host**: 176.124.208.50
- **User**: root

### Playwright MCP

- **Purpose**: Browser automation and testing
- **Package**: `@playwright/mcp@latest`

## Environment

- **Shell**: PowerShell (Windows)
- **Node.js**: 22.x
