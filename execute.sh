cd /var/www/html/client/bdlancers-frontend
git stash
git pull origin master
npm install
npm run build
pm2 reload OutChimp
exit
