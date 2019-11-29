import test from 'ava';
import { Pipeline } from "../src/components/service";

const sample = {
  nodes: [
    { name: "test0", hint: '1m23s', status: 'success', next: [{ index: 1, weight: 2 }] },
    {
      name: "test1 long", hint: '1m23s', status: 'success', next: [
        { index: 2, weight: 2 }, { index: 3, weight: 2 }, { index: 4, weight: 2 }
      ]
    },
    { name: "test2 hello world", hint: '2m23s', status: 'unstable', next: [{ index: 5 }] },
    { name: "test3", hint: '2m23s', status: 'success', next: [{ index: 7, weight: 1 }] },
    { name: "test4 ha", hint: '2m23s', status: 'failure', next: [{ index: 8 }, { index: 9 }] },//4
    { name: "test5", hint: '2m23s', status: 'failure', next: [{ index: 6 }] },
    { name: "test6", hint: '2m23s', status: 'success', next: [{ index: 10 }] },//6
    { name: "test7 hello", hint: '2m23s', status: 'paused', next: [{ index: 10 }] },
    { name: "test8 2344", hint: '2m23s', status: 'paused', next: [{ index: 10 }] },//8
    { name: "test9", hint: '2m23s', status: 'failure', next: [{ index: 10 }] },
    { name: "test10", hint: '2m23s', status: 'failure', next: [{ index: 11 }] }, //10
    { name: "test11", hint: '2m23s', status: 'failure' },
  ],
}

test('find the longest way from start position', t => {
  let service = new Pipeline(sample.nodes, 50, 55, 120, 60)
  let list = service.findLongestWay(0)
  t.deepEqual(list, [0, 1, 2, 5, 6, 10, 11], 'longest way is different!!');
});

test('findParents', async t => {
  let service = new Pipeline(sample.nodes, 50, 55, 120, 60)
  let list = service.findParents(10)
  t.deepEqual(list, [6, 7, 8, 9], 'Parents is wrong!');
});


test('DFS', async t => {
  let service = new Pipeline(sample.nodes, 50, 55, 120, 60)
  let list = service.dfs(0)
  t.deepEqual(list.length, sample.nodes.length, 'DFS is wrong!');
});
