echo "Building app..."
npm run build
echo "Deploy files to server..."
scp -r dist/* root@174.138.72.129:/var/www/html
echo "Done!"