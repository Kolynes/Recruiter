cd RecruiterVue/
npm run build
cd ../
rm -r RecruiterApp/static/RecruiterApp/*
cp -r RecruiterVue/dist/* RecruiterApp/static/RecruiterApp/
cp RecruiterVue/dist/index.html RecruiterApp/templates/RecruiterApp/index.html
rm -r RecruiterVue/dist