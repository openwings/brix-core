KISSY.add("brix/app",function(a,b,c,d){var e={bootStyle:function(b){a.use(this.bxComboStyle().join(","),b)},bxChildren:[]};return a.mix(e,b),a.mix(e,c),a.mix(e,d),e},{requires:["brix/app/config","brix/core/bx-api","brix/core/bx-third","brix/third/index","brix/base"]}),KISSY.add("brix/app/config",function(a){function b(a){var b=a.split("/");this.version=b[0],this.assets=b[1]||"all"}a.augment(b,{naked:function(a){return!this.requires(a)},requires:function(a){return"all"===this.assets||this.assets===a},toString:function(){return this.version}});var c={configData:{debug:!0,base:".",imports:{},importsBase:"http://g.tbcdn.cn/thx/m",components:null,namespace:null,timestamp:null},config:function(b,c){var d=this.configData;if(a.isPlainObject(b))c=b,b=null;else if(a.isString(b)){if("undefined"==typeof c)return d[b];var e={};e[b]=c,c=e}return c&&(a.mix(d,c),"components"in c&&this.bxResolveComponents(),"imports"in c&&this.bxResolveImports()),this},bxResolveComponents:function(){var c,d=this.config("components");if(a.isString(d))c=d;else{for(c in d);var e=d[c];if(a.isPlainObject(e))for(var f in e)e[f]=new b(e[f])}this.config("namespace",c),this.bxPackageComponents(),this.bxMapComponents()},bxResolveImports:function(){var a=this.config("imports");for(var c in a){var d=a[c];for(var e in d)d[e]=new b(d[e])}this.bxPackageImports(),this.bxMapImports()},bxMapImports:function(){this.bxMapModules(this.config("imports"))},bxMapComponents:function(){var b=this.config("timestamp"),c=this.config("namespace"),d=this.config("components");if(b&&c){var e=function(a,d,e){return[c,b,d,e].join("/")};a.config("map",[[new RegExp(c+"\\/([^\\/]+)\\/([^\\/]+)$"),e]])}else a.isPlainObject(d)&&this.bxMapModules(d)},bxMapModules:function(b){function c(a){return function(c,d,e){return[a,d,b[a][d],e].join("/")}}var d=[];for(var e in b)d.push([new RegExp(e+"\\/([^\\/]+)\\/([^\\/]+)$"),c(e)]);a.config("map",d)},bxPackageImports:function(){var b=this.config("imports"),c=this.config("importsBase"),d=a.config("ignorePackageNameInUri"),e={};for(var f in b)e[f]={base:c+(d?"/"+f:"")};a.config("packages",e)},bxPackageComponents:function(){var b=this.config("namespace");if(!a.config("packages")[b]){var c=this.config("base"),d=a.config("ignorePackageNameInUri"),e={};e[b]={base:c+(d?"/"+b:"")},a.config("packages",e)}},bxComboStyle:function(){var b,c=this.config("imports")||{},d=[],e=function(a,b){for(var c in b)b[c].requires("css")&&d.push([a,c,"index.css"].join("/"))};for(b in c)e(b,c[b]);var f=this.config("components");if(b=this.config("namespace"),f=f[b],a.isPlainObject(f))e(b,f);else if(a.isArray(f))for(var g=0;g<f.length;g++)d.push([b,f[g],"index.css"].join("/"));return d}};return c}),KISSY.add("brix/base",function(a,b,c,d,e,f,g){var h=a.noop,i=["remove","empty"],j=e.extend({initializer:function(){var b=this,c=new d.Defer,e=c.promise;return e=e.then(function(){return b.bxGetData()}).then(function(){return b.bxAfterGetData()}).then(function(){return b.bxBuildData()}).then(function(){return b.bxGetTpl()}).then(function(){return b.bxAfterGetTpl()}).then(function(){return b.bxBuildTpl()}).then(function(){b.fire("initialized")}).then(function(){return b.get("autoRender")?b.bxRender():void 0}).fail(function(a){if("el is removed"!==a.message)throw a}),!b.get("passive")&&b.get("autoActivate")&&e.then(function(){return b.bxActivate()}),a.later(function(){try{b.get("el")&&c.resolve(!0)}catch(a){}},0),b},bind:h,sync:h,bxGetTpl:function(){var a=new d.Defer,b=this;return b.bxHandleTpl(function(c){c&&b.set("tpl",c),a.resolve(c)}),a.promise},bxAfterGetTpl:function(){var a=this,b=new d.Defer,c=a.fire("getTpl",{next:function(c){c&&a.set("tpl",c),b.resolve(c)}});return c?b.promise:void 0},bxBuildTpl:function(){return this.bxIBuildTpl?this.bxIBuildTpl():void 0},bxGetData:function(){var a=new d.Defer,b=this;return b.bxHandleRemote(function(c){c&&b.set("data",c),a.resolve(c)}),a.promise},bxAfterGetData:function(){var a=new d.Defer,b=this,c=b.fire("getData",{next:function(c){c&&b.set("data",c),a.resolve(c)}});return c?a.promise:void 0},bxBuildData:function(){return!0},bxRender:function(){var b=this;if(!b.bxRendering&&!b.bxRendered){b.bxRendering=!0;var c=new d.Defer;b.fire("beforeRender");var e=b.get("tpl"),f=b.get("el");if(e){var g=a.trim(b.bxRenderTpl(e,b.get("data")));f.html(g)}return b.bxDelegate(),b.once("rendered",function(){b.fire("afterRender"),c.resolve()}),b.bxChildren=[],b.bxHandleName(f,function(){delete b.bxRendering,b.bxRendered=!0,b.fire("rendered")}),c.promise}},bxRenderTpl:function(a,b){var c=this,d=c.get("TplEngine");if("function"==typeof d){var e=c.get("commands");return new d(a,{commands:e||{}}).render(b)}return d.render(a,b)},bxActivate:function(){function b(){delete d.bxActivating,d.bxActivated=!0,d.fire("ready")}function c(){++g===f&&b()}var d=this;if(!d.bxActivating&&!d.bxActivated&&d.bxRendered){d.bxActivating=!0,d.bxBind(),d.bxSync(),d.bxIActivate&&d.bxIActivate();var e=d.bxChildren;if(0===e.length)return a.later(function(){b()},0),void 0;for(var f=e.length,g=0,h=0;h<e.length;h++){var i=e[h];d.bxIsBrickInstance(i)?(i.once("ready",c),i.once("destroy",c)):i.bxListenReady(c),i.bxActivate()}}},bxBind:function(){var a=this;a.fire("beforeBind"),a.constructor.superclass.bindInternal.call(a),a.callMethodByHierarchy("bind","__bind"),a.fire("afterBind")},bxSync:function(){var a=this;a.fire("beforeSync"),j.superclass.syncInternal.call(a),a.callMethodByHierarchy("sync","__sync"),a.fire("afterSync")},destructor:function(){var b,c=this,d=c.bxChildren;for(b=d.length-1;b>=0;b--)d[b].bxDestroy();c.bxChildren=[];var e=c.bxParent;if(e){var f=e.bxChildren,h=c.bxId;for(b=f.length-1;b>=0;b--)if(f[b].bxId===h){f.splice(b,1);break}}if(c.bxRendered){var j=c.get("el");if(c.bxUndelegate(),j&&g.contains(document,j[0])){var k=c.get("destroyAction");a.inArray(k,i)&&j[k]()}}}},{ATTRS:a.mix({tpl:{value:null},data:{value:null},activated:{value:!1},el:{getter:function(b){if(a.isString(b)&&(b=a.one(b)),!b)throw new Error("el is removed");return b},setter:function(a){return"#"+this.bxUniqueId(a)}},autoRender:{value:!0},autoActivate:{value:!0},passive:{value:!1},config:{value:{}},TplEngine:{value:f},destroyAction:{value:"none"},events:{}},b.ATTRS)},"Brick");return a.augment(j,c,b.METHODS),j},{requires:["brix/interface/index","brix/core/index","promise","rich-base","xtemplate","dom","node","sizzle"]}),KISSY.add("brix/core/bx-api",function(){var a={boot:function(a,b){return this.bxBoot(a,b)},prepare:function(a,b){return this.bxPrepare(a,b)},one:function(a){return this.bxOne(a)},all:function(a){return this.bxAll(a)},find:function(a){return this.bxFind(a)},where:function(a){return this.bxWhere(a)}};return a}),KISSY.add("brix/core/bx-boot",function(a,b,c){var d="brix/third/index",e={bxBootOptions:function(b,c){var d,e=this;a.isPlainObject(b)?(c=null,d=b):(d={el:b},c&&(d.data=c)),b=a.one(d.el||"[bx-app]");var f,g=e.bxHandleConfig(b),h=e.bxGetBrickAncestor(e);if(a.isArray(g)){for(;h;)f=h.get("config"),f&&(e.bxMixArgument(g,f[b.attr("id")]),e.bxMixArgument(g,f[b.attr("name")])),h=h.bxParent&&e.bxGetBrickAncestor(h.bxParent);d=g}else if(a.isPlainObject(g)){for(a.mix(d,g);h;)f=h.get("config"),f&&(a.mix(d,f[b.attr("id")]),a.mix(d,f[b.attr("name")])),h=h.bxParent&&e.bxGetBrickAncestor(h.bxParent);d.el=b}else d=g;return d},bxBootName:function(a){var b=a.attr("bx-name"),c=a.hasAttr("bx-naked")&&(a.attr("bx-naked")||"all");return b=b&&"all"!==c&&"js"!==c?b.split("/").length>2?b:b+"/index":"brix/base"},bxIBoot:function(b,e,f,g,h){var i=this;i.bxUniqueId(b),b.removeAttr("bx-defer");var j=function(){g&&g(),h&&h()};if(!b||!c.contains(document,b[0]))return j();var k,l=!1,m=a.require(d);a.isFunction(f)?(i.bxIsExtendBrickClass(f)?l=!0:a.augment(f,m),k=a.isArray(e)?i.bxConstruct(f,e):new f(e)):(a.isPlainObject(f)||(f={bxKlass:f}),k=f,a.mix(k,m)),k.bxId=b.attr("id"),k.bxName=b.attr("bx-name"),k.bxChildren=[],k.bxParent=i;var n=i.bxChildren;return n.push(k),l?(g&&k.once("rendered",g),h&&k.once("ready",h),k.once("destroy",j)):(k.bxEl=b,k.bxInit(g,h)),k},bxBootUse:function(a,b){var c=this;KISSY.use(a.join(","),function(a){var d=a.makeArray(arguments);d.shift(),b&&b.call(c,d)})},bxBoot:function(c,d){var e=this,f=e.bxBootOptions(c,d),g=new b.Defer;c=f.el;var h=this.bxFind("#"+c.attr("id"));if(h)a.later(function(){g.resolve(h)});else{var i=this.bxBootName(c);e.bxBootUse([i],function(a){var b=e.bxIBoot(c,f,a[0]);g.resolve(b)})}return g.promise},bxPrepare:function(a,c){var d=new b.Defer;return this.boot(a,c).then(function(a){a.once("ready",function(){d.resolve(this)})}),d.promise}};return e},{requires:["promise","dom"]}),KISSY.add("brix/core/bx-config",function(a){var b={bxHandleConfig:function(a,b){var c=a.attr("bx-config");return c?new Function("return "+c)():{}},bxCastString:function(b){return b=a.trim(b),/^(?:true|false)$/.test(b)?"true"===b:/^\d+$/.test(b)?parseInt(b,10):b}};return b}),KISSY.add("brix/core/bx-delegate",function(){var a={delegate:function(a,b,c,d){this.on(a+"_"+b,c,d)},undelegate:function(a,b,c,d){this.detach(a+"_"+b,c,d)}};return a}),KISSY.add("brix/core/bx-event",function(a,b){var c={bxDelegate:function(){for(var a=this.constructor;a;)this.bxDelegateMap(a.EVENTS),a=a.superclass?a.superclass.constructor:null;var b=this.get("events");b&&this.bxDelegateMap(b)},bxDelegateMap:function(a){function c(a){return function(){var b,c=f.bxGetAncestorWithData(f);c.data?(arguments[0].brixData=c.data,b=c.ancestor):b=f;var d=a.apply(this,arguments);d!==!1&&b.digest()}}var d,e,f=this,g=this.get("el");for(var h in a){var i=a[h];for(var j in i)d=i[j],d.handle=c(d),e=d.handle,"self"===h?g.on(j,e,this):"window"===h?b.on(window,j,e,this):"body"===h?b.on("body",j,e,this):"document"===h?b.on(document,j,e,this):g.delegate(j,h,e,this)}},bxUndelegate:function(){for(var a=this.constructor;a;)this.bxUndelegateMap(a.EVENTS),a=a.superclass?a.superclass.constructor:null;var b=this.get("events");b&&this.bxUndelegateMap(b)},bxUndelegateMap:function(a){var c,d=this.get("el");for(var e in a){var f=a[e];for(var g in f)c=f[g].handle,"self"===e?d.detach(g,c,this):"window"===e?b.detach(window,g,c,this):"body"===e?b.detach("body",g,c,this):"document"===e?b.detach(document,g,c,this):d.undelegate(g,e,c,this),c=null,delete f[g].handle}}};return c},{requires:["event"]}),KISSY.add("brix/core/bx-find",function(){var a={bxOne:function(a){return this.bxIOne(a,this.bxChildren||[],!0)},bxIOne:function(a,b,c){"#"===a.charAt(0)&&(a=a.substr(1));for(var d=0;d<b.length;d++){var e=b[d];if(e.bxId===a||e.bxName===a)return e;if(c){var f=this.bxIOne(a,e.bxChildren||[],c);if(f)return f}}},bxAll:function(a){var b=[];return this.bxIAll(a,this.bxChildren||[],b,!0),b},bxIAll:function(a,b,c,d){"#"===a.charAt(0)&&(a=a.substr(1));for(var e=0;e<b.length;e++){var f=b[e];(f.bxId===a||f.bxName===a)&&c.push(f),d&&this.bxIAll(a,f.bxChildren||[],c,d)}},bxFind:function(a){return this.bxIOne(a,this.bxChildren||[])},bxWhere:function(a){var b=[];return this.bxIAll(a,this.bxChildren||[],b),b}};return a}),KISSY.add("brix/core/bx-name",function(a){var b={bxHandleName:function(b,c,d){for(var e=this.bxDirectChildren(b),f=this,g=e.length-1;g>=0;g--){var h=e[g];if(h.hasAttr("bx-defer"))e.splice(g,1);else{var i=f.bxFind("#"+h.attr("id"));i&&e.splice(g,1)}}0===e.length?a.later(function(){c(),d&&d()},0):f.bxUseModules(e,c,d)},bxUseModules:function(a,b,c){for(var d=this,e=0,f=0,g=a.length,h=[],i=function(){++e===g&&b()},j=c&&function(){++f===g&&c()},k=0;g>k;k++){var l=a[k];h[k]=d.bxBootName(l)}this.bxBootUse(h,function(b){for(var c=0;c<b.length;c++){var e=a[c],f=d.bxBootOptions({el:e,passive:!j});d.bxIBoot(e,f,b[c],i,j)}})},bxDirectChildren:function(a,b){function c(a){for(var e=a.children(),f=0;f<e.length;f++){var g=e.item(f);g.test(b)?d.push(g):c(g)}}var d=[];return b=b||"[bx-name]",c(a),d}};return b}),KISSY.add("brix/core/bx-remote",function(a,b,c,d){var e={bxHandleRemote:function(c){var e=this,f=e.get("el"),g=f.attr("bx-remote");if(/^http/.test(g)){var h=new d(g);h.isSameOriginAs(new d(location.href))||e.bxJsonpRemote(h,c)}else{if(!/^\.\//.test(g))return c(e.get("data"));var i=e.bxName,j=i.replace(/\/?$/,"")+g.substr(1);b.config("debug")?e.bxXhrRemote(j,c):a.use(j,function(a,b){c(b)})}},bxJsonpRemote:function(a,b){for(var d,e=a.getQuery(),f=e.keys(),g=0;g<f.length;g++){var h=f[g];if("callback"===h||"callback"===e.get(h)){d=h,e.remove(h);break}}c({dataType:"jsonp",url:a.toString(),jsonp:d,success:b})},bxXhrRemote:function(a,b){if(!/^http/.test(location.href))throw Error("Cannot load data.json via xhr in current mode.");c.get(this.bxResolveModule(a,".json"),b)}};return e},{requires:["brix/app/config","ajax","uri"]}),KISSY.add("brix/core/bx-third",function(a,b,c,d,e,f){var g={};return a.mix(g,b),a.mix(g,c),a.mix(g,d),a.mix(g,e),a.mix(g,f),g},{requires:["brix/core/bx-boot","brix/core/bx-name","brix/core/bx-find","brix/core/bx-util","brix/core/bx-config"]}),KISSY.add("brix/core/bx-tpl",function(a,b,c){var d={bxHandleTpl:function(a){var b=this,c=b.get("el"),d=b.get("tpl")||c.attr("bx-tpl");if(d)if("#"===d.charAt(0))b.bxScriptTpl(d,a);else if("."===d)b.bxHereTpl(c,a);else if(/^\.\//.test(d))b.bxRemoteTpl(c.attr("bx-name").replace(/\/?$/,"")+d.substr(1),a);else if("cached"===d){for(var e=!1,f=c;(f=f.parent())&&f!==c;){if(f.attr("bx-each")){e=!0;break}if(f.attr("bx-name"))break}var g=b.bxParent.get("subTplsCache");a(e?g[0]:g.shift())}else a(d);else a()},bxScriptTpl:function(b,c){c(a.one(b).html())},bxHereTpl:function(a,b){b(a.html())},bxRemoteTpl:function(c,d){b.config("debug")?this.bxXhrTpl(c,d):a.use(c+".tpl",function(a,b){d(b)})},bxXhrTpl:function(a,b){if(!/^http/.test(location.href))throw Error("Cannot load tpl via xhr in current mode.");c.get(this.bxResolveModule(a,".html"),b)}};return d},{requires:["brix/app/config","ajax"]}),KISSY.add("brix/core/bx-util",function(a,b){var c="brix/base";return{bxConstruct:function(a,b){function c(){return a.apply(this,b)}return c.prototype=a.prototype,new c},bxUniqueId:function(b){if(a.isString(b)&&(b=a.one(b)),!b.attr("id")){for(var c;(c=a.guid("brix-brick-"))&&a.one("#"+c););b.attr("id",c)}return b.attr("id")},bxMixArgument:function(b,c){c&&a.each(c,function(c,d){null!==c&&(a.isPlainObject(c)?(b[d]=b[d]||{},a.mix(b[d],c)):b[d]=c)})},bxResolveModule:function(c,d){var e=c.split("/"),f=e.shift(),g=e.shift(),h=e.shift(),i=a.config("packages")[f].base,j=b.config("components"),k=b.config("imports"),l=a.config("packages"),m=l[f]&&l[f].ignorePackageNameInUri;return m||e.push(f),e.push(g),k&&k[f]?e.push(k[f][g]):j&&a.isPlainObject(j[f])&&e.push(j[f][g]),e.push(h+d),i+e.join("/")},bxGetAncestorWithData:function(a){for(var b,c=this.bxGetBrickAncestor(a);c&&(!(b=c.get("data"))||!b);)c=this.bxGetBrickAncestor(c.bxParent);return b||(c=a),{data:b,ancestor:c}},bxGetBrickAncestor:function(a){for(;a;){if(this.bxIsBrickInstance(a))return a;a=a.bxParent}},bxIsBrickInstance:function(b){return b instanceof a.require(c)},bxIsExtendBrickClass:function(b){var d=a.require(c);return b==d?!0:b.superclass?b.superclass instanceof d:!1}}},{requires:["brix/app/config"]}),KISSY.add("brix/core/bx-watcher",function(a,b){function c(a){var b=e[a];return b||(b=e[a]=new Function("context","locals","with(context){if(typeof "+a+' ==="undefined"){return}else{return '+a+"}}")),b}function d(a,b){return function(){var c=b.indexOf(a);c>-1&&b.splice(c,1)}}var e={};return{watch:function(e,f,g){var h,i=this.bxWatchers=this.bxWatchers||[],j="function"==typeof f?function(){return f(e)}:c(f),k=j(e);return(a.isArray(k)||a.isObject(k))&&(k=b.stringify(k)),h={value:j,context:e,last:k,callback:g,expression:f},i.push(h),d(h,i)},digest:function(){if(this.bxWatcherChecking)throw new Error("Digest phase is already started");var c=this.bxWatchers;if(c){this.bxWatcherChecking=!0;var d,e,f,g,h,i=10;do for(d=!0,e=-1,f=c.length;++e<f;){g=c[e],h=g.value(g.context);var j=h,k=!1;(a.isArray(j)||a.isObject(j))&&(j=b.stringify(j),k=!0),j!==g.last&&(g.callback(h),g.last=j,d=!1)}while(!d&&i--);if(!i)throw new Error("Too much iterations per digest");delete this.bxWatcherChecking}},parse:c}},{requires:["json"]}),KISSY.add("brix/core/index",function(a,b,c,d,e,f,g,h){var i="brix/base",j={dirtyCheck:function(a){var b=this;if("function"!=typeof a&&(a=b[a]),!a)throw new Error("没有找到对应的函数");a.apply(b,Array.prototype.slice.call(arguments,1)),b.digest()},on:function(){var b=a.require(i);return b.superclass.on.apply(this,arguments),this},fire:function(b,c,d){var e=a.require(i),f=e.superclass.fire.apply(this,arguments),g=this.bxGetBrickAncestor(this.bxParent);if(g)if(d=d||this,d===this){var h="#"+d.bxId+"_"+b,j=d.bxName+"_"+b;g.fire(h,c,d),g.fire(j,c,d)}else g.fire(b,c,d);return f},once:function(a,b,c){var d=this,e=function(){return d.detach(a,e),b.apply(this,arguments)};return d.on(a,e,c),d},bxDestroy:function(){this.destroy()}};return a.mix(j,b),a.mix(j,c),a.mix(j,d),a.mix(j,e),a.mix(j,f),a.mix(j,g),a.mix(j,h),j},{requires:["brix/core/bx-api","brix/core/bx-tpl","brix/core/bx-event","brix/core/bx-delegate","brix/core/bx-remote","brix/core/bx-watcher","brix/core/bx-third"]}),KISSY.add("brix/interface/index",function(){var a={};return a.METHODS={bxIBuildTpl:function(a){var b=this.bxDirectChildren(a),c=this.get("subTplsCache");c||(c=[],this.set("subTplsCache",c));for(var d=0;d<b.length;d++){var e=b[d],f=e.attr("bx-tpl");!e.attr("bx-model")||f&&"."!==f||(c.push(e.html()),e.html(""),e.attr("bx-tpl","cached"))}}},a.ATTRS={subTplsCache:{value:[]}},a}),KISSY.add("brix/third/index",function(a,b){var c={bxInit:function(b,c){var d=this;b&&d.bxListenRendered(b),c&&d.bxListenReady(c),a.later(function(){d.bxRender()})},bxRender:function(){var a=this;if(!a.bxRendering&&!a.bxRendered){a.bxRendering=!0;var b=a.bxEl;a.bxHandleName(b,function(){delete a.bxRendering,a.bxRendered=!0,a.bxFireRendered()})}},bxActivate:function(){function b(){delete d.bxActivating,d.bxActivated=!0,d.bxFireReady()}function c(){++g===f&&b()}var d=this;if(!d.bxActivating&&!d.bxActivated&&d.bxRendered){d.bxActivating=!0;var e=d.bxChildren;if(0===e.length)return a.later(function(){b()},0),void 0;for(var f=e.length,g=0,h=0;h<e.length;h++){var i=e[h];d.bxIsBrickInstance(i)?(i.once("ready",c),i.once("destroy",c),i.bxActivate()):c()}}},bxListenReady:function(a){this.bxReadyFn=a},bxListenRendered:function(a){this.bxRenderedFn=a},bxFireRendered:function(){this.bxRenderedFn&&(this.bxRenderedFn(),delete this.bxRenderedFn)},bxFireReady:function(){this.bxReadyFn&&(this.bxReadyFn(),delete this.bxReadyFn)},bxDestroy:function(){var a,b=this,c=b.bxChildren;for(a=c.length-1;a>=0;a--)c[a].bxDestroy();b.bxChildren=[],delete b.bxEl;var d=b.bxParent;if(d){var e=d.bxChildren,f=b.bxId;for(a=e.length-1;a>=0;a--)if(e[a].bxId===f){e.splice(a,1);break}}b.bxFireRendered(),b.bxFireReady(),b.destroy&&b.destroy()}};return a.mix(c,b),c},{requires:["brix/core/bx-third"]});