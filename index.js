(function (root, factory) {
    /* istanbul ignore next */
    if(typeof define === "function" && define.amd) {
        define(['lodash'], factory);
    } else if(typeof module === "object" && module.exports) {
        module.exports = factory(require('lodash'));
    } else {
        root.stringToObj = factory(root._);
    }
}(this, function(_) {
    function StringToObj(config) {
        function customizer(objValue, srcValue) {
            return _.isUndefined(objValue) ? srcValue : objValue;
        }
        var defaults = _.partialRight(_.assignInWith, customizer);
        var defaultConfig = {
            trim: true,
            delimiters: {
                values: {
                    default: ','
                },
                keyValue: ':'
            },
            blackhole: 'context'
        };

        // assign default config
        if (config === undefined) {
            config = defaultConfig;
        } else {
            config = defaults(config, defaultConfig);
        }

        this.parse = function (str) {
            // escape dangerous characters
            var d = config.delimiters.keyValue.replace(/[^\w\s]/g, "\\$&"),
            // this regex will split objects by space
                regex = new RegExp('(?:(\\w*)?' + d + ')?(?:"([^"]*)+",?|([^\\s"]+))', 'g'),
            // container of the result object
                result = {},
                match;

            while ((match = regex.exec(str)) !== null) {
                if ((filter = match[1]) === undefined) {
                    filter = (config.blackhole === undefined || config.blackhole === true) ? 'blackhole' : config.blackhole;
                }
                if (!filter) continue;
                if (!result.hasOwnProperty(filter)) result[filter] = [];
                var newSet = (match[2] || match[3]).split(
                    config.delimiters.values[filter] ||
                    config.delimiters.values.default
                );
                if (config.trim === undefined || config.trim === true) {
                    newSet = newSet.map(function (item) {
                        return (item || '').trim();
                    }).filter(function (item) {
                        return item !== '';
                    });
                }
                result[filter] = result[filter].concat(newSet);
            }
            return result;
        };
        this.source = function (config) {
            return config;
        }(config)
    }
    return StringToObj;
}));