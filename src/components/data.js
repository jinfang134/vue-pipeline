let hue = {
    nodes: [
        { name: "test0", time: '1m23s' },
        { name: "Ammouncement Import", time: '1m23s' },
        { name: "Personal Basic Info", time: '2m23s' },
        { name: "Address Info", time: '2m23s' },
        { name: "Family Info", time: '2m23s' },
        { name: "Education Info", time: '2m23s' },
        { name: "Degree Info", time: '2m23s' },
        { name: "test7", time: '2m23s' },
    ],
    matrix: [
        [0, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 0], //1
        [0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 1], //4
        [0, 0, 0, 0, 0, 0, 0, 1], //5
        [0, 0, 0, 0, 0, 0, 0, 1], //6
        [0, 0, 0, 0, 0, 0, 0, 0], //7
    ]
}
let sample = {
    nodes: [
        { name: "test0", time: '1m23s' },
        { name: "test1 long", time: '1m23s' },
        { name: "test2 hello world", time: '2m23s' },
        { name: "test3", time: '2m23s' },
        { name: "test4", time: '2m23s' },
        { name: "test5", time: '2m23s' },
        { name: "test6 hello", time: '2m23s' },
        { name: "test7", time: '2m23s' },
    ],
    matrix: [
        [0, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 0, 0, 0], //1
        [0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 1, 0], //4
        [0, 0, 0, 0, 0, 0, 1, 0], //5
        [0, 0, 0, 0, 0, 0, 0, 1], //6
        [0, 0, 0, 0, 0, 0, 0, 0], //7
    ]
}

export default hue