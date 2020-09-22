
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

dev(){
  yarn config set sass_binary_site http://npm.taobao.org/mirrors/node-sass -g
  yarn config set registry https://registry.npm.taobao.org -g
  yarn install
  
  # yarn run dllcss
  # yarn run dll
  yarn run dev  
}

checkNode
ret=$?
if [ $ret = 1 ]
then
  checkYarn
  ret=$?
  if [ $ret = 1 ]
  then
    dev
  fi
fi


