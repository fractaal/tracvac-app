echo $PWD
npm install --global yarn
yarn global add typescript
yarn global add @quasar/cli


cd client
echo $PWD
echo Installing client dependencies
yarn install --production=false
echo Building client 
quasar build -m pwa

cd ../server
echo $PWD
echo Installing server dependencies
yarn install --production=false
echo Compiling TypeScript
tsc 

cd ../admin
echo $PWD
echo Installing admin interface dependencies
yarn install --production=false
echo Building admin interface
quasar build