echo "Building app..."
npm run build
echo "Deploy files to server..."
scp -r dist/* root@128.199.78.89:/var/www/html
echo "Done!"