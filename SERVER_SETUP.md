# Server Setup Guide for track-licence

## Current Server Status (from your output)

**Occupied Ports:**
- ✅ Port 80, 443 - nginx (ready for reverse proxy)
- ⚠️ Port 3000 - Already in use by another node process (PID: 2444722)
- Port 1337, 3040, 4050, 4051, 5173 - Other node apps
- Port 5432 - PostgreSQL
- Port 22 - SSH

## Option 1: Use Port 3000 (Recommended - Stop Old Process)

### 1. Check what's running on port 3000
```bash
sudo lsof -i :3000
# or
ps aux | grep 2444722
```

### 2. Stop the old process
```bash
# If it's managed by PM2
pm2 list
pm2 stop <old-process-name>
pm2 delete <old-process-name>

# If it's a regular node process
sudo kill 2444722

# Verify port is free
sudo ss -tulpn | grep :3000
```

### 3. Deploy track-licence on port 3000
```bash
cd /var/www/track-licence
pm2 start ecosystem.config.js
pm2 save
```

## Option 2: Use Different Port (e.g., 3001)

### 1. Start with custom port
```bash
cd /var/www/track-licence
PORT=3001 pm2 start ecosystem.config.js
pm2 save
```

### 2. Update nginx config
Edit `proxy_pass` in nginx config:
```nginx
proxy_pass http://127.0.0.1:3001;
```

## Nginx Setup Steps

### 1. Upload nginx config to server
```bash
# Copy the nginx.conf to server
scp nginx.conf user@server:/tmp/track-licence.nginx

# On server, move it to nginx directory
sudo mv /tmp/track-licence.nginx /etc/nginx/sites-available/track-licence
```

### 2. Update domain name in config
```bash
sudo nano /etc/nginx/sites-available/track-licence

# Replace:
# xn----7sbhhfbvdcqfhb2bpg.xn--p1ai
# with your actual domain
```

### 3. Enable the site
```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/track-licence /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# If test passes, reload nginx
sudo systemctl reload nginx
```

### 4. Verify it's working
```bash
# Check nginx status
sudo systemctl status nginx

# Test from server
curl http://localhost

# Check logs if issues
sudo tail -f /var/log/nginx/track-licence-error.log
```

## Setup SSL Certificate (After HTTP is working)

```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Certbot will automatically update your nginx config
# Test auto-renewal
sudo certbot renew --dry-run
```

## Troubleshooting

### Port already in use
```bash
# Find what's using the port
sudo lsof -i :3000

# Kill the process
sudo kill <PID>

# Or use fuser
sudo fuser -k 3000/tcp
```

### PM2 not starting
```bash
# Check PM2 logs
pm2 logs track-licence

# Check if .output exists
ls -la /var/www/track-licence/.output/

# Manually test
cd /var/www/track-licence
node .output/server/index.mjs
```

### Nginx errors
```bash
# Check nginx error logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/track-licence-error.log

# Check nginx configuration
sudo nginx -t

# Restart nginx
sudo systemctl restart nginx
```

### App not accessible from outside
```bash
# Check firewall
sudo ufw status
sudo ufw allow 80
sudo ufw allow 443

# Check if app is listening
sudo ss -tulpn | grep :3000

# Test locally first
curl http://localhost:3000
```

## Recommended Port Configuration

**For production, I recommend:**
1. Stop the old process on port 3000
2. Use port 3000 for track-licence (matches the nginx config)
3. Use nginx on ports 80/443 for public access

This keeps the standard setup and makes it easier to manage.

