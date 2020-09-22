read -p "请选择环境：1、预发测试 2、生产：" packageType

checkYarn(){
  ss=`yarn -v`
  flag=$?
  if [ $flag != 0 ]
  then
    echo -e "\033[41;37m Please Install Yarn \033[0m"
    npm install yarn -g
    yarn -v
    echo -e "yarn install complete"
    return 0
  else
    return 1
  fi
}

checkNode(){
  for line in `node -v` 
  do
  if [ $line != "v10.18.0" ]
  then
    nvm use v10.18.0
    ret=$?
    if [ $ret != 0 ]
    then
      echo -e "\033[41;37m Change Node to v10.18.0 (try nvm use v10.18.0)\033[0m"
      return 0
    else
      return 1
    fi
  else
    return 1
  fi
  done
}

build(){
  echo "start building"
  yarn config set sass_binary_site http://npm.taobao.org/mirrors/node-sass -g
  yarn config set registry https://registry.npm.taobao.org -g
  yarn install
  
  
  echo "build pm"
  if [ $packageType = "1" ]
  then
    yarn run build:dev
    yarn run buildesm:dev
  else 
    yarn run build
    yarn run buildesm
  fi  
  
  echo "\033[44;32m completed \033[0m"
}





checkNode
ret=$?
if [ $ret = 1 ]
then
  checkYarn
  ret=$?
  if [ $ret = 1 ]
  then
    build
  fi
fi


