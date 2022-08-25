
read -p "请选择环境：1、预发测试 2、生产：" packageType

if [ $packageType = "1" ]
then
  npm run build:dev
  npm run buildesm:dev
else 
  npm run build
  npm run buildesm
fi

git add -A
git commit -m "build"

npm version patch
git push

npm publish