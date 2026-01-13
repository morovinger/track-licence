require('dotenv').config()

module.exports = {
  apps: [{
    name: 'track-licence',
    script: '.output/server/index.mjs',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      PORT: process.env.PORT || 3000,
      HOST: '0.0.0.0',
      STUDIO_GITHUB_CLIENT_ID: process.env.STUDIO_GITHUB_CLIENT_ID,
      STUDIO_GITHUB_CLIENT_SECRET: process.env.STUDIO_GITHUB_CLIENT_SECRET,
      STUDIO_GITHUB_REDIRECT_URL: process.env.STUDIO_GITHUB_REDIRECT_URL
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    min_uptime: '10s',
    max_restarts: 10
  }]
}

