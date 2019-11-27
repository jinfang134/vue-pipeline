const hue = {
    nodes: [
        { name: "Start", time: '1m23s', status: 'success', next: [1] },
        { name: "Ammouncement Import", time: '1m23s', status: 'success', next: [2, 3, 4, 5, 6] },
        { name: "Personal Basic Info", time: '2m23s', status: 'unstable', next: [7] },
        { name: "Address Info", time: '2m23s', status: 'success', next: [7] },
        { name: "Family Info", time: '2m23s', status: 'failure', next: [7] },
        { name: "Family In", time: '2m23s', status: 'failure', next: [7] },
        { name: "Education Info", time: '2m23s', status: 'success', next: [7] },
        { name: "Degree Info", time: '2m23s', status: 'paused', next: [8] },
        { name: "End", time: '2m23s', status: 'failure' },
    ],
}

const hue2 = {
    nodes: [
        { name: "Start", time: '1m23s', status: 'success', next: [1] },
        { name: "Ammouncement Import", time: '1m23s', status: 'success', next: [2, 3, 4, 5, 6] },
        { name: "Personal Basic Info", time: '2m23s', status: 'unstable', next: [4] },
        { name: "Address Info", time: '2m23s', status: 'success', next: [7] },
        { name: "Family Info", time: '2m23s', status: 'failure', next: [7] },
        { name: "Family In", time: '2m23s', status: 'failure', next: [7] },
        { name: "Education Info", time: '2m23s', status: 'success', next: [7] },
        { name: "Degree Info", time: '2m23s', status: 'paused', next: [8] },
        { name: "End", time: '2m23s', status: 'failure' },
    ],
}

const sample = {
    nodes: [
        { name: "test0", time: '1m23s', status: 'success', next: [1] },
        { name: "test1 long", time: '1m23s', status: 'success', next: [2, 3, 4] },
        { name: "test2 hello world", time: '2m23s', status: 'unstable', next: [5] },
        { name: "test3", time: '2m23s', status: 'success', next: [7] },
        { name: "test4 ha", time: '2m23s', status: 'failure', next: [8,9] },//4
        { name: "test5", time: '2m23s', status: 'failure', next: [6] },
        { name: "test6", time: '2m23s', status: 'success', next: [10] },//6
        { name: "test7 hello", time: '2m23s', status: 'paused', next: [10] },
        { name: "test8 2344", time: '2m23s', status: 'paused', next: [10] },//8
        { name: "test9", time: '2m23s', status: 'failure',next:[10] },
        { name: "test10", time: '2m23s', status: 'failure',next:[11] }, //10
        { name: "test11", time: '2m23s', status: 'failure' },
    ],
}
const sample2 = {
    nodes: [
        { name: "test0", time: '1m23s', status: 'success', next: [1] },
        { name: "test1 long", time: '1m23s', status: 'success', next: [2, 3, 4] },
        { name: "test2 hello world", time: '2m23s', status: 'unstable', next: [5] },
        { name: "test3", time: '2m23s', status: 'success', next: [7] },
        { name: "test4 ha", time: '2m23s', status: 'failure', next: [8,9] },//4
        { name: "test5", time: '2m23s', status: 'failure', next: [6] },
        { name: "test6", time: '2m23s', status: 'success', next: [10] },//6
        { name: "test7 hello", time: '2m23s', status: 'paused', next: [10] },
        { name: "test8 2344", time: '2m23s', status: 'paused', next: [9] },//8
        { name: "test9", time: '2m23s', status: 'failure',next:[10] },
        { name: "test10", time: '2m23s', status: 'failure',next:[11] }, //10
        { name: "test11", time: '2m23s', status: 'failure' },
    ],
}

module.exports= sample
// export default hue2