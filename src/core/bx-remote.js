KISSY.add('brix/core/bx-remote', function(S, IO, Uri) {

    var exports = {

        bxHandleRemote: function(callback) {
            var self = this
            var el = self.get('el')
            var remote = el.attr('bx-remote')

            if (/^http/.test(remote)) {
                var uri = new Uri(remote)

                if (!uri.isSameOriginAs(new Uri(location.href)))
                    self.bxJsonpRemote(uri, callback)
            }
            else if (/^\.\//.test(remote)) {
                var name = self.bxName
                var mod = name.replace(/\/?$/, '') + remote.substr(1)
                var family = mod.split('/')[0]
                var packages = S.config('packages')[family]

                if (packages.debug) {
                    self.bxXhrRemote(mod, callback)
                }
                else {
                    S.use(mod, function(S, data) {
                        callback(data)
                    })
                }
            }
            else {
                return callback(self.get('data'))
            }
        },

        bxJsonpRemote: function(uri, callback) {
            var query = uri.getQuery()
            var keys = query.keys()
            var jsonp

            // determine the jsonp callback key
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i]

                if (key === 'callback' || query.get(key) === 'callback') {
                    jsonp = key
                    query.remove(key)
                    break
                }
            }

            IO({
                dataType: 'jsonp',
                url: uri.toString(),
                jsonp: jsonp,
                success: callback
            })
        },

        bxXhrRemote: function(mod, callback) {
            if (!/^http/.test(location.href)) {
                throw Error('Cannot load data.json via xhr in current mode.')
            }

            IO.get(this.bxResolveModule(mod, '.json'), callback)
        }
    }

    return exports
}, {
    requires: [
        'ajax',
        'uri'
    ]
})