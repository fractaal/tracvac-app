if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let c=Promise.resolve();return f[e]||(c=new Promise(async c=>{if("document"in self){const f=document.createElement("script");f.src=e,document.head.appendChild(f),f.onload=c}else importScripts(e),c()})),c.then(()=>{if(!f[e])throw new Error(`Module ${e} didn’t register its module`);return f[e]})},c=(c,f)=>{Promise.all(c.map(e)).then(e=>f(1===e.length?e[0]:e))},f={require:Promise.resolve(c)};self.define=(c,a,i)=>{f[c]||(f[c]=Promise.resolve().then(()=>{let f={};const n={uri:location.origin+c.slice(1)};return Promise.all(a.map(c=>{switch(c){case"exports":return f;case"module":return n;default:return e(c)}})).then(e=>{const c=i(...e);return f.default||(f.default=c),f})}))}}define("./service-worker.js",["./workbox-e170c028"],(function(e){"use strict";e.setCacheNameDetails({prefix:"tracvac"}),self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),e.precacheAndRoute([{url:"css/app.d456b9d6.css",revision:"adcfa0931804ca5743808377de582a35"},{url:"css/vendor.9d41eac4.css",revision:"24c23598696015b46a556bb58750ed11"},{url:"favicon.ico",revision:"d4c7cf87eef35d8dcf0fb96e5a2604a7"},{url:"fonts/Eva-Icons.2f2b9626.woff",revision:"a5ee087912cbedb6022426ea0b41f8bd"},{url:"fonts/Eva-Icons.ac165c67.woff2",revision:"cae252678f70ff0200acde68a6e74640"},{url:"fonts/KFOkCnqEu92Fr1MmgVxIIzQ.a45108d3.woff",revision:"5cb7edfceb233100075dc9a1e12e8da3"},{url:"fonts/KFOlCnqEu92Fr1MmEU9fBBc-.cea99d3e.woff",revision:"87284894879f5b1c229cb49c8ff6decc"},{url:"fonts/KFOlCnqEu92Fr1MmSU5fBBc-.865f928c.woff",revision:"b00849e00f4c2331cddd8ffb44a6720b"},{url:"fonts/KFOlCnqEu92Fr1MmWUlfBBc-.2267169e.woff",revision:"adcde98f1d584de52060ad7b16373da3"},{url:"fonts/KFOlCnqEu92Fr1MmYUtfBBc-.bac8362e.woff",revision:"bb1e4dc6333675d11ada2e857e7f95d7"},{url:"fonts/KFOmCnqEu92Fr1Mu4mxM.49ae34d4.woff",revision:"60fa3c0614b8fb2f394fa29944c21540"},{url:"fonts/fa-brands-400.5f63cb7f.woff",revision:"0ce1e868452204695c8ac1c70f693c2d"},{url:"fonts/fa-brands-400.6e63bd22.woff2",revision:"0c9f225e8f69c622f681cf1ed973cc3d"},{url:"fonts/fa-regular-400.2c154b0f.woff2",revision:"847712aaabbeba674afdda86d31cab17"},{url:"fonts/fa-regular-400.ea5a41ec.woff",revision:"3cace4a04d941b5981ba32c6ce9afae1"},{url:"fonts/fa-solid-900.3eb06c70.woff2",revision:"9ae050d1876ac1763eb6afe4264e6d5a"},{url:"fonts/fa-solid-900.f4f93856.woff",revision:"4bfbf7eb4b19d9ff9293eb177b6d0070"},{url:"fonts/flUhRq6tzZclQEJ-Vdg-IuiaDsNa.7caf6de9.woff",revision:"c1d575ed729b4007f2f23f895c33eacb"},{url:"fonts/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.af57769d.woff2",revision:"1a889d427d84d3c1282319e2857b5028"},{url:"fonts/harabara.9840b64b.otf",revision:"a0d8e2d6b8b8bc47662d338f22b1930e"},{url:"fonts/ionicons.175f391f.woff2",revision:"96f1c901c087fb64019f7665f7f8aca6"},{url:"fonts/ionicons.bf69b013.woff",revision:"99b863497156d4478ec3489fefb3815c"},{url:"icons/apple-icon-120x120.png",revision:"bc09a1d8d7bf98e2fdb313106ce4a7bc"},{url:"icons/apple-icon-152x152.png",revision:"16f0e7f1e3cf319edb107976cab732f2"},{url:"icons/apple-icon-167x167.png",revision:"a2c9875c2da2efb6495120ccc579c57e"},{url:"icons/apple-icon-180x180.png",revision:"69fb789f3a39b778551822e54b98e2c2"},{url:"icons/apple-launch-1125x2436.png",revision:"97f6771c96f84eea7692eea2faaef813"},{url:"icons/apple-launch-1242x2208.png",revision:"b68402a31f58fdcab36d635288a13f04"},{url:"icons/apple-launch-1242x2688.png",revision:"6458b2e2d4ec65e9ccf34afc4c2e46f3"},{url:"icons/apple-launch-1536x2048.png",revision:"bc4bf011e3d26976111a2550fc155bf3"},{url:"icons/apple-launch-1668x2224.png",revision:"57362cd6455c48e0a64127fe9f3d8f73"},{url:"icons/apple-launch-1668x2388.png",revision:"8ee01393c80d306a9d3f185b4935d1ee"},{url:"icons/apple-launch-2048x2732.png",revision:"912aa5fb14b23fe9365526558e4b32d6"},{url:"icons/apple-launch-640x1136.png",revision:"199cf647b9ead0ee6f1a3095bca17dd7"},{url:"icons/apple-launch-750x1334.png",revision:"0db4ebe01cbf1fdcca3dbdca6443a09b"},{url:"icons/apple-launch-828x1792.png",revision:"c9459cc2b936ab3ddee634ef6bb34836"},{url:"icons/favicon-128x128.png",revision:"9f22d3c0b4fb11b71ce54aacf0d516b5"},{url:"icons/favicon-16x16.png",revision:"181d649ee5be38afeb69f694141d05be"},{url:"icons/favicon-32x32.png",revision:"00ba69ca1bea7f0621af39b00661fc04"},{url:"icons/favicon-96x96.png",revision:"342aee62c11b511e510f26fc6abc908c"},{url:"icons/icon-128x128.png",revision:"9f22d3c0b4fb11b71ce54aacf0d516b5"},{url:"icons/icon-192x192.png",revision:"048c3443fe4151ab4bcb90c95d770d0a"},{url:"icons/icon-256x256.png",revision:"e5ddab7382a50bf98ddb77d4447d73aa"},{url:"icons/icon-384x384.png",revision:"042be16f56aa80700c0445c8f917970a"},{url:"icons/icon-512x512.png",revision:"487161fdfa66f40972bc6768401b1cfe"},{url:"icons/ms-icon-144x144.png",revision:"91e57dc6e82ae2330f9aa2cd3a0b652d"},{url:"icons/safari-pinned-tab.svg",revision:"44b1f9a5f74ce9d2ca4582716c6e3bab"},{url:"img/tracvac-logo.b2ac70dc.png",revision:"0cb2c2489171e43ae5bf9ac42209813e"},{url:"index.html",revision:"9cfdc331f32ba8db3e1ee56c1969dc99"},{url:"js/1.ebc55627.js",revision:"c04b9341fc3ed59ba79814ae5bb12ad1"},{url:"js/10.8889fe63.js",revision:"3abacd45958eb7e876cabcb09d09a26b"},{url:"js/11.a1d63ca5.js",revision:"77183bbe30ced7244e3a1b9cc97e288e"},{url:"js/12.04cc5386.js",revision:"d79f0d33a5d027065b778fd183e9bfd9"},{url:"js/13.67ad8238.js",revision:"05fb380b7d98b5e7f84058063240eec9"},{url:"js/14.c5bfb2f8.js",revision:"38e3994a3d191fce72ea4103ecfc6e77"},{url:"js/15.8dc16549.js",revision:"7716948402b0f1bbc80276dde747ee3d"},{url:"js/16.228639b7.js",revision:"49dd25c04f04e830c1af955365e03077"},{url:"js/17.9dfa5fa4.js",revision:"6f2cbf17f69ea69bc83be572524680be"},{url:"js/18.907f9997.js",revision:"5eac5c14a004ead794b2ea752adb76e7"},{url:"js/3.b11938ce.js",revision:"b596086c2c33e3f2027da75a1a0ac282"},{url:"js/4.196ef1b7.js",revision:"d66c1ffde8a8d498e14d9ca9505f2aac"},{url:"js/5.b0bd99a2.js",revision:"faece8d887d8ef639c76a6d9f497271c"},{url:"js/6.d993c349.js",revision:"ea49ffec16c254b6676bb3215463fe88"},{url:"js/7.a6d4c76b.js",revision:"d307ac333919f678149558a6724e09a8"},{url:"js/8.41c26002.js",revision:"d74271af74571aa0d9070f92772346aa"},{url:"js/9.ba62197f.js",revision:"e59768e29c2727d77a33be3351d89758"},{url:"js/app.ca3bdfb5.js",revision:"fa4821e504146b1f6b8a1c0c7e95c9a8"},{url:"js/vendor.0d6a8c09.js",revision:"c3a61500e0da0483513c20d949476a3c"},{url:"manifest.json",revision:"18a4d3fd6e067bdcdaa3ea40849a9574"},{url:"profile-placeholder.png",revision:"eb2b82c57dda81c9aa7546a27b8399c1"}],{}),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"),{denylist:[/service-worker\.js$/,/workbox-(.)*\.js$/]}))}));
