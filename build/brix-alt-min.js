KISSY.add("brix/app",function(a,b,c){function d(){d.superclass.constructor.call(this)}a.extend(d,a.Base),d.ATTRS={prepared:!1},a.augment(d,b,{boot:function(){return this.prepare(),c.boot.apply(this,arguments)},bootStyle:function(b){this.prepare(),a.use(this.bxComboStyle().join(","),b)},prepare:function(){this.get("prepared")||(this.bxMapImports(),this.bxMapComponents(),this.bxPackageImports(),this.bxPackageComponents(),this.set("prepared",!0))}});var e=new d;return e},{requires:["brix/app/config","brix/base","base"]}),KISSY.add("brix/app/config",function(a){function b(a){var b=a.split("/");this.version=b[0],this.assets=b[1]||"all"}a.augment(b,{naked:function(a){return!this.requires(a)},requires:function(a){return"all"===this.assets||this.assets===a},toString:function(){return this.version}});var c={configData:{debug:!0,base:".","interface":"zuomo",imports:{},components:null,namespace:null,timestamp:null},config:function(b,c){var d=this.configData;if(a.isPlainObject(b))c=b,b=null;else if(a.isString(b)){if("undefined"==typeof c)return d[b];var e={};e[b]=c,c=e}return c&&(a.mix(d,c),"components"in c&&this.bxResolveComponents(),"imports"in c&&this.bxResolveImports()),this},bxResolveComponents:function(){var c,d=this.config("components");if(a.isString(d))c=d;else{for(c in d);var e=d[c];if(a.isPlainObject(e))for(var f in e)e[f]=new b(e[f])}this.config("namespace",c)},bxResolveImports:function(){var a=this.config("imports");for(var c in a){var d=a[c];for(var e in d)d[e]=new b(d[e])}},bxMapImports:function(){this.bxMapModules(this.config("imports"))},bxMapComponents:function(){var b=this.config("timestamp"),c=this.config("namespace"),d=this.config("components");if(b&&c){var e=function(a,d,e){return[c,b,d,e].join("/")};a.config("map",[[new RegExp(c+"\\/([^\\/]+)\\/([^\\/]+)$"),e]])}else a.isPlainObject(d)&&this.bxMapModules(d)},bxMapModules:function(b){function c(a){return function(c,d,e){return[a,d,b[a][d],e].join("/")}}var d=[];for(var e in b)d.push([new RegExp(e+"\\/([^\\/]+)\\/([^\\/]+)$"),c(e)]);a.config("map",d)},bxPackageImports:function(){var b=this.config("imports"),c=this.config("base")+"/imports",d=a.config("ignorePackageNameInUri"),e={};for(var f in b)e[f]={base:c+(d?"/"+f:"")};a.config("packages",e)},bxPackageComponents:function(){var b=this.config("namespace"),c=this.config("base"),d=a.config("ignorePackageNameInUri"),e={};e[b]={base:c+(d?"/"+b:"")},a.config("packages",e)},bxComboStyle:function(){var b,c=this.config("imports")||{},d=[],e=function(a,b){for(var c in b)b[c].requires("css")&&d.push([a,c,"index.css"].join("/"))};for(b in c)e(b,c[b]);var f=this.config("components");if(b=this.config("namespace"),f=f[b],a.isPlainObject(f))e(b,f);else if(a.isArray(f))for(var g=0;g<f.length;g++)d.push([b,f[g],"index.css"].join("/"));return d}};return c}),KISSY.add("brix/base",function(a,b,c,d,e,f,g,h,i,j,k,l,m){var n=a.noop,o=a.DOM,p=["remove","empty"],q=l.extend({initializer:function(){var b=this,c=b.get("el");b.set("id",c.attr("id"),{silent:!0}),b.get("name")||b.set("name",c.attr("bx-name"),{silent:!0});var d=new k.Defer,e=d.promise;e=e.then(function(){return b.bxGetTpl()}).then(function(){return b.bxAfterGetTpl()}).then(function(){return b.bxBuildTpl()}).then(function(){return b.bxGetData()}).then(function(){return b.bxAfterGetData()}).then(function(){return b.bxBuildData()}).then(function(){return b.bxRender()}),b.get("passive")||e.then(function(){return b.bxActivate()}),a.later(function(){d.resolve(!0)},0)},bind:n,sync:n,bxGetTpl:function(){var a=new k.Defer,b=this;return b.bxHandleTpl(function(b){a.resolve(b)}),a.promise.then(function(a){b.set("tpl",a)}),a.promise},bxAfterGetTpl:function(){var a=this,b=new k.Defer,c=a.fire("getTpl",{next:function(a){b.resolve(a)}});return b.promise.then(function(b){a.set("tpl",b)}),c?b.promise:void 0},bxBuildTpl:function(){return this.bxIBuildTpl?this.bxIBuildTpl():void 0},bxGetData:function(){var a=new k.Defer,b=this;return b.bxHandleRemote(function(b){a.resolve(b)}),a.promise.then(function(a){b.set("data",a)}),a.promise},bxAfterGetData:function(){var a=new k.Defer,b=this,c=b.fire("getData",{next:function(b){a.resolve(b)}});return a.promise.then(function(a){b.set("data",a)}),c?a.promise:void 0},bxBuildData:function(){var a=this,b=a.get("data");return b?!0:void 0},bxRender:function(){var b=this;if(b.get("autoRender")&&!b.get("rendered")){var c=new k.Defer;b.fire("beforeRender");var d=b.get("tpl"),e=b.get("el");if(d){var f=a.trim(b.bxRenderTpl(d,b.get("data")));e.html(f)}return b.bxDelegate(),b.once("rendered",function(){b.fire("afterRender"),c.resolve()}),b.bxHandleName(e,function(){b.setInternal("rendered",!0),b.fire("rendered")}),c.promise}},bxRenderTpl:function(a,b){var c=this,d=c.get("TplEngine");return"function"==typeof d?new d(a).render(b):d.render(a,b)},bxActivate:function(){function b(){d.setInternal("ready",!0),d.fire("ready")}function c(){++g===f&&b()}var d=this;if(d.get("autoActivate")&&!d.get("activated")&&d.get("rendered")){d.bxBind(),d.bxSync(),d.bxIActivate&&d.bxIActivate(),d.setInternal("activated",!0);for(var e=d.get("children"),f=e.length,g=0,h=0;h<e.length;h++){var i=e[h];i.once("ready",c),i.bxActivate()}e&&0!==e.length||a.later(b,0)}},bxBind:function(){var a=this;a.fire("beforeBind"),a.constructor.superclass.bindInternal.call(a),a.callMethodByHierarchy("bind","__bind"),a.fire("afterBind")},bxSync:function(){var a=this;a.fire("beforeSync"),q.superclass.syncInternal.call(a),a.callMethodByHierarchy("sync","__sync"),a.fire("afterSync")},destructor:function(){var b,c=this,d=c.get("children");for(b=d.length-1;b>=0;b--)d[b].destroy();c.set("children",[]);var e=c.get("parent");if(e){var f=e.get("children"),g=c.get("id");for(b=f.length-1;b>=0;b--)if(f[b].get("id")===g){f.splice(b,1);break}}if(c.get("rendered")){var h=c.get("el");if(c.bxUndelegate(),h&&o.contains(document,h[0])){var i=c.get("destroyAction");a.inArray(i,p)&&h[i]()}}c.set("destroyed",!0)},boot:function(){return this.constructor.boot.apply(this,arguments)},fire:function(a,b,c){var d=q.superclass.fire.apply(this,arguments),e=this.get("parent");if(e)if(c=c||this,c===this){var f="#"+c.get("id")+"_"+a,g=c.get("name")+"_"+a;e.fire(f,b,c),e.fire(g,b,c)}else e.fire(a,b,c);return d},once:function(a,b,c){var d=this,e=function(){d.detach(a,e),b.apply(this,arguments)};d.on(a,e,c)}},{ATTRS:a.mix({tpl:{value:null},data:{value:null},rendered:{value:!1},activated:{value:!1},el:{getter:function(b){return a.isString(b)&&(b=a.one(b)),b},setter:function(b){if(a.isString(b)&&(b=a.one(b)),!b.attr("id")){for(var c;(c=a.guid("brix-brick-"))&&a.one("#"+c););b.attr("id",c)}return"#"+b.attr("id")}},id:{value:null},name:{value:null},autoRender:{value:!0},autoActivate:{value:!0},passive:{value:!1},config:{value:{}},TplEngine:{value:m},destroyed:{value:!1},destroyAction:{value:"remove"},events:{},children:{value:[]},parent:{value:!1}},c.ATTRS)},"Brick");return a.augment(q,d,e,f,g,h,i,j,c.METHODS),a.mix(q,{boot:function(b,c){var d;if(a.isPlainObject(b)?b.el?(c=null,d=b):d={data:b,el:"[bx-app]"}:d=a.isString(b)?{el:b,data:c}:{},b=d.el,(!b||a.isString(b))&&(b=a.one(b||"[bx-app]")),!b)throw new Error("Cannot find el!");d.el=b,d.parent=this;var e=this.get("children");e||(e=[],this.set("children",e));var f=new q(d);return e.push(f),f}}),q},{requires:["brix/app/config","brix/interface/index","brix/core/bx-util","brix/core/bx-tpl","brix/core/bx-name","brix/core/bx-event","brix/core/bx-delegate","brix/core/bx-config","brix/core/bx-remote","promise","rich-base","xtemplate","node","event","sizzle"]}),KISSY.add("brix/core/bx-config",function(a){var b={bxHandleConfig:function(a,b){var c=a.attr("bx-config");return c?new Function("return "+c)():{}},bxCastString:function(b){return b=a.trim(b),/^(?:true|false)$/.test(b)?"true"===b:/^\d+$/.test(b)?parseInt(b,10):b}};return b}),KISSY.add("brix/core/bx-delegate",function(){var a={delegate:function(a,b,c,d){this.on(a+"_"+b,c,d)},undelegate:function(a,b,c,d){this.detach(a+"_"+b,c,d)}};return a},{requires:["event"]}),KISSY.add("brix/core/bx-event",function(a){var b={bxDelegate:function(){for(var a=this.constructor;a;)this.bxDelegateMap(a.EVENTS),a=a.superclass?a.superclass.constructor:null;var b=this.get("events");b&&this.bxDelegateMap(b)},bxDelegateMap:function(b){var c=this.get("el"),d=a.Event;for(var e in b){var f=b[e];for(var g in f){var h=f[g];"self"===e?c.on(g,h,this):"window"===e?d.on(window,g,h,this):"body"===e?d.on("body",g,h,this):"document"===e?d.on(document,g,h,this):c.delegate(g,e,h,this)}}},bxUndelegate:function(){for(var a=this.constructor;a;)this.bxUndelegateMap(a.EVENTS),a=a.superclass?a.superclass.constructor:null;var b=this.get("events");b&&this.bxUndelegateMap(b)},bxUndelegateMap:function(b){var c=this.get("el"),d=a.Event;for(var e in b){var f=b[e];for(var g in f){var h=f[g];"self"===e?c.detach(g,h,this):"window"===e?d.detach(window,g,h,this):"body"===e?d.detach("body",g,h,this):"document"===e?d.detach(document,g,h,this):c.undelegate(g,e,h,this)}}}};return b},{requires:["event"]}),KISSY.add("brix/core/bx-name",function(a,b){var c={bxHandleName:function(c,d,e){c=b(c);var f,g,h,i=this.bxDirectChildren(c),j=this.get("children")||[];for(f=i.length-1;f>=0;f--)for(h=i[f],g=0;g<j.length;g++)j[g].get("id")===h.attr("id")&&i.splice(f,1);var k=0,l=0,m=this,n=i.length;if(0===n)a.later(function(){d(),e&&e()},0);else{var o,p=[],q=function(){++k===n&&d()},r=e&&function(){++l===n&&e()};for(f=0;n>f;f++)h=b(i[f]),o=h.hasAttr("bx-naked")&&(h.attr("bx-naked")||"all"),p[f]="js"===o||"all"===o?"brix/base":h.attr("bx-name").replace(/\/?$/,"/index");KISSY.use(p.join(","),function(a){var b=a.makeArray(arguments);b.shift();for(var c=0;c<b.length;c++)m.bxInstantiate(i[c],b[c],q,r)})}},bxInstantiate:function(b,c,d,e){var f=this,g=a.DOM,h=function(){d(),e&&e()};if(!a.isFunction(c))return h(),void 0;if(!b||!g.contains(document,b[0]))return h(),void 0;var i=f.bxHandleConfig(b,c),j=b.attr("bx-tag");a.mix(i,{el:b,name:b.attr("bx-name"),parent:f,passive:!e,tag:j,brickTpl:j?f.get("brickTpls")[j].middle:null});for(var k=f;k;){var l=k.get("config");l&&(a.mix(i,l[b.attr("id")]),a.mix(i,l[b.attr("name")])),k=k.get("parent")}var m=new c(i),n=f.get("children");n||(n=[],f.set("children",n)),n.push(m),m.bxRender?(m.once("rendered",d),e&&m.once("ready",e)):h(),b=n=null},bxDirectChildren:function(a,b){var c=[],d=this.get("name");return b=b||"[bx-name]",a.all(b).each(function(a){var b=a.parent("[bx-name]");b&&b.attr("bx-name")!==d||c.push(a)}),c},find:function(a){for(var b=this.get("children"),c=a.indexOf("/")>0,d="#"===a.charAt(0),e=0;e<b.length;e++){var f=b[e];if(c&&f.get("name")===a)return f;if(d&&"#"+f.get("id")===a)return f}}};return c},{requires:["node","sizzle","event"]}),KISSY.add("brix/core/bx-remote",function(a,b,c,d){var e={bxHandleRemote:function(c){var e=this,f=e.get("el"),g=e.get("data");if(g)return c(g);var h=f.attr("bx-remote");if(/^http/.test(h)){var i=new d(h);i.isSameOriginAs(new d(location.href))||e.bxJsonpRemote(i,c)}else{if(!/^\.\//.test(h))return c();var j=e.get("name"),k=j.replace(/\/?$/,"")+h.substr(1);b.config("debug")?e.bxXhrRemote(k,c):a.use(k,function(a,b){c(b)})}},bxJsonpRemote:function(a,b){for(var d,e=a.getQuery(),f=e.keys(),g=0;g<f.length;g++){var h=f[g];if("callback"===h||"callback"===e.get(h)){d=h,e.remove(h);break}}c({dataType:"jsonp",url:a.toString(),jsonp:d,success:b})},bxXhrRemote:function(a,b){if(!/^http/.test(location.href))throw Error("Cannot load data.json via xhr in current mode.");c.get(this.bxResolveModule(a,".json"),b)}};return e},{requires:["brix/app/config","ajax","uri"]}),KISSY.add("brix/core/bx-tpl",function(a,b,c){var d={bxHandleTpl:function(a){var b=this,c=b.get("el"),d=b.get("tpl")||c.attr("bx-tpl");if(d)if("#"===d.charAt(0))b.bxScriptTpl(d,a);else if("."===d)b.bxHereTpl(c,a);else if(/^\.\//.test(d))b.bxRemoteTpl(c.attr("bx-name").replace(/\/?$/,"")+d.substr(1),a);else if("cached"===d){for(var e=!1,f=c;(f=f.parent())&&f!==c;){if(f.attr("bx-each")){e=!0;break}if(f.attr("bx-name"))break}var g=b.get("parent").get("subTplsCache");a(e?g[0]:g.shift())}else a(d);else a()},bxScriptTpl:function(b,c){c(a.one(b).html())},bxHereTpl:function(a,b){b(a.html())},bxRemoteTpl:function(c,d){b.config("debug")?this.bxXhrTpl(c,d):a.use(c,function(a,b){d(b)})},bxXhrTpl:function(a,b){if(!/^http/.test(location.href))throw Error("Cannot load tpl via xhr in current mode.");c.get(this.bxResolveModule(a,".html"),b)}};return d},{requires:["brix/app/config","ajax","node","sizzle"]}),KISSY.add("brix/core/bx-util",function(a,b){var c={bxResolveModule:function(c,d){var e=c.split("/"),f=e.shift(),g=e.shift(),h=e.shift(),i=a.config("packages")[f].base,j=b.config("imports");return new RegExp(f+"\\/?$").test(i)||e.push(f),j&&j[f]?(e.push(g),e.push(j[f][g])):e.push(g),e.push(h+d),i+e.join("/")}};return c},{requires:["brix/app/config"]}),KISSY.add("brix/interface/index",function(){var a={};return a.METHODS={bxIBuildTpl:function(a){var b=this.bxDirectChildren(a),c=this.get("subTplsCache");c||(c=[],this.set("subTplsCache",c));for(var d=0;d<b.length;d++){var e=b[d],f=e.attr("bx-tpl");!e.attr("bx-model")||f&&"."!==f||(c.push(e.html()),e.html(""),e.attr("bx-tpl","cached"))}}},a.ATTRS={subTplsCache:{value:[]}},a}),KISSY.add("brix/interface/index",function(a,b,c,d){var e={zuomo:c,yicai:d};return e[b.config("interface")]},{requires:["brix/app/config","brix/interface/if-zuomo","brix/interface/if-yicai"]});