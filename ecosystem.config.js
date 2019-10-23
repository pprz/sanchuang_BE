module.exports = {
  apps: [{
    name: 'API',
    script: 'app/starter.js --env env_production',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'one two',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy: {
    production: {
      user: 'root',
      host: '49.232.70.71',
      ref: 'origin/master',
      repo: 'git@github.com:pprz/sanchuang_BE.git',
      path: '/var/www/production',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
};
