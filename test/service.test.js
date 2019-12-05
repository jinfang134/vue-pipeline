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


test('topologicalSorting', t => {
  const testdata = [
    { name: "test0", hint: '1m23s', status: 'success', next: [{ index: 1, weight: 2 }] },
    {
      name: "test1 long", hint: '1m23s', status: 'success', next: [
        { index: 2, weight: 2 }, { index: 3, weight: 2 }, { index: 5, weight: 2 }
      ]
    },
    { name: "test2 hello world", hint: '2m23s', status: 'unstable', next: [{ index: 3 }, { index: 4 }] },
    { name: "test3", hint: '2m23s', status: 'success', next: [{ index: 4 }] },
    { name: "test4 ha", hint: '2m23s', status: 'failure', next: [] },//4
    { name: "test5", hint: '2m23s', status: 'failure', next: [{ index: 4 }] },
  ]

  let service = new Pipeline(testdata, 50, 55, 120, 60)
  let list = service.topologicalSorting()
  t.deepEqual(list, [0, 1, 2, 3, 5, 4])
})

test('hasCircle', t => {
  const test2 = [
    { name: "test0", hint: '1m23s', status: 'success', next: [{ index: 1, weight: 2 }] },
    { name: "test0", hint: '1m23s', status: 'success', next: [{ index: 2, weight: 2 }] },
    { name: "test0", hint: '1m23s', status: 'success', next: [{ index: 1, weight: 2 }] },
  ]

  let service = new Pipeline(test2, 50, 55, 120, 60)
  let result = service.hasCircle()
  t.deepEqual(result, true, 'this graph has circle.')
})


test('isTree', t => {
  const test2 = [
    { name: "test0", hint: '1m23s', status: 'success', next: [{ index: 1, weight: 2 }] },
    { name: "test0", hint: '1m23s', status: 'success', next: [{ index: 2, weight: 2 }] },
    { name: "test0", hint: '1m23s', status: 'success', next: [{ index: 1, weight: 2 }] },
  ]
  let service = new Pipeline(test2, 50, 55, 120, 60)
  let result = service.isTree()
  t.deepEqual(result, false, 'this graph is not a tree.')

  const data = [
    { name: "test0", hint: '1m23s', status: 'success', next: [{ index: 1, weight: 2 }, { index: 2, weight: 2 }] },
    { name: "test0", hint: '1m23s', status: 'success', next: [{ index: 3, weight: 2 }] },
    { name: "test0", hint: '1m23s', status: 'success', next: [] },
    { name: "test0", hint: '1m23s', status: 'success', next: [] },
  ]
  let service2 = new Pipeline(data, 50, 55, 120, 60)
  let result2 = service2.isTree()
  t.deepEqual(result2, true, 'this graph is a tree.')

})


test('assignNodeForTree',t=>{
  const data = [
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
  ]
  let service2 = new Pipeline(data, 50, 55, 120, 60)
  service2.assignNodeForTree(0,0,0)
  t.deepEqual(service2.matrix[0], [0,1,2,5,6,10,11], 'this graph is a tree.')
  t.deepEqual(service2.matrix[1], [undefined,undefined,3,7,12], 'this graph is a tree.')
})
