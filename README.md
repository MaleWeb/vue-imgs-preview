
<p align="center">
  <a href="https://maleweb.github.io/#/">
    <img alt="Male" src="https://uufe-web.oss-cn-beijing.aliyuncs.com/PicLib/test/M_1552115150755.png" width="140">
  </a>
</p>
<p align="center">前端之路,不虚此行</p>

# VueImgsPreview  
[![npm](https://img.shields.io/badge/npm-0.1.9-brightgreen.svg)](https://www.npmjs.com/package/vue-imgs-preview)
![](https://img.shields.io/badge/license-MIT-blue.svg)  

基于vue-cli3的图片预览插件  

`花了一天的时间,抽离了一个业务中的组件。写的不好,请多指教`   

## 预览  

![](https://github.com/MaleWeb/vue-imgs-preview/blob/master/src/assets/vue-imgs-preview.gif)  

## 功能  

+ 图片的拖拽事件  

+ 图片下载功能  

+ 图片左右切换功能

+ 检索Dom内所有图片,添加点击事件  

+ 图片的放大缩小功能,支持鼠标滚轮事件  
  

## Use  

### install 
```
npm install vue-imgs-preview --save  

Vue.use(VueImgsPreview)
```  

### main.js 

```
import VueImgsPreview from 'vue-imgs-preview'
```  
###  App.vue 

```
<img-preview :imgPre="true" :articleId="'Doc'" ></img-preview>
```  

## API  

|参数  | 说明 | 类型 | 默认值 |
|---|---|---|---|
|imgPre | 组件的显示状态| Boolean | false|
|articleId | 文章Dom的ID | String | null |

## About  

有任何问题都可以先Star,后留言;  
加入群一起探索前端世界  

![](https://uufe-web.oss-cn-beijing.aliyuncs.com/PicLib/test/%E5%89%8D%E7%AB%AF%E4%BA%A4%E6%B5%811%E5%8F%B7%E9%98%B5%E8%90%A5%E7%BE%A4%E8%81%8A%E4%BA%8C%E7%BB%B4%E7%A0%81_1552042432817.png)
