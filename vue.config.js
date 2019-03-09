module.exports = {
    configureWebpack:()=>{
        return {
            entry:'./src/main.js',
            output:{
                library:'test',
                libraryTarget:'umd',
                umdNamedDefine:true
            }
        }
    },
    css:{ extract: false},
    lintOnSave:false
}