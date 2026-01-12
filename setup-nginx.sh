#!/bin/bash
# Run this on VPS: ssh root@176.124.208.50 < setup-nginx.sh

# Create separate Nginx config for track-licence on port 8080
cat > /etc/nginx/sites-available/track-licence << 'EOF'
server {
    listen 8080;
    server_name 176.124.208.50;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

# Enable the site
ln -sf /etc/nginx/sites-available/track-licence /etc/nginx/sites-enabled/

# Open port 8080
ufw allow 8080/tcp

# Remove old /track-licence location from main config (cleanup)
# We'll leave the main config as-is since it doesn't hurt

# Test and reload nginx
nginx -t && systemctl reload nginx

echo "Done! Access track-licence at http://176.124.208.50:8080/"
