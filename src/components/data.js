let hue = {
    nodes: [
        { name: "Start", time: '1m23s', status: 'success', next: [1] },
        { name: "Ammouncement Import", time: '1m23s', status: 'success', next: [2, 3, 4, 5, 6] },
        { name: "Personal Basic Info", time: '2m23s', status: 'unstable', next: [7] },
        { name: "Address Info", time: '2m23s', status: 'success', next: [7] },
        { name: "Family Info", time: '2m23s', status: 'failure', next: [7] },
        { name: "Education Info", time: '2m23s', status: 'success', next: [7] },
        { name: "Degree Info", time: '2m23s', status: 'paused', next: [7] },
        { name: "End", time: '2m23s', status: 'failure' },
    ],
  
}
let sample = {
    nodes: [
        { name: "test0", time: '1m23s', status: 'success',next:[1] },
        { name: "test1 long", time: '1m23s', status: 'success' ,next:[2,3,4]},
        { name: "test2 hello world", time: '2m23s', status: 'unstable' ,next:[5]},
        { name: "test3", time: '2m23s', status: 'success' ,next:[7]},
        { name: "test4", time: '2m23s', status: 'failure' ,next:[7]},
        { name: "test5", time: '2m23s', status: 'success' ,next:[6]},
        { name: "test6 hello", time: '2m23s', status: 'paused',next:[7] },
        { name: "test7", time: '2m23s', status: 'failure' },
    ],
}

export default sample