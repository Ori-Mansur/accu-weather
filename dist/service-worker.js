if(!self.define){let e,r={};const c=(c,s)=>(c=new URL(c+".js",s).href,r[c]||new Promise((r=>{if("document"in self){const e=document.createElement("script");e.src=c,e.onload=r,document.head.appendChild(e)}else e=c,importScripts(c),r()})).then((()=>{let e=r[c];if(!e)throw new Error(`Module ${c} didn’t register its module`);return e})));self.define=(s,t)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(r[n])return;let i={};const o=e=>c(e,n),u={module:{uri:n},exports:i,require:o};r[n]=Promise.all(s.map((e=>u[e]||o(e)))).then((e=>(t(...e),i)))}}define(["./workbox-f3ddde50"],(function(e){"use strict";e.setCacheNameDetails({prefix:"weather"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/accu-weather/404.html",revision:"556a7ef31bd7e15a0ca8dc8003f6f1d8"},{url:"/accu-weather/css/chunk-vendors.bb472c33.css",revision:null},{url:"/accu-weather/index.html",revision:"af1b454facee00be74ae8f7fda24a367"},{url:"/accu-weather/js/360.6d6e2c1e.js",revision:null},{url:"/accu-weather/js/app.4c8ff4f0.js",revision:null},{url:"/accu-weather/js/chunk-vendors.68a6fc77.js",revision:null},{url:"/accu-weather/manifest.json",revision:"458234fc6be47cef7c9146de12cc7556"},{url:"/accu-weather/robots.txt",revision:"735ab4f94fbcd57074377afca324c813"}],{})}));
//# sourceMappingURL=service-worker.js.map
