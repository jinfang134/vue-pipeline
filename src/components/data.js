
const hue3 = {
    nodes: [
        {
            name: "Start", hint: '1m23s', status: 'start', next: [
                { index: 1, weight: 2 }
            ]
        },
        {
            name: "Ammouncement Import", hint: '1m23s', status: 'success', next: [
                { index: 2, weight: 0 },
                { index: 4, weight: 2 }
            ]
        },
        {
            name: "Employee ID to Onboarding", hint: '2m23s', status: 'failure', next: [
                { index: 3, weight: 0 },

            ]
        },
        {
            name: "Personal Basic Info", hint: '2m23s', status: 'success', next: [
                { index: 4, weight: 0 },
            ]
        },
        { name: "End ", hint: '2m23s', status: 'end', next: [] },
    ],
}


const hue1 = {
    nodes: [
        {
            name: "Start", hint: '1m23s', status: 'start', next: [
                { index: 1, weight: 2 }
            ]
        },
        {
            name: "Ammouncement Import", hint: '1m23s', status: 'success', next: [
                { index: 2, weight: 2 }
            ]
        },
        {
            name: "Employee ID to Onboarding", hint: '2m23s', status: 'unstable', next: [
                { index: 3, weight: 2 },
                { index: 4, weight: 2 },
                { index: 5, weight: 2 },
                { index: 6, weight: 0 },
                { index: 7, weight: 1 },
                { index: 8, weight: 2 },
                { index: 9, weight: 0 },
            ]
        },
        {
            name: "Personal Basic Info", hint: '2m23s', status: 'unstable', next: [
                { index: 10, weight: 2 },
            ]
        },
        {
            name: "地址信息", hint: '2m23s', status: 'success', next: [
                { index: 10, weight: 0 },
            ]
        },
        {
            name: "Family Info", hint: '2m23s', status: 'failure', next: [
                { index: 10, weight: 0 },
            ]
        },
        {
            name: "Education Info", hint: '2m23s', status: 'success', next: [
                { index: 10, weight: 0 },
            ]
        },
        {
            name: "Degree Info", hint: '2m23s', status: 'failure', next: [
                { index: 10, weight: 0 },
            ]
        },
        {
            name: "Career Info", hint: '2m23s', status: 'failure', next: [
                { index: 10, weight: 0 },
            ]
        },
        {
            name: "Qualification Info", hint: '2m23s', status: 'failure', next: [
                { index: 10, weight: 0 },
            ]
        },
        { name: "End", hint: '2m23s', status: 'end', next: [] },
    ],
}

const hue2 = {
    nodes: [
        {
            name: "Start", hint: '1m23s', status: 'success', next: [{
                index: 1, weight: 0
            }]
        },
        { name: "Ammouncement Import", hint: '1m23s', status: 'success', next: [2, 3, 4, 5, 6] },
        { name: "Personal Basic Info", hint: '2m23s', status: 'unstable', next: [4] },
        { name: "Address Info", hint: '2m23s', status: 'success', next: [7] },
        { name: "Family Info", hint: '2m23s', status: 'failure', next: [7] },
        { name: "Family In", hint: '2m23s', status: 'failure', next: [7] },
        { name: "Education Info", hint: '2m23s', status: 'success', next: [7] },
        { name: "Degree Info", hint: '2m23s', status: 'paused', next: [8] },
        { name: "End", hint: '2m23s', status: 'failure' },
    ],
}

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
const sample2 = {
    nodes: [
        { name: "test0", hint: '1m23s', status: 'success', next: [1] },
        { name: "test1 long", hint: '1m23s', status: 'success', next: [2, 3, 4] },
        { name: "test2 hello world", hint: '2m23s', status: 'unstable', next: [5] },
        { name: "test3", hint: '2m23s', status: 'success', next: [7] },
        { name: "test4 ha", hint: '2m23s', status: 'failure', next: [8, 9] },//4
        { name: "test5", hint: '2m23s', status: 'failure', next: [6] },
        { name: "test6", hint: '2m23s', status: 'success', next: [10] },//6
        { name: "test7 hello", hint: '2m23s', status: 'paused', next: [10] },
        { name: "test8 2344", hint: '2m23s', status: 'paused', next: [9] },//8
        { name: "test9", hint: '2m23s', status: 'failure', next: [10] },
        { name: "test10", hint: '2m23s', status: 'failure', next: [11] }, //10
        { name: "test11", hint: '2m23s', status: 'failure' },
    ],
}

module.exports = hue3
// export default hue1