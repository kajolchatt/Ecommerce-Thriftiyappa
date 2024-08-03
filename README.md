# Ecommerce-Thriftiyappa

npm create vite@latest frontend -- --template react
cd .\frontend\
 npm i

# dependencies in root folder

npm i nodemon multer mongoose jsonwebtoken express-formidable express-async-handler express dotenv cors cookie-parser concurrently bcryptjs

# dependencies in frontend folder

npm i slick-carousel react-slick react-toastify react-router react-router-dom react-redux react-icons apexcharts react-apexcharts moment flowbite axios @reduxjs/toolkit @paypal/react-paypal-js

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# running frontend and backend ->add below in package.json

"scripts": {
"backend": "nodemon backend/index.js",
"frontend":"npm run dev --prefix frontend",
"dev":"concurrently \"npm run frontend\" \"npm run backend\""
},

# fo to root directory and type in the below cmnd

npm run frontend
npm run backend

images static access->windows powershell icacls "E:\ecommerce\uploads" /grant Everyone:(OI)(CI)F /T
