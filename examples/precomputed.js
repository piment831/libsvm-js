/* eslint-disable no-async-promise-executor,no-misleading-character-class,require-atomic-updates,no-useless-catch */
'use strict';

const Kernel = require('ml-kernel');
const range = require('lodash.range');

const gamma = 0.2;
const cost = 1;

function exec(SVM, time, precomputed) {
  const MILISECONDS = time * 1000;
  const data = require('ml-dataset-iris');
  var trainData;

  const features = data.getNumbers();
  let labels = data.getClasses();
  const classes = data.getDistinctClasses();
  const c = {};
  classes.forEach((v, idx) => (c[v] = idx));
  labels = labels.map((l) => c[l]);


  let result;
  const t1 = Date.now();
  let t2 = Date.now();
  let count = 0;
  while (t2 - t1 < MILISECONDS) {
    if (precomputed) {
      const kernel = new Kernel('gaussian', { sigma: 1 / Math.sqrt(gamma) });
      trainData = kernel.compute(features).addColumn(0, range(1, labels.length + 1));
    } else {
      trainData = features;
    }

    const svm = new SVM({
      quiet: true,
      cost: cost,
      kernel: precomputed ? SVM.KERNEL_TYPES.PRECOMPUTED : SVM.KERNEL_TYPES.RBF,
      gamma
    });
    result = svm.crossValidation(trainData, labels, labels.length);
    svm.free();
    count++;
    t2 = Date.now();
  }

  console.log('accuracy: ', result.reduce((prev, current, idx) => (current === labels[idx] ? prev + 1 : prev), 0) / labels.length);
  return count;
}

(async () => {
  const SVM = await require('../asm');

  let count;
  count = exec(SVM, 5, false);
  console.log('not precomputed count', count);
  count = exec(SVM, 5, true);
  console.log('precomputed count', count);
})();
