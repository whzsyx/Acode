"use strict";(self.webpackChunkcom_foxdebug_acode=self.webpackChunkcom_foxdebug_acode||[]).push([[753],{96691:function(e,t,n){t.Z=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];n.e(235).then(n.bind(n,7223)).then((function(e){e.default.apply(void 0,t)}))}},4204:function(e,t,n){n.r(t),n.d(t,{default:function(){return A}});var r=n(64922),a=n(7449),s=n(76972),i=n.n(s),o=n(89184),c=n.n(o),l=n(30011),p=n(37519),u=n(46677),d=n(71530),g="<div class='main' id='github'>\r\n  <div class='profile'>\r\n    <img src='{{avatar_url}}' alt='avatar' />\r\n    <h2 class='info'>\r\n      <span class='name'>{{name}}</span>\r\n      <small class='login'>{{login}}</small>\r\n    </h2>\r\n    <div class='tags'>\r\n      <span class='tag' data-value='{{followers}}'>followers</span>\r\n      <span class='tag' data-value='{{following}}'>following</span>\r\n      <span class='tag' data-value='{{total_repos}}'>repositories</span>\r\n      <span class='tag' data-value='{{total_gists}}'>gists</span>\r\n    </div>\r\n    <div class='button-container primary'>\r\n      <button action='open' data-value='{{html_url}}'>open in browser</button>\r\n    </div>\r\n  </div>\r\n  <div class='list'>\r\n    <div class='list-item' action='gist'>\r\n      <span class='octicon octicon-gist'></span>\r\n      <div class='container'>\r\n        <span class='text'>Gists</span>\r\n      </div>\r\n    </div>\r\n    <div class='list-item' action='repos'>\r\n      <div class='octicon octicon-repo'></div>\r\n      <div class='container'>\r\n        <span class='text'>Repositories</span>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>",f="<li action='reload'>\r\n  <span class='text'>{{reload}}</span>\r\n  <span class='icon refresh'></span>\r\n</li>\r\n<li action='logout'>\r\n  <span class='text'>{{logout}}</span>\r\n  <span class='icon logout'></span>\r\n</li>",v=n(93101),b=n(58021),h=n(6700),m=function(){n.e(314).then(n.bind(n,59634)).then((function(e){(0,e.default)()}))},x=n(96691),y=n(70559),Z=n(84734),w=n(38972);function k(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function O(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?k(Object(n),!0).forEach((function(t){(0,r.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):k(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function _(){return _=(0,a.Z)(i().mark((function e(t){var n,r,s,o,k,_,A,S,j,P,E,D,G,T,R,F,L,N,C;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return C=function(){return(C=(0,a.Z)(i().mark((function e(t){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return localStorage.username&&delete localStorage.username,localStorage.password&&delete localStorage.password,localStorage.token&&delete localStorage.token,e.prev=3,e.next=6,(0,y.Z)(S).delete();case 6:return e.next=8,(0,y.Z)(A).delete();case 8:e.next=12;break;case 10:e.prev=10,e.t0=e.catch(3);case 12:t&&t();case 13:case"end":return e.stop()}}),e,null,[[3,10]])})))).apply(this,arguments)},N=function(e){return C.apply(this,arguments)},L=function(e){var t,n;return e&&(e.total_repos=(null!==(t=e.total_private_repos)&&void 0!==t?t:0)+e.public_repos,e.total_gists=(null!==(n=e.private_gists)&&void 0!==n?n:0)+e.public_gists),c().parse(l.Z.render(g,O(O({},strings),e)))},F=function(){return(F=(0,a.Z)(i().mark((function e(n){var r,a,s,c,l;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return b.Z.loader.create("GitHub",strings.loading+"..."),e.prev=1,e.next=4,_.getProfile();case 4:return r=e.sent,a=r.data,s=o.encrypt(JSON.stringify(a)),e.prev=7,c=(0,y.Z)(S),e.next=11,c.exists();case 11:if(e.sent){e.next=15;break}return l=(0,y.Z)(DATA_STORAGE),e.next=15,l.createFile(".git");case 15:return e.next=17,c.writeFile(s);case 17:e.next=21;break;case 19:e.prev=19,e.t0=e.catch(7);case 21:"function"==typeof n?n(a):T(a),e.next=27;break;case 24:e.prev=24,e.t1=e.catch(1),e.t1.response.data?(console.error(e.t1.response.data.message),401===e.t1.response.status&&N(),t?t.setMessage(e.t1.response.data.message):(0,u.Z)()):(t&&t.setMessage(e.t1.response.statusText),N());case 27:b.Z.loader.destroy();case 28:case"end":return e.stop()}}),e,null,[[1,24],[7,19]])})))).apply(this,arguments)},R=function(e){return F.apply(this,arguments)},T=function(e){n||(n=(0,d.Z)("Github"));var a=L(e);n.body=a,n.header.append(r,s),app.append(n),p.Z.showAd(),actionStack.push({id:"github",action:function(){p.Z.hideAd(),n.hide()}}),a.addEventListener("click",G),t&&t.hide()},G=function(e){var t=e.target,r=t.getAttribute("action");switch(["logout","reload"].includes(r)&&j.hide(),r){case"logout":N((function(){toast(strings.success),n.hide()}));break;case"gist":(0,x.Z)();break;case"repos":m();break;case"reload":R((function(e){var t=c().get("#github");t&&t.remove(),t=L(e),n.body=t,t.addEventListener("click",G)}));break;case"open":system.openInBrowser(t.getAttribute("data-value"))}},r=c()("span",{className:"icon search hidden"}),s=(0,w.Z)("more_vert","toggle-menu"),o=p.Z.credentials,k=h.Z.GitHub(),_=k.getUser(),A=Z.Z.join(DATA_STORAGE,".github"),S=Z.Z.join(DATA_STORAGE,".git"),(j=(0,v.Z)(l.Z.render(f,strings),{top:"8px",right:"8px",toggle:s,transformOrigin:"top right"})).addEventListener("click",G),P=(0,y.Z)(S),e.next=19,P.exists();case 19:if(!e.sent){e.next=27;break}return e.next=22,P.readFile("utf-8");case 22:E=e.sent,D=p.Z.credentials.decrypt(E),T(p.Z.parseJSON(D)),e.next=28;break;case 27:R();case 28:case"end":return e.stop()}}),e)}))),_.apply(this,arguments)}var A=function(e){return _.apply(this,arguments)}}}]);