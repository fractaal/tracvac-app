echo $PWD
npm install --global yarn
yarn global add typescript
yarn global add quasar


cd client
echo $PWD
yarn install
quasar build -m pwa

cd ../server
echo $PWD
yarn install
tsc 

cd ../admin
echo $PWD
yarn install
quasar build