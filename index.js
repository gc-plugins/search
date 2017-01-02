/* jshint node: true, esversion: 6 */
'use strict';

let {shell} = require('electron'),
    path = require('path');

exports.init = ({config}) => {};

exports.setConfig = () => {};

exports.process = ({keyword, term, stream}) => {
    let results = [],
        url;

    // If the term is empty, return no results.
    if (/^\s*$/.test(term)) {
        stream.end(undefined);
        return;
    }

    url = 'https://www.google.com/?gws_rd=ssl#q=' + encodeURI(term);

    stream.write({
        key: url,
        title: `Google ${term}`,
        description: url,
        icon: encodeURI(path.resolve(__dirname, 'img', 'google.png'))
    });
    stream.end();
};

exports.execute = ({key}) => {
    return new Promise((resolve, reject) => {
        if (/^https?\:\/\//.test(key)) {
            shell.openExternal(key);
            resolve();
        }
        else {
            reject();
        }
    });
};

exports.keyword = 'g';
