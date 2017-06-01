/**
 * Created by richmond on 2017/05/31.
 */

(function (root, factory) {
    /* istanbul ignore next */
    if(typeof define === "function" && define.amd) {
        define(function(){
            return (root.strToObj = factory);
        });
    } else if(typeof module === "object" && module.exports) {
        module.exports = (root.strToObj = factory);
    } else {
        root.strToObj = factory;
    }
}(this, function(config) {
    var _ = require('lodash');
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

    return {
        parse: function (str) {

            // escape dangerous characters
            var d = config.delimiters.keyValue.replace(/[^\w\s]/g, "\\$&"),
            // this regex will split objects by space
                regex = new RegExp('(?:(\\w*)?' + d + ')?(?:"([^"]*)+",?|([^\\s"]+))', 'g'),
            // container of the result object
                result = {},
                match;

            while ((match = regex.exec(str)) !== null) {
                // if (match.index === regex.lastIndex) {
                //     regex.lastIndex++;
                // }
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
        },
        source: function (config) {
            return config;
        }(config)
    }
}));
