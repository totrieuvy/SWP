echo "Building app..."
npm run build
echo "Deploy files to server..."
scp -r dist/* root@159.89.49.13:/var/www/html
echo "Done!"