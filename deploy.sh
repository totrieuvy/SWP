echo "Building app..."
npm run build
echo "Deploy files to server..."
scp -r dist/* root@143.198.216.177:/var/www/html/
echo "Done!"