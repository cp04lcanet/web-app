# Render Deployment Guide for Strapi CMS

This guide will walk you through deploying your Strapi CMS to Render with a PostgreSQL database.

## Prerequisites

- A Render account (sign up at https://render.com)
- Your Strapi CMS code pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Step 1: Create PostgreSQL Database on Render

1. **Log in to Render Dashboard**
   - Go to https://dashboard.render.com
   - Sign in or create an account

2. **Create a New PostgreSQL Database**
   - Click the **"New +"** button in the top right
   - Select **"PostgreSQL"** from the dropdown

3. **Configure Database Settings**
   - **Name**: `localact-cms-db` (or your preferred name)
   - **Database**: `localact` (or your preferred database name)
   - **User**: Leave default or customize
   - **Region**: Choose the closest region to your users
   - **PostgreSQL Version**: Select the latest stable version (14 or 15)
   - **Plan**:
     - **Free**: For development/testing (limited connections, may spin down)
     - **Starter ($7/month)**: Better for production (always on, more connections)
   - Click **"Create Database"**

4. **Save Database Connection Details**
   - Once created, Render will show you:
     - **Internal Database URL** (for services in the same region)
     - **External Database URL** (for external connections)
     - **Host, Port, Database, User, Password**
   - **Important**: Copy the **Internal Database URL** - you'll need this for the Strapi service
   - The URL format: `postgresql://user:password@host:port/database`

## Step 2: Create Strapi CMS Web Service on Render

1. **Create New Web Service**
   - Click **"New +"** button
   - Select **"Web Service"**
   - Connect your Git repository (GitHub/GitLab/Bitbucket)
   - Select the repository containing your Strapi CMS

2. **Configure Build Settings**
   - **Name**: `localact-cms` (or your preferred name)
   - **Region**: Same region as your database (for better performance)
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: `cms` (since your Strapi app is in the `cms` folder)
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**:
     - **Free**: For development (spins down after inactivity)
     - **Starter ($7/month)**: Better for production (always on)

3. **Configure Environment Variables**
   Click **"Advanced"** and add these environment variables:

   **Required Secrets** (generate new ones for production):
   ```
   APP_KEYS=LAsTVqZg+cG/5EwpRl3AkfGgd0DL6C5mTrlM3As2LnQ=,EfVtIQJcZxCf7j1Uy6vEZzNcTio1SxYD+IKTvgrQKug=,8IuHQ0hFlCj1AP1X0I5BZq5FGuM4NTjTgLMmoS8h16M=,SMigcGWVmnXP58Y/bVR4DYcbsmyXLvO2tyBU5/Y9gME=
   JWT_SECRET=8/ypsVBD4zv2s1kgPQqQDuCNPjHoSs9SU622ag7QWPI=
   ADMIN_JWT_SECRET=AgUOpaZt5A4dz5pqOLtScbrC8Ksm4uFqUho6AcrV3v8=
   API_TOKEN_SALT=qP91BqMYCs3Yfqjb9Vl/Vyx3nhRBH207cFv6qbBN77o=
   TRANSFER_TOKEN_SALT=+0K3Zy5Nd5S1k3M8NS9ufbAamOKyZskYgXXRvS73pM4=
   ENCRYPTION_KEY=J5pXfbTjtcsn74sIiJNP2rx1g+YJ/C1HoNTCOUD5RX0=
   ```

   **Database Configuration**:
   ```
   DATABASE_CLIENT=postgres
   DATABASE_SSL=true
   DATABASE_SSL_REJECT_UNAUTHORIZED=false
   ```

   **Server Configuration**:
   ```
   HOST=0.0.0.0
   NODE_ENV=production
   ```

   **CORS Configuration** (update with your frontend URL):
   ```
   CORS_ORIGINS=https://your-frontend-app.onrender.com,https://www.yourdomain.com
   ```

   **Link Database**:
   - Scroll down to **"Add Environment Variable"**
   - Click **"Link Database"**
   - Select your PostgreSQL database created in Step 1
   - This automatically adds `DATABASE_URL` with the internal connection string

4. **Create the Service**
   - Click **"Create Web Service"**
   - Render will start building and deploying your Strapi CMS

## Step 3: Initial Setup and Admin User

1. **Wait for Deployment**
   - The first deployment may take 5-10 minutes
   - Watch the build logs for any errors

2. **Access Strapi Admin Panel**
   - Once deployed, your service will have a URL like: `https://localact-cms.onrender.com`
   - Visit: `https://your-service-url.onrender.com/admin`
   - You'll be prompted to create the first admin user

3. **Create Admin Account**
   - Fill in the admin registration form
   - This creates your first super admin user

## Step 4: Update Frontend API URL

1. **Get Your CMS URL**
   - Your Strapi API will be available at: `https://your-service-url.onrender.com`
   - The API endpoint is: `https://your-service-url.onrender.com/api`

2. **Update Client Configuration**
   - In your `client/index.html`, update the API URL:
   ```javascript
   window.__API_URL__ = 'https://your-service-url.onrender.com';
   ```

## Step 5: Run Database Migrations (if needed)

If you have existing data or need to run migrations:

1. **Access Strapi Console** (if available)
   - Or use Render's shell feature
   - Run: `npm run strapi migrate`

## Important Notes

### Security
- **Never commit `.env` file** - it's already in `.gitignore`
- **Generate new secrets** for production (don't use the example keys)
- Use Render's **Environment Variables** for all secrets
- Keep your database credentials secure

### Database
- **Free tier databases** may spin down after inactivity
- **Starter tier** ($7/month) keeps database always on
- Use **Internal Database URL** for better performance
- Database is automatically backed up on Render

### Performance
- First request after inactivity may be slow (cold start on free tier)
- Consider upgrading to Starter plan for production
- Enable caching in Strapi for better performance

### CORS
- Update `CORS_ORIGINS` with your actual frontend URL(s)
- Add multiple URLs separated by commas if needed
- Include both `http://` and `https://` if applicable

### Monitoring
- Check Render dashboard for logs and metrics
- Set up alerts for service downtime
- Monitor database connection limits

## Troubleshooting

### Build Fails
- Check build logs in Render dashboard
- Ensure `package.json` has correct scripts
- Verify Node version compatibility (18.x - 22.x)

### Database Connection Issues
- Verify `DATABASE_URL` is set correctly
- Check `DATABASE_SSL=true` for Render PostgreSQL
- Ensure database and service are in same region

### CORS Errors
- Update `CORS_ORIGINS` with correct frontend URL
- Check browser console for specific error
- Verify frontend is making requests to correct API URL

### Admin Panel Not Loading
- Check service logs for errors
- Verify all environment variables are set
- Ensure database migrations completed successfully

## Generating New Secrets

To generate new secure keys for production:

```bash
# Generate APP_KEYS (run 4 times)
openssl rand -base64 32

# Generate JWT_SECRET
openssl rand -base64 32

# Generate ADMIN_JWT_SECRET
openssl rand -base64 32

# Generate API_TOKEN_SALT
openssl rand -base64 32

# Generate TRANSFER_TOKEN_SALT
openssl rand -base64 32

# Generate ENCRYPTION_KEY
openssl rand -base64 32
```

## Support

- Render Documentation: https://render.com/docs
- Strapi Documentation: https://docs.strapi.io
- Render Support: https://render.com/support
