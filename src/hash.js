//using browserify we bundle our js on npm run build to ./public/bundle.js,so browser can understand require()and import..
//it import all file need from node_modules to bundle.js
// we know browser understand vallina js only
//we have to do each time after save npm build to build bundle,js
//so,instead of it e use watchify it do same but it create an server that on each save bundle index.js --> bundle.js

// import MD5 from "crypto-js/md5";
const MD5 = require("crypto-js/md5"); 
var TIMESTAMP=1;//Math.random() *100;//timestamp
console.log(TIMESTAMP);
var PRIVATE_KEY="eba1f161c14245da22396eb3dc2d2c34f51b5ddb";
var PUBLIC_KEY='0f21d3585d27145062e0abfbbb35ace0';
var hashValue = MD5(TIMESTAMP+PRIVATE_KEY+PUBLIC_KEY).toString();//global variable /direct key window(global obj)
console.log(hashValue);