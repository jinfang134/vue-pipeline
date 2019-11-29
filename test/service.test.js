import test from 'ava';
 import { Pipeline } from "../src/components/service";

const sample = {
  nodes: [
    { name: "test0", hint: '1m23s', status: 'success', next: [{ index: 1, weight: 2 }] },
    { name: "test1 long", hint: '1m23s', status: 'success', next: [
        { index: 2, weight: 2 }, { index: 3, weight: 2 }, { index: 4, weight: 2 }
      ]
    },
    { name: "test2 hello world", hint: '2m23s', status: 'unstable', next: [{ index: 5 }] },
    { name: "test3", hint: '2m23s', status: 'success', next: [{ index: 7, weight: 1 }] },
    { name: "test4 ha", hint: '2m23s', status: 'failure', next: [{ index: 8 }, { index: 9 }] },//4
    { name: "test5", hint: '2m23s', status: 'failure', next: [{ index: 6 }] },
    { name: "test6", hint: '2m23s', status: 'success', next: [{ index: 10 }] },//6
    { name: "test7 hello", hint: '2m23s', status: 'paused', next: [{ index: 12 }, { index: 13 }] },
    { name: "test8 2344", hint: '2m23s', status: 'paused', next: [{ index: 14 }, { index: 15 }] },//8
    { name: "test9", hint: '2m23s', status: 'failure', next: [{ index: 16 }] },
    { name: "test10", hint: '2m23s', status: 'failure', next: [{ index: 11 }] }, //10
    { name: "test11", hint: '2m23s', status: 'failure' },
    { name: "test12", hint: '2m23s', status: 'failure' },
    { name: "test13", hint: '2m23s', status: 'failure' },
    { name: "test14", hint: '2m23s', status: 'failure' },
    { name: "test15", hint: '2m23s', status: 'failure' },
    { name: "test16", hint: '2m23s', status: 'failure' },
  ],
}

test('test', t => {
  t.pass('message');
});

test('bar', async t => {
  const bar = Promise.resolve('bar');
  t.is(await bar, 'bar');
});
