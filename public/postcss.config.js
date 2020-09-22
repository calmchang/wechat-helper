module.exports = {
    plugins:[
        require("postcss-cssnext")({browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4']}),
        // postcss-cssnext包含了autoprefixer所以不用单独导入了
        // require("autoprefixer")({browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4']}),
    ]
}