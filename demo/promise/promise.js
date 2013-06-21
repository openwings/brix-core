/*jshint asi:true */
KISSY.config({
    packages: {
        brix: {
            ignorePackageNameInUri: true,
            base: '../../src'
        }
    }
})


KISSY.use('brix/app,brix/base', function(S, app) {

    app.config({
        components: 'thx.demo',
        base: '../',
        imports: {
            brix: {
                pagination: '1.0.0',
                dropdown: '1.1.0'
            }
        }
    })

    app.bootStyle(function() {
        S.one("button").on("click", bootstrap)
    })


    function bootstrap() {
        app.boot({
            el: '#container',
            tpl: '#tpl',
            config: {
                brixtest2: {
                    data: {
                        a: 'aa',
                        b: 'bb',
                        c: 'cc'
                    }
                },
                brixtest4: {
                    listeners: {
                        getTpl: function(e) {
                            return S.later(function() {
                                var tpl = '<input type="button" class="input31 btn btn-red btn-size25" value="刷新文字"><span bx-tpl="text" bx-datakey="text">hahah{{text}}</span>'

                                e.next(tpl)
                            }, 1)
                        }
                    }
                }
            },
            listeners: {
                getData: function(e) {
                    return S.later(function() {
                        var data = {
                            a: 'a',
                            b: 'b',
                            c: 'c',
                            d: [{
                                a:'4',
                                d1: '1'
                            }, {
                                d1: '2'
                            }, {
                                d1: '3'
                            }, {
                                d1: function() {
                                    return '4'
                                }
                            }],
                            e: true,
                            f: function() {
                                return 'xx'
                            },
                            g: [5,6,7],
                            startDay: 'haha'
                        }
                        e.next(data)
                    }, 500)
                }
            }
        }).on('ready', function(){
            S.log('ready')
            this.setChunkData({a: 'aaaa' + S.guid()})
            window.brick = this
            this.delegate('#brixtest', 'myfire', function(){
                S.log('brixtest_myfire')
            })
            this.delegate('#brixtest2', 'myfire', function(e){
                S.log('brixtest2_myfire')
                //取消默认事件和冒泡
                e.halt(true);
            })
            this.delegate('#brixtest2', 'myfire', function(){
                S.log('brixtest22_myfire')
            })
            var fn = function(e){
                S.log('brixtest3'+'_'+e.fireName);
            }
            this.delegate('#brixtest3', 'myfire', fn)
            this.undelegate('#brixtest3', 'myfire', fn)

            this.find('#brixtest').delegate('#brixtest3', 'myfire', fn)
        })

    }
})