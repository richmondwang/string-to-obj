/**
 * Created by richmond on 2017/05/31.
 */

'use strict';
//
// (function (root, factory) {
//     /* istanbul ignore next */
//     if(typeof define === "function" && define.amd) {
//         define(['strToObj'], function(strToObj){
//             return (root.strToObj = factory);
//         });
//     } else if(typeof module === "object" && module.exports) {
//         module.exports = (root.strToObj = factory);
//     } else {
//         root.strToObj = factory;
//     }
// }(this, function(config) {

// require(['require', './index'], function(require) {

var assert = require('assert');
var strToObj = require('./index');

    describe('With default config', function () {

        var parser = new strToObj();

        function assertResultObject(actual, expected) {
            assert.equal(
                JSON.stringify(actual),
                JSON.stringify(expected)
            )
        }

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

        it('Config: ' + JSON.stringify(defaultConfig), function () {
            assertResultObject(defaultConfig, parser.source);
        });

        var testItems = [{
            search_term: '',
            expected_result: {}
        }, {
            search_term: 'word',
            expected_result: {
                context: ['word']
            }
        }, {
            search_term: '"a word"',
            expected_result: {
                context: ['a word']
            }
        }, {
            search_term: '"a word, another"',
            expected_result: {
                context: ['a word', 'another']
            }
        }, {
            search_term: '"a word,another,"',
            expected_result: {
                context: ['a word', 'another']
            }
        }, {
            search_term: '"a word, and another"',
            expected_result: {
                context: ['a word', 'and another']
            }
        }, {
            search_term: 'word,another',
            expected_result: {
                context: ['word', 'another']
            }
        }, {
            search_term: 'word another',
            expected_result: {
                context: ['word', 'another']
            }
        }, {
            search_term: 'tags:db',
            expected_result: {
                tags: ['db']
            }
        }, {
            search_term: 'tags:db,backup',
            expected_result: {
                tags: ['db', 'backup']
            }
        }, {
            search_term: 'titles:"DB Backups,Systems"',
            expected_result: {
                titles: ['DB Backups', 'Systems']
            }
        }, {
            search_term: 'titles:"DB Backups, Systems"',
            expected_result: {
                titles: ['DB Backups', 'Systems']
            }
        }, {
            search_term: 'titles:"DB Backups, System Utilities"',
            expected_result: {
                titles: ['DB Backups', 'System Utilities']
            }
        }, {
            search_term: 'tags:db application',
            expected_result: {
                tags: ['db'],
                context: ['application']
            }
        }, {
            search_term: 'tags:db application crash',
            expected_result: {
                tags: ['db'],
                context: ['application', 'crash']
            }
        }, {
            search_term: 'tags:db application,crash',
            expected_result: {
                tags: ['db'],
                context: ['application', 'crash']
            }
        }, {
            search_term: 'tags:db application, crash',
            expected_result: {
                tags: ['db'],
                context: ['application', 'crash']
            }
        }, {
            search_term: 'tags:db,backup crash',
            expected_result: {
                tags: ['db', 'backup'],
                context: ['crash']
            }
        }, {
            search_term: 'tags:db,backup application crash',
            expected_result: {
                tags: ['db', 'backup'],
                context: ['application', 'crash']
            }
        }, {
            search_term: 'tags:db,backup application, crash',
            expected_result: {
                tags: ['db', 'backup'],
                context: ['application', 'crash']
            }
        }, {
            search_term: 'tags:db,backup "application crash"',
            expected_result: {
                tags: ['db', 'backup'],
                context: ['application crash']
            }
        }, {
            search_term: 'tags:"db backup,systems" crash',
            expected_result: {
                tags: ['db backup', 'systems'],
                context: ['crash']
            }
        }, {
            search_term: 'tags:"db backup, systems" crash',
            expected_result: {
                tags: ['db backup', 'systems'],
                context: ['crash']
            }
        }, {
            search_term: 'tags:"db backup" crash',
            expected_result: {
                tags: ['db backup'],
                context: ['crash']
            }
        }, {
            search_term: 'tags:"db backup,systems" crash application',
            expected_result: {
                tags: ['db backup', 'systems'],
                context: ['crash', 'application']
            }
        }, {
            search_term: 'tags:"db backup,systems" "crash application"',
            expected_result: {
                tags: ['db backup', 'systems'],
                context: ['crash application']
            }
        }, {
            search_term: 'tags:db is:open',
            expected_result: {
                tags: ['db'],
                is: ['open']
            }
        }, {
            search_term: 'tags:db is:open crash',
            expected_result: {
                tags: ['db'],
                is: ['open'],
                context: ['crash']
            }
        }, {
            search_term: 'tags:db,backup is:open crash',
            expected_result: {
                tags: ['db', 'backup'],
                is: ['open'],
                context: ['crash']
            }
        }, {
            search_term: 'tags:db,backup is:open crash application',
            expected_result: {
                tags: ['db', 'backup'],
                is: ['open'],
                context: ['crash', 'application']
            }
        }, {
            search_term: 'tags:"db backup,systems" is:open crash',
            expected_result: {
                tags: ['db backup', 'systems'],
                is: ['open'],
                context: ['crash']
            }
        }, {
            search_term: 'tags:db is:"open issue" crash',
            expected_result: {
                tags: ['db'],
                is: ['open issue'],
                context: ['crash']
            }
        }, {
            search_term: 'tags:db is:open,issue crash',
            expected_result: {
                tags: ['db'],
                is: ['open', 'issue'],
                context: ['crash']
            }
        }, {
            search_term: 'tags:db,systems is:open,issue crash',
            expected_result: {
                tags: ['db', 'systems'],
                is: ['open', 'issue'],
                context: ['crash']
            }
        }, {
            search_term: 'tags:"db backup,systems" is:open,issue crash',
            expected_result: {
                tags: ['db backup', 'systems'],
                is: ['open', 'issue'],
                context: ['crash']
            }
        }, {
            search_term: 'tags:"db backup,systems" is:"open issue,active" crash',
            expected_result: {
                tags: ['db backup', 'systems'],
                is: ['open issue', 'active'],
                context: ['crash']
            }
        }, {
            search_term: 'tags:"db backup,systems" is:open,issue crash application',
            expected_result: {
                tags: ['db backup', 'systems'],
                is: ['open', 'issue'],
                context: ['crash', 'application']
            }
        }, {
            search_term: 'tags:"db backup,systems" is:"open issue,active" "crash application"',
            expected_result: {
                tags: ['db backup', 'systems'],
                is: ['open issue', 'active'],
                context: ['crash application']
            }
        }, {
            search_term: 'tags:"db backup,systems" is:"open issue,active" "crash,application"',
            expected_result: {
                tags: ['db backup', 'systems'],
                is: ['open issue', 'active'],
                context: ['crash', 'application']
            }
        }, {
            search_term: 'tags:"db backup,systems" is:open is:active authors:johndoe,janedoe application crashes',
            expected_result: {
                tags: ['db backup', 'systems'],
                is: ['open', 'active'],
                authors: ['johndoe', 'janedoe'],
                context: ['application', 'crashes']
            }
        }
        ];

        testItems.forEach(function (testItem) {
            var parsed = parser.parse(testItem.search_term);
            it('`' + testItem.search_term + '`\n\t⇢ ' + JSON.stringify(parsed), function () {
                assertResultObject(parsed, testItem.expected_result);
            });
        });

    });

    describe('With config `:` delimiter, no blackhole', function () {
        var config = {
            delimiters: {
                values: {
                    default: ','
                },
                keyValue: ':'
            },
            blackhole: false
        };

        var parser = new strToObj(config);

        function assertResultObject(actual, expected) {
            assert.equal(
                JSON.stringify(actual),
                JSON.stringify(expected)
            )
        }

        it('Config: ' + JSON.stringify(parser.source), function () {
            assertResultObject(config, parser.source);
        });

        var testItems = [{
            search_term: '',
            expected_result: {}
        }, {
            search_term: 'word',
            expected_result: {}
        }, {
            search_term: '"a word"',
            expected_result: {}
        }, {
            search_term: '"a word, another"',
            expected_result: {}
        }, {
            search_term: '"a word,another,"',
            expected_result: {}
        }, {
            search_term: '"a word, and another"',
            expected_result: {}
        }, {
            search_term: 'word,another',
            expected_result: {}
        }, {
            search_term: 'word another',
            expected_result: {}
        }, {
            search_term: 'tags:db',
            expected_result: {
                tags: ['db']
            }
        }, {
            search_term: 'tags:db,backup',
            expected_result: {
                tags: ['db', 'backup']
            }
        }, {
            search_term: 'titles:"DB Backups,Systems"',
            expected_result: {
                titles: ['DB Backups', 'Systems']
            }
        }, {
            search_term: 'titles:"DB Backups, Systems"',
            expected_result: {
                titles: ['DB Backups', 'Systems']
            }
        }, {
            search_term: 'titles:"DB Backups, System Utilities"',
            expected_result: {
                titles: ['DB Backups', 'System Utilities']
            }
        }, {
            search_term: 'tags:db application',
            expected_result: {
                tags: ['db']
            }
        }, {
            search_term: 'tags:db application crash',
            expected_result: {
                tags: ['db']
            }
        }, {
            search_term: 'tags:db application,crash',
            expected_result: {
                tags: ['db']
            }
        }, {
            search_term: 'tags:db application, crash',
            expected_result: {
                tags: ['db']
            }
        }, {
            search_term: 'tags:db,backup crash',
            expected_result: {
                tags: ['db', 'backup']
            }
        }, {
            search_term: 'tags:db,backup application crash',
            expected_result: {
                tags: ['db', 'backup']
            }
        }, {
            search_term: 'tags:db,backup application, crash',
            expected_result: {
                tags: ['db', 'backup']
            }
        }, {
            search_term: 'tags:db,backup "application crash"',
            expected_result: {
                tags: ['db', 'backup']
            }
        }, {
            search_term: 'tags:"db backup,systems" crash',
            expected_result: {
                tags: ['db backup', 'systems']
            }
        }, {
            search_term: 'tags:"db backup, systems" crash',
            expected_result: {
                tags: ['db backup', 'systems']
            }
        }, {
            search_term: 'tags:"db backup" crash',
            expected_result: {
                tags: ['db backup']
            }
        }, {
            search_term: 'tags:"db backup,systems" crash application',
            expected_result: {
                tags: ['db backup', 'systems']
            }
        }, {
            search_term: 'tags:"db backup,systems" "crash application"',
            expected_result: {
                tags: ['db backup', 'systems']
            }
        }, {
            search_term: 'tags:db is:open',
            expected_result: {
                tags: ['db'],
                is: ['open']
            }
        }, {
            search_term: 'tags:db is:open crash',
            expected_result: {
                tags: ['db'],
                is: ['open']
            }
        }, {
            search_term: 'tags:db,backup is:open crash',
            expected_result: {
                tags: ['db', 'backup'],
                is: ['open']
            }
        }, {
            search_term: 'tags:db,backup is:open crash application',
            expected_result: {
                tags: ['db', 'backup'],
                is: ['open']
            }
        }, {
            search_term: 'tags:"db backup,systems" is:open crash',
            expected_result: {
                tags: ['db backup', 'systems'],
                is: ['open']
            }
        }, {
            search_term: 'tags:db is:"open issue" crash',
            expected_result: {
                tags: ['db'],
                is: ['open issue']
            }
        }, {
            search_term: 'tags:db is:open,issue crash',
            expected_result: {
                tags: ['db'],
                is: ['open', 'issue']
            }
        }, {
            search_term: 'tags:db,systems is:open,issue crash',
            expected_result: {
                tags: ['db', 'systems'],
                is: ['open', 'issue']
            }
        }, {
            search_term: 'tags:"db backup,systems" is:open,issue crash',
            expected_result: {
                tags: ['db backup', 'systems'],
                is: ['open', 'issue']
            }
        }, {
            search_term: 'tags:"db backup,systems" is:"open issue,active" crash',
            expected_result: {
                tags: ['db backup', 'systems'],
                is: ['open issue', 'active']
            }
        }, {
            search_term: 'tags:"db backup,systems" is:open,issue crash application',
            expected_result: {
                tags: ['db backup', 'systems'],
                is: ['open', 'issue']
            }
        }, {
            search_term: 'tags:"db backup,systems" is:"open issue,active" "crash application"',
            expected_result: {
                tags: ['db backup', 'systems'],
                is: ['open issue', 'active']
            }
        }, {
            search_term: 'tags:"db backup,systems" is:"open issue,active" "crash,application"',
            expected_result: {
                tags: ['db backup', 'systems'],
                is: ['open issue', 'active']
            }
        }, {
            search_term: 'tags:"db backup,systems" is:open is:active authors:johndoe,janedoe application crashes',
            expected_result: {
                tags: ['db backup', 'systems'],
                is: ['open', 'active'],
                authors: ['johndoe', 'janedoe']
            }
        }
        ];

        testItems.forEach(function (testItem) {
            var parsed = parser.parse(testItem.search_term);
            it('`' + testItem.search_term + '`\n\t⇢ ' + JSON.stringify(parsed), function () {
                assertResultObject(parsed, testItem.expected_result);
            });
        });

    });

    describe('With config `=` delimiter, `context` blackhole', function () {
        var config = {
            delimiters: {
                values: {
                    default: ','
                },
                keyValue: '='
            },
            blackhole: 'context'
        };

        var parser = new strToObj(config);

        function assertResultObject(actual, expected) {
            assert.equal(
                JSON.stringify(actual),
                JSON.stringify(expected)
            )
        }

        it('Config: ' + JSON.stringify(parser.source), function () {
            assertResultObject(config, parser.source);
        });

        var testItems = [{
            search_term: '',
            expected_result: {}
        }, {
            search_term: 'word',
            expected_result: {
                context: ['word']
            }
        }, {
            search_term: '"a word"',
            expected_result: {
                context: ['a word']
            }
        }, {
            search_term: '"a word, another"',
            expected_result: {
                context: ['a word', 'another']
            }
        }, {
            search_term: '"a word,another,"',
            expected_result: {
                context: ['a word', 'another']
            }
        }, {
            search_term: '"a word, and another"',
            expected_result: {
                context: ['a word', 'and another']
            }
        }, {
            search_term: 'word,another',
            expected_result: {
                context: ['word', 'another']
            }
        }, {
            search_term: 'word another',
            expected_result: {
                context: ['word', 'another']
            }
        }, {
            search_term: 'tags=db',
            expected_result: {
                tags: ['db']
            }
        }, {
            search_term: 'tags=db,backup',
            expected_result: {
                tags: ['db', 'backup']
            }
        }, {
            search_term: 'titles="DB Backups,Systems"',
            expected_result: {
                titles: ['DB Backups', 'Systems']
            }
        }, {
            search_term: 'titles="DB Backups, Systems"',
            expected_result: {
                titles: ['DB Backups', 'Systems']
            }
        }, {
            search_term: 'titles="DB Backups, System Utilities"',
            expected_result: {
                titles: ['DB Backups', 'System Utilities']
            }
        }, {
            search_term: 'tags=db application',
            expected_result: {
                tags: ['db'],
                context: ['application']
            }
        }, {
            search_term: 'tags=db application crash',
            expected_result: {
                tags: ['db'],
                context: ['application', 'crash']
            }
        }, {
            search_term: 'tags=db application,crash',
            expected_result: {
                tags: ['db'],
                context: ['application', 'crash']
            }
        }, {
            search_term: 'tags=db application, crash',
            expected_result: {
                tags: ['db'],
                context: ['application', 'crash']
            }
        }, {
            search_term: 'tags=db,backup crash',
            expected_result: {
                tags: ['db', 'backup'],
                context: ['crash']
            }
        }, {
            search_term: 'tags=db,backup application crash',
            expected_result: {
                tags: ['db', 'backup'],
                context: ['application', 'crash']
            }
        }, {
            search_term: 'tags=db,backup application, crash',
            expected_result: {
                tags: ['db', 'backup'],
                context: ['application', 'crash']
            }
        }, {
            search_term: 'tags=db,backup "application crash"',
            expected_result: {
                tags: ['db', 'backup'],
                context: ['application crash']
            }
        }, {
            search_term: 'tags="db backup,systems" crash',
            expected_result: {
                tags: ['db backup', 'systems'],
                context: ['crash']
            }
        }, {
            search_term: 'tags="db backup, systems" crash',
            expected_result: {
                tags: ['db backup', 'systems'],
                context: ['crash']
            }
        }, {
            search_term: 'tags="db backup" crash',
            expected_result: {
                tags: ['db backup'],
                context: ['crash']
            }
        }, {
            search_term: 'tags="db backup,systems" crash application',
            expected_result: {
                tags: ['db backup', 'systems'],
                context: ['crash', 'application']
            }
        }, {
            search_term: 'tags="db backup,systems" "crash application"',
            expected_result: {
                tags: ['db backup', 'systems'],
                context: ['crash application']
            }
        }, {
            search_term: 'tags=db is=open',
            expected_result: {
                tags: ['db'],
                is: ['open']
            }
        }, {
            search_term: 'tags=db is=open crash',
            expected_result: {
                tags: ['db'],
                is: ['open'],
                context: ['crash']
            }
        }, {
            search_term: 'tags=db,backup is=open crash',
            expected_result: {
                tags: ['db', 'backup'],
                is: ['open'],
                context: ['crash']
            }
        }, {
            search_term: 'tags=db,backup is=open crash application',
            expected_result: {
                tags: ['db', 'backup'],
                is: ['open'],
                context: ['crash', 'application']
            }
        }, {
            search_term: 'tags="db backup,systems" is=open crash',
            expected_result: {
                tags: ['db backup', 'systems'],
                is: ['open'],
                context: ['crash']
            }
        }, {
            search_term: 'tags=db is="open issue" crash',
            expected_result: {
                tags: ['db'],
                is: ['open issue'],
                context: ['crash']
            }
        }, {
            search_term: 'tags=db is=open,issue crash',
            expected_result: {
                tags: ['db'],
                is: ['open', 'issue'],
                context: ['crash']
            }
        }, {
            search_term: 'tags=db,systems is=open,issue crash',
            expected_result: {
                tags: ['db', 'systems'],
                is: ['open', 'issue'],
                context: ['crash']
            }
        }, {
            search_term: 'tags="db backup,systems" is=open,issue crash',
            expected_result: {
                tags: ['db backup', 'systems'],
                is: ['open', 'issue'],
                context: ['crash']
            }
        }, {
            search_term: 'tags="db backup,systems" is="open issue,active" crash',
            expected_result: {
                tags: ['db backup', 'systems'],
                is: ['open issue', 'active'],
                context: ['crash']
            }
        }, {
            search_term: 'tags="db backup,systems" is=open,issue crash application',
            expected_result: {
                tags: ['db backup', 'systems'],
                is: ['open', 'issue'],
                context: ['crash', 'application']
            }
        }, {
            search_term: 'tags="db backup,systems" is="open issue,active" "crash application"',
            expected_result: {
                tags: ['db backup', 'systems'],
                is: ['open issue', 'active'],
                context: ['crash application']
            }
        }, {
            search_term: 'tags="db backup,systems" is="open issue,active" "crash,application"',
            expected_result: {
                tags: ['db backup', 'systems'],
                is: ['open issue', 'active'],
                context: ['crash', 'application']
            }
        }, {
            search_term: 'tags="db backup,systems" is=open is=active authors=johndoe,janedoe application crashes',
            expected_result: {
                tags: ['db backup', 'systems'],
                is: ['open', 'active'],
                authors: ['johndoe', 'janedoe'],
                context: ['application', 'crashes']
            }
        }
        ];

        testItems.forEach(function (testItem) {
            var parsed = parser.parse(testItem.search_term);
            it('`' + testItem.search_term + '`\n\t⇢ ' + JSON.stringify(parsed), function () {
                assertResultObject(parsed, testItem.expected_result);
            });
        });

    });

    describe('With config `=` delimiter, no blackhole', function () {
        var config = {
            delimiters: {
                values: {
                    default: ','
                },
                keyValue: '='
            },
            blackhole: false
        };

        var parser = new strToObj(config);

        function assertResultObject(actual, expected) {
            assert.equal(
                JSON.stringify(actual),
                JSON.stringify(expected)
            )
        }

        it('Config: ' + JSON.stringify(parser.source), function () {
            assertResultObject(config, parser.source);
        });

        var testItems = [{
            search_term: '',
            expected_result: {}
        }, {
            search_term: 'word',
            expected_result: {}
        }, {
            search_term: '"a word"',
            expected_result: {}
        }, {
            search_term: '"a word, another"',
            expected_result: {}
        }, {
            search_term: '"a word,another,"',
            expected_result: {}
        }, {
            search_term: '"a word, and another"',
            expected_result: {}
        }, {
            search_term: 'word,another',
            expected_result: {}
        }, {
            search_term: 'word another',
            expected_result: {}
        }, {
            search_term: 'tags=db',
            expected_result: {
                tags: ['db']
            }
        }, {
            search_term: 'tags=db,backup',
            expected_result: {
                tags: ['db', 'backup']
            }
        }, {
            search_term: 'titles="DB Backups,Systems"',
            expected_result: {
                titles: ['DB Backups', 'Systems']
            }
        }, {
            search_term: 'titles="DB Backups, Systems"',
            expected_result: {
                titles: ['DB Backups', 'Systems']
            }
        }, {
            search_term: 'titles="DB Backups, System Utilities"',
            expected_result: {
                titles: ['DB Backups', 'System Utilities']
            }
        }, {
            search_term: 'tags=db application',
            expected_result: {
                tags: ['db']
            }
        }, {
            search_term: 'tags=db application crash',
            expected_result: {
                tags: ['db']
            }
        }, {
            search_term: 'tags=db application,crash',
            expected_result: {
                tags: ['db']
            }
        }, {
            search_term: 'tags=db application, crash',
            expected_result: {
                tags: ['db']
            }
        }, {
            search_term: 'tags=db,backup crash',
            expected_result: {
                tags: ['db', 'backup']
            }
        }, {
            search_term: 'tags=db,backup application crash',
            expected_result: {
                tags: ['db', 'backup']
            }
        }, {
            search_term: 'tags=db,backup application, crash',
            expected_result: {
                tags: ['db', 'backup']
            }
        }, {
            search_term: 'tags=db,backup "application crash"',
            expected_result: {
                tags: ['db', 'backup']
            }
        }, {
            search_term: 'tags="db backup,systems" crash',
            expected_result: {
                tags: ['db backup', 'systems']
            }
        }, {
            search_term: 'tags="db backup, systems" crash',
            expected_result: {
                tags: ['db backup', 'systems']
            }
        }, {
            search_term: 'tags="db backup" crash',
            expected_result: {
                tags: ['db backup']
            }
        }, {
            search_term: 'tags="db backup,systems" crash application',
            expected_result: {
                tags: ['db backup', 'systems']
            }
        }, {
            search_term: 'tags="db backup,systems" "crash application"',
            expected_result: {
                tags: ['db backup', 'systems']
            }
        }, {
            search_term: 'tags=db is=open',
            expected_result: {
                tags: ['db'],
                is: ['open']
            }
        }, {
            search_term: 'tags=db is=open crash',
            expected_result: {
                tags: ['db'],
                is: ['open']
            }
        }, {
            search_term: 'tags=db,backup is=open crash',
            expected_result: {
                tags: ['db', 'backup'],
                is: ['open']
            }
        }, {
            search_term: 'tags=db,backup is=open crash application',
            expected_result: {
                tags: ['db', 'backup'],
                is: ['open']
            }
        }, {
            search_term: 'tags="db backup,systems" is=open crash',
            expected_result: {
                tags: ['db backup', 'systems'],
                is: ['open']
            }
        }, {
            search_term: 'tags=db is="open issue" crash',
            expected_result: {
                tags: ['db'],
                is: ['open issue']
            }
        }, {
            search_term: 'tags=db is=open,issue crash',
            expected_result: {
                tags: ['db'],
                is: ['open', 'issue']
            }
        }, {
            search_term: 'tags=db,systems is=open,issue crash',
            expected_result: {
                tags: ['db', 'systems'],
                is: ['open', 'issue']
            }
        }, {
            search_term: 'tags="db backup,systems" is=open,issue, crash',
            expected_result: {
                tags: ['db backup', 'systems'],
                is: ['open', 'issue']
            }
        }, {
            search_term: 'tags="db backup,systems" is="open issue,active" crash',
            expected_result: {
                tags: ['db backup', 'systems'],
                is: ['open issue', 'active']
            }
        }, {
            search_term: 'tags="db backup,systems" is=open,issue crash application',
            expected_result: {
                tags: ['db backup', 'systems'],
                is: ['open', 'issue']
            }
        }, {
            search_term: 'tags="db backup,systems" is="open issue,active" "crash application"',
            expected_result: {
                tags: ['db backup', 'systems'],
                is: ['open issue', 'active']
            }
        }, {
            search_term: 'tags="db backup,systems" is="open issue,active" "crash,application"',
            expected_result: {
                tags: ['db backup', 'systems'],
                is: ['open issue', 'active']
            }
        }, {
            search_term: 'tags="db backup,systems" is=open is=active authors=johndoe,janedoe application crashes',
            expected_result: {
                tags: ['db backup', 'systems'],
                is: ['open', 'active'],
                authors: ['johndoe', 'janedoe']
            }
        }
        ];

        testItems.forEach(function (testItem) {
            var parsed = parser.parse(testItem.search_term);
            it('`' + testItem.search_term + '`\n\t⇢ ' + JSON.stringify(parsed), function () {
                assertResultObject(parsed, testItem.expected_result);
            });
        });

    });

    describe('With config `:` delimiter, `context` blackhole and custom context delimiters', function () {
        var config = {
            delimiters: {
                values: {
                    context: /[\s,]/,
                    default: ','
                },
                keyValue: ':'
            },
            blackhole: 'context'
        };

        var parser = new strToObj(config);

        function assertResultObject(actual, expected) {
            assert.equal(
                JSON.stringify(actual),
                JSON.stringify(expected)
            )
        }

        it('Config: ' + JSON.stringify(parser.source), function () {
            assertResultObject(config, parser.source);
        });

        var testItems = [{
            search_term: '',
            expected_result: {}
        }, {
            search_term: 'word',
            expected_result: {
                context: ['word']
            }
        }, {
            search_term: '"a word"',
            expected_result: {
                context: ['a', 'word']
            }
        }, {
            search_term: '"a word, another"',
            expected_result: {
                context: ['a', 'word', 'another']
            }
        }, {
            search_term: '"a word,another,"',
            expected_result: {
                context: ['a', 'word', 'another']
            }
        }, {
            search_term: '"a word, and another"',
            expected_result: {
                context: ['a', 'word', 'and', 'another']
            }
        }, {
            search_term: 'tags:db,backup "application crash"',
            expected_result: {
                tags: ['db', 'backup'],
                context: ['application', 'crash']
            }
        }, {
            search_term: 'tags:"db backup,systems" "crash application"',
            expected_result: {
                tags: ['db backup', 'systems'],
                context: ['crash', 'application']
            }
        }, {
            search_term: 'tags:"db backup,systems" is:"open issue,active" "crash application"',
            expected_result: {
                tags: ['db backup', 'systems'],
                is: ['open issue', 'active'],
                context: ['crash', 'application']
            }
        }];

        testItems.forEach(function (testItem) {
            var parsed = parser.parse(testItem.search_term);
            it('`' + testItem.search_term + '`\n\t⇢ ' + JSON.stringify(parsed), function () {
                assertResultObject(parsed, testItem.expected_result);
            });
        });

    });

    describe('With config `=` delimiter, default blackhole and no trim', function () {
        var config = {
            trim: false,
            delimiters: {
                values: {
                    default: ','
                },
                keyValue: '='
            },
            blackhole: true
        };

        var parser = new strToObj(config);

        function assertResultObject(actual, expected) {
            assert.equal(
                JSON.stringify(actual),
                JSON.stringify(expected)
            )
        }

        it('Config: ' + JSON.stringify(parser.source), function () {
            assertResultObject(config, parser.source);
        });

        var testItems = [{
            search_term: '',
            expected_result: {}
        }, {
            search_term: 'word',
            expected_result: {
                blackhole: ['word']
            }
        }, {
            search_term: '"a word"',
            expected_result: {
                blackhole: ['a word']
            }
        }, {
            search_term: '"a word, another"',
            expected_result: {
                blackhole: ['a word', ' another']
            }
        }, {
            search_term: '"a word,another,"',
            expected_result: {
                blackhole: ['a word', 'another', '']
            }
        }, {
            search_term: '"a word, and another"',
            expected_result: {
                blackhole: ['a word', ' and another']
            }
        }, {
            search_term: 'word,another',
            expected_result: {
                blackhole: ['word', 'another']
            }
        }, {
            search_term: 'word another',
            expected_result: {
                blackhole: ['word', 'another']
            }
        }];

        testItems.forEach(function (testItem) {
            var parsed = parser.parse(testItem.search_term);
            it('`' + testItem.search_term + '`\n\t⇢ ' + JSON.stringify(parsed), function () {
                assertResultObject(parsed, testItem.expected_result);
            });
        });

    });
// }));
// });