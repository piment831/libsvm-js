/* eslint-disable no-async-promise-executor,no-misleading-character-class,require-atomic-updates,no-useless-catch */
'use strict';

const loadSVM = require('./src/loadSVM');
const libsvm = require('./out/wasm/libsvm');

module.exports = libsvm.then((instance) => instance.load().then(() => loadSVM(instance)));
