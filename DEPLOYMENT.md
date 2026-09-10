# Deployment Guide for CampusConnect

## Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL 12+
- Git
- GitHub account

## Local Development

### 1. Clone Repository

```bash
git clone https://github.com/BuiltByKole/campus-connect.git
cd campus-connect
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

```bash
cp .env.example .env
```

Update `.env` with your configuration:

```env
VITE_API_URL=http://localhost:5000
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/campus_connect
JWT_SECRET=your-super-secret-key-here
JWT_REFRESH_SECRET=your-refresh-secret-here
```

### 4. Database Setup

```bash
# Create PostgreSQL database
psql -U postgres
create database campus_connect;
\q

# Run migrations
npm run migrate:up
```

### 5. Run Development Server

```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- API Health: http://localhost:5000/health

## Production Deployment

### Option 1: Vercel (Recommended for Frontend)

1. **Connect GitHub Repository**
   ```bash
   git push origin main
   ```

2. **Import on Vercel**
   - Go to https://vercel.com/new
   - Import the GitHub repository
   - Add environment variables

3. **Configure Build**
   ```
   Build Command: npm run build
   Output Directory: dist
   ```

### Option 2: Railway or Heroku (For Backend)

**Railway:**

1. Connect GitHub repository
2. Add PostgreSQL addon
3. Set environment variables
4. Deploy

**Heroku:**

```bash
heroku create campus-connect
heroku addons:create heroku-postgresql:hobby-dev
heroku config:set JWT_SECRET=your-secret
git push heroku main
```

### Option 3: Self-Hosted (VPS/Cloud VM)

1. **Install Dependencies**
   ```bash
   sudo apt update
   sudo apt install nodejs npm postgresql nginx
   ```

2. **Clone Repository**
   ```bash
   git clone https://github.com/BuiltByKole/campus-connect.git
   cd campus-connect
   npm install
   ```

3. **Build Application**
   ```bash
   npm run build
   ```

4. **Configure Nginx**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:5000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```

5. **Start Application**
   ```bash
   npm start
   ```

6. **Setup SSL (Let's Encrypt)**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com
   ```

## Security Checklist

- [ ] Change all default secrets
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS properly
- [ ] Set secure database backups
- [ ] Enable rate limiting
- [ ] Set up monitoring and logging
- [ ] Configure firewall rules
- [ ] Enable CSRF protection
- [ ] Set up regular security updates
- [ ] Use environment variables for all secrets

## Monitoring

### Logs

```bash
# Local development
npm run dev

# Production
npm run build
npm start 2>&1 | tee app.log
```

### Health Checks

```bash
# Check API health
curl http://localhost:5000/health
```

## Database Backups

```bash
# Backup PostgreSQL
pg_dump campus_connect > backup.sql

# Restore backup
psql campus_connect < backup.sql
```

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port 5000
lsof -i :5000
kill -9 <PID>
```

### Database Connection Error

```bash
# Check PostgreSQL is running
sudo systemctl status postgresql

# Verify connection string
echo $DATABASE_URL
```

### Build Errors

```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install
```

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|----------|
| VITE_API_URL | Backend API URL | http://localhost:5000 |
| NODE_ENV | Environment | development/production |
| PORT | Server port | 5000 |
| DATABASE_URL | PostgreSQL connection | postgresql://user:pass@host/db |
| JWT_SECRET | JWT signing key | your-secret-key |
| JWT_REFRESH_SECRET | Refresh token secret | your-refresh-secret |
| CORS_ORIGIN | CORS allowed origin | http://localhost:5173 |

## Support

For deployment issues, check the logs:

```bash
npm run build:debug
```

Or open an issue on GitHub.
