"use strict";(self.webpackChunkcom_foxdebug_acode=self.webpackChunkcom_foxdebug_acode||[]).push([[314],{59634:function(e,n,t){t.r(n),t.d(n,{default:function(){return v}});var r=t(89184),a=t.n(r),o=t(30011),s=t(37519),i=t(46677),c=t(71530),l=t(93101),d=t(12921),p=t(58021),u=t(6700),g=t(64413),f=t(38972),v=function(){var e=a()("span",{className:"icon search",attr:{action:"search"},onclick:function(){(0,g.Z)(r.get("#repos"))}}),n=(0,f.Z)("more_vert","toggle-menu"),r=(0,c.Z)("Repositories"),v=s.Z.credentials,h=null,m=u.Z.GitHub().getUser(),Z=cordova.file.externalDataDirectory+".github",b=(0,l.Z)(o.Z.render("<li action='reload'>\r\n  <span class='text'>{{reload}}</span>\r\n  <span class='icon refresh'></span>\r\n</li>",strings),{top:"8px",right:"8px",toggle:n,transformOrigin:"top right"});function k(e){(h=e).map((function(e){var n=e.language,t=e.size,r=e.updated_at;e.size=(t/1024).toFixed(2)+"KB",e.updated_at=new Date(r).toLocaleDateString(),e.language="file_type_".concat((n||"text").toLowerCase())}));var n=a().parse(o.Z.render('<div class="main list" id="repos">\r\n  {{#.}}\r\n  <div class="list-item" data-url="{{html_url}}" action="repo" owner="{{owner.login}}" name="{{name}}" id="{{id}}">\r\n    <span class="octicon main-icon" {{#private}}private{{/private}}></span>\r\n    <div class="container">\r\n      <div class="text">\r\n        <span>{{name}}</span>\r\n      </div>\r\n      <small class="value">\r\n        <div class="group">\r\n          <span class="octicon octicon-star"></span>\r\n          <span class="text">{{watchers}}</span>\r\n        </div>\r\n        <div class="group">\r\n          <span class="octicon octicon-repo-forked"></span>\r\n          <span class="text">{{forks}}</span>\r\n        </div>\r\n        <div class="group">\r\n          <span class="icon file {{language}}"></span>\r\n        </div>\r\n      </small>\r\n    </div>\r\n    <span class="icon open_in_browser" action="open"></span>\r\n  </div>\r\n  {{/.}}\r\n</div>',h));n.addEventListener("click",w),r.body=n,app.append(r),s.Z.showAd(),actionStack.push({id:"repos",action:r.hide}),r.onhide=function(){s.Z.hideAd(),actionStack.pop(),actionStack.remove("repos")},p.Z.loader.destroy()}function w(e){var n=e.target,a=n.getAttribute("action");switch("reload"===a&&b.hide(),a){case"repo":var o=n.getAttribute("name");!function(e,n){t.e(150).then(t.bind(t,41097)).then((function(t){(0,t.default)(e,n)}))}(n.getAttribute("owner"),o);break;case"reload":r.querySelector("#repos").remove(),p.Z.loader.create("Repositories",strings.loading+"..."),y();break;case"open":system.openInBrowser(n.parentElement.getAttribute("data-url"))}}function y(){m.listRepos().then((function(e){var n=e.data,t=v.encrypt(JSON.stringify(n));d.Z.writeFile(Z,t,!0,!1).catch((function(e){toast(strings.error),console.error(e)})),k(n)})).catch((function(e){e.response?(0,i.Z)():console.error(e)})).finally((function(){p.Z.loader.destroy()}))}b.addEventListener("click",w),r.querySelector("header").append(e,n),e.onclick=function(){(0,g.Z)(r.querySelector("#repos"))},p.Z.loader.create("GitHub",strings.loading+"..."),d.Z.readFile(Z).then((function(e){var n=v.decrypt(s.Z.decodeText(e.data));k(JSON.parse(n))})).catch((function(e){y()}))}}}]);