@echo off
echo ========================================
echo Frontend Production Configuration
echo ========================================
echo.

echo Current API Configuration:
echo - Development: http://localhost:8080/api
echo - Production: https://your-backend-domain.com/api
echo.

echo To configure for production:
echo 1. Update the BASE_URL in src/config/api.ts
echo 2. Replace 'https://your-backend-domain.com/api' with your actual backend URL
echo 3. Build the frontend using: npm run build
echo.

echo Example backend URLs:
echo - Heroku: https://your-app.herokuapp.com/api
echo - Railway: https://your-app.railway.app/api
echo - Render: https://your-app.render.com/api
echo - Vercel: https://your-app.vercel.app/api
echo - Custom Domain: https://api.yourdomain.com/api
echo.

echo After updating the URL, run:
echo   npm run build
echo   npm start
echo.

pause 