(function(){"use strict";var t={8080:function(t,e,r){var n=r(144),a=r(998),s=r(6232),i=r(8974),o=r(266),l=r(2118),c=r(3059),u=r(6733),f=r(1713),d=r(7423),h=r(3687),p=r(7953),v=function(){var t=this,e=t._self._c;return e(a.Z,{attrs:{id:"inspire"}},[t.screenWidth<700?e(u.Z,{attrs:{app:""},model:{value:t.leftDrawer,callback:function(e){t.leftDrawer=e},expression:"leftDrawer"}},[e(l.Z,[e("popular-exchanges")],1)],1):t._e(),e(s.Z,{attrs:{app:"",color:"white",flat:""}},[t.screenWidth<700?e("div",[e("div",{staticClass:"d-flex align-center"},[e(i.Z,{on:{click:function(e){t.leftDrawer=!t.leftDrawer}}}),e(p.qW,[t._v("Конвертер валют")])],1)]):e(l.Z,{staticClass:"py-0 fill-height"},[e(p.qW,[t._v("Конвертер валют")]),e(h.Z),e("div",{staticClass:"text-caption"},[t._v(" by "),e("span",[e("a",{attrs:{href:"https://raimondpovetkin.github.io/mysite/"}},[t._v("Raimond Povetkin")])])])],1)],1),e(c.Z,{staticClass:"grey lighten-3"},[e(l.Z,[e(f.Z,[t.screenWidth>700?e(o.Z,{attrs:{cols:"3"}},[e(d.Z,{attrs:{rounded:"lg"}},[e("popular-exchanges")],1)],1):t._e(),e(o.Z,[e(d.Z,{attrs:{rounded:"lg"}},[e("div",{staticClass:"mx-3 pa-2"},[e("exchange-fields",{attrs:{countriesAll:t.getArr(),defaultCurrency:t.defaultCurrency,defaultRate:t.defaultRate}})],1)])],1)],1)],1)],1)],1)},g=[],y=function(){var t=this,e=t._self._c;return e("div",[t._v(" ПОПУЛЯРНЫЕ ВАЛЮТЫ ")])},m=[],C={name:"PopularExchanges"},b=C,x=r(1001),w=(0,x.Z)(b,y,m,!1,null,"21216a02",null),Z=w.exports,_=r(4324),k=r(7350),R=r(4068),D=function(){var t=this,e=t._self._c;return e("div",[t._v(" По курсу ЦБ на сегодня: "),e("div",{staticClass:"flex"},[e("div",{staticClass:"field-block"},[e(R.Z,{staticClass:"text-field",attrs:{outlined:""},model:{value:t.valueFrom,callback:function(e){t.valueFrom=e},expression:"valueFrom"}}),e(k.Z,{staticClass:"select",attrs:{outlined:"",items:t.getNormalizeCountries},on:{change:t.setRateCurrency},scopedSlots:t._u([{key:"item",fn:function({item:r}){return[e("div",{staticClass:"currency-flag",class:["currency-flag-"+r.toLowerCase()]}),e("span",{staticClass:"pl-3"},[t._v(" "+t._s(r)+" ")])]}},{key:"selection",fn:function({item:r}){return[e("div",{staticClass:"item-flag"},[e("span",{staticClass:"text-sm-body-2 pl-3 text-country"},[t._v(" "+t._s(r)+" ")]),e("div",{staticClass:"currency-flag ml-2",class:["currency-flag-"+r.toLowerCase()]})])]}}]),model:{value:t.fromCurrency,callback:function(e){t.fromCurrency=e},expression:"fromCurrency"}})],1),e(_.Z,{staticClass:"pb-7 px-2 icon",attrs:{large:""}},[t._v(" mdi-swap-horizontal ")]),e("div",{staticClass:"field-block"},[e(R.Z,{staticClass:"text-field",attrs:{outlined:"",value:t.value}}),e(k.Z,{staticClass:"select",attrs:{outlined:"",items:t.getNormalizeCountries},on:{change:t.setRateCurrency},scopedSlots:t._u([{key:"item",fn:function({item:r}){return[e("div",{staticClass:"currency-flag",class:["currency-flag-"+r.toLowerCase()]}),e("span",{staticClass:"pl-3"},[t._v(" "+t._s(r)+" ")])]}},{key:"selection",fn:function({item:r}){return[e("div",{staticClass:"item-flag"},[e("span",{staticClass:"text-sm-body-2 pl-3 text-country"},[t._v(" "+t._s(r)+" ")]),e("div",{staticClass:"currency-flag ml-2",class:["currency-flag-"+r.toLowerCase()]})])]}}]),model:{value:t.toCurrency,callback:function(e){t.toCurrency=e},expression:"toCurrency"}})],1)],1)])},O=[],S=r(9669),F=r.n(S),A={name:"ExchangeFields",props:{countriesAll:Object,defaultCurrency:String,defaultRate:Number},data:()=>({rate:null,valueFrom:1,valueTo:null,fromCurrency:"USD",toCurrency:"USD",countries:[]}),mounted(){this.getArray(),this.rate=this.defaultRate,this.$nextTick((()=>{this.toCurrency=this.defaultCurrency}))},computed:{getNormalizeCountries(){return this.countries.map((t=>t.substring(0,3))).filter((t=>t))},value(){return this.rate?this.valueFrom*this.rate:this.valueFrom*this.defaultRate}},methods:{async setRateCurrency(){await F().get(`https://api.apilayer.com/exchangerates_data/convert?to=${this.toCurrency}&from=${this.fromCurrency}&amount=1`,{params:{apikey:"NGeUgFDVU38V1hvgSnMokm7ZMg8Go6F4"}}).then((t=>{this.rate=t.data.result})).catch((t=>{console.log(t)}))},getArray(){this.countries=Object.values(this.countriesAll).map((t=>t.currency))}}},j=A,z=(0,x.Z)(j,D,O,!1,null,"71c2fbc2",null),P=z.exports,U=r(3590),W=r.n(U),L={name:"app",data:()=>({leftDrawer:null,screenWidth:null,defaultCurrency:null,defaultRate:null}),components:{popularExchanges:Z,exchangeFields:P},methods:{getArr(){return W().countries},getLocalCurrency(){const t=this.getAlpha2Country(window.navigator.language);this.defaultCurrency=W().countries[t]?.currency.substring(0,3)||"USD"},getAlpha2Country(t){return/[A-Z]/.test(t)?t.replace(/[^A-Z]+/g,""):t.toUpperCase()},async getDefaultRate(){await F().get(`https://api.apilayer.com/exchangerates_data/convert?to=${this.defaultCurrency}&from=USD&amount=1`,{params:{apikey:"NGeUgFDVU38V1hvgSnMokm7ZMg8Go6F4"}}).then((t=>{this.defaultRate=t.data.result})).catch((t=>{console.log(t)}))},onResize(){this.screenWidth=window.innerWidth}},mounted(){this.screenWidth=window.screen.width,this.$nextTick((()=>{window.addEventListener("resize",this.onResize)})),this.getLocalCurrency(),this.getDefaultRate()},beforeDestroy(){window.removeEventListener("resize",this.onResize)}},T=L,M=(0,x.Z)(T,v,g,!1,null,null,null),E=M.exports,N=r(1705);n.ZP.use(N.Z);var $=new N.Z({});n.ZP.config.productionTip=!1,new n.ZP({vuetify:$,render:t=>t(E)}).$mount("#app")}},e={};function r(n){var a=e[n];if(void 0!==a)return a.exports;var s=e[n]={exports:{}};return t[n].call(s.exports,s,s.exports,r),s.exports}r.m=t,function(){var t=[];r.O=function(e,n,a,s){if(!n){var i=1/0;for(u=0;u<t.length;u++){n=t[u][0],a=t[u][1],s=t[u][2];for(var o=!0,l=0;l<n.length;l++)(!1&s||i>=s)&&Object.keys(r.O).every((function(t){return r.O[t](n[l])}))?n.splice(l--,1):(o=!1,s<i&&(i=s));if(o){t.splice(u--,1);var c=a();void 0!==c&&(e=c)}}return e}s=s||0;for(var u=t.length;u>0&&t[u-1][2]>s;u--)t[u]=t[u-1];t[u]=[n,a,s]}}(),function(){r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,{a:e}),e}}(),function(){r.d=function(t,e){for(var n in e)r.o(e,n)&&!r.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})}}(),function(){r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){var t={143:0};r.O.j=function(e){return 0===t[e]};var e=function(e,n){var a,s,i=n[0],o=n[1],l=n[2],c=0;if(i.some((function(e){return 0!==t[e]}))){for(a in o)r.o(o,a)&&(r.m[a]=o[a]);if(l)var u=l(r)}for(e&&e(n);c<i.length;c++)s=i[c],r.o(t,s)&&t[s]&&t[s][0](),t[s]=0;return r.O(u)},n=self["webpackChunktestexchange"]=self["webpackChunktestexchange"]||[];n.forEach(e.bind(null,0)),n.push=e.bind(null,n.push.bind(n))}();var n=r.O(void 0,[998],(function(){return r(8080)}));n=r.O(n)})();
//# sourceMappingURL=app.04d8ed17.js.map