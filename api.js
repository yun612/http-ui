// 设置页面 api,下面是需要返回给我的数据格式，对象，而且我只要最后一次保存的数据
async function fetchSettings() {
    return {
        downloadPath: '/data/mock_dir',
        maxTasks: 4,
        maxDownloadSpeed: 10,
        maxUploadSpeed: 12
    }
}

// 保存设置
async function saveSettings(settings) {
    console.log(settings)
    return true
}

// file 页面 api
// TODO: 获取文件列表,这部分可以和过滤一起做了，四个参数 path, type, sort，order（正序/倒序），使用POST方法
// params是一个对象，里面有四个参数，path, type, sort，order（正序/倒序）,
// 如果path是/，就是获取根目录下的文件列表,如果type是''，就是获取所有类型文件列表，如果sort是''，就是没有排序，如果order是up，就是正序，如果order是dowm，就是倒序

async function fetchFileList(params) {
    console.log(params)
    if (params.path === '/' && params.type === '' && params.sort === '' && params.order === 'down') { // 返回保存目录下的所有文件列表，默认所有类型，默认是order是down，sort 是空
        return [
            {
                name: 'Test1',
                isDirectory: true,
                path: '/data/mock_dir/test1',
                createdAt: '2023-11-11',
                children: [
                    {
                        name: 'Test1-1',
                        isDirectory: true,
                        path: '/test1-1',
                        size: null,
                        createdAt: '2023-11-11',
                        children: [{
                            name: 'Test1-1-1',
                            isDirectory: true,
                            path: '/test1-1-1',
                            size: '100KB',
                            createdAt: '2023-11-11',
                            children: [{
                                name: 'Test1-1-1-1',
                                isDirectory: false,
                                type: 'txt',
                                path: '/test1-1-1-1',
                                size: '100KB',
                                createdAt: '2023-11-11'
                            }]
                        }]
                    },
                    {
                        name: 'Test1-2.pdf',
                        isDirectory: false,
                        type: 'pdf',
                        path: '/test1-2',
                        size: '100KB',
                        createdAt: '2023-11-11'
                    }]
            },
            {
                name: 'Test2.txt',
                isDirectory: false,
                type: 'txt',
                path: '/data/mock_dir/test2',
                size: '20KB',
                createdAt: '2023-11-13'
            },
            {
                name: 'Test3.gif',
                isDirectory: false,
                type: 'gif',
                path: '/data/mock_dir/test3',
                size: '1MB',
                createdAt: '2023-11-12'
            },
        ]
    }
    if (path === '//data/mock_dir/test1') {
        return [
            {
                name: 'Test1-1',
                isDirectory: true,
                path: '/test1-1',
                size: null,
                createdAt: '2023-11-11',
                children: [{
                    name: 'Test1-1-1',
                    isDirectory: true,
                    path: '/test1-1-1',
                    size: '100KB',
                    createdAt: '2023-11-11',
                    children: [{
                        name: 'Test1-1-1-1',
                        isDirectory: false,
                        type: 'txt',
                        path: '/test1-1-1-1',
                        size: '100KB',
                        createdAt: '2023-11-11'
                    }]
                }]
            },
            {
                name: 'Test1-2.pdf',
                isDirectory: false,
                type: 'pdf',
                path: '/test1-2',
                size: '100KB',
                createdAt: '2023-11-11'
            }]
    }
    if (path === '//data/mock_dir/test2') {
        return [
            {
                name: 'Test2.txt',
                isDirectory: false,
                type: 'txt',
                path: '/data/mock_dir/test2',
                size: '20KB',
                createdAt: '2023-11-13'
            }
        ]
    }
    if (path === '/test1-1') {
        return [
            {
                name: 'Test1-1-1',
                isDirectory: true,
                path: '/test1-1-1',
                size: '100KB',
                createdAt: '2023-11-11',
                children: [{
                    name: 'Test1-1-1-1',
                    isDirectory: false,
                    type: 'txt',
                    path: '/test1-1-1-1',
                    size: '100KB',
                    createdAt: '2023-11-11'
                }]
            }
        ]
    }
    else { // 这个就是所有筛选的类型，但凡有条件的都是这个数据
        return {
            name: 'test.测试用例类型',
            isDirectory: false,
            type: '测试用例类型',
            path: '/data/mock_dir/test3',
            size: '1MB',
            createdAt: '2023-11-12'
        }
    }
}

// tasks 页面 api,这里其实可以把过滤的功能一起做了，params是一个对象，包含了currentPage(当前页)，status（filter，过滤条件）和limit（每页多少）三个属性,  //用POST 方法
async function fetchTasks(params) {
    console.log(params)
    if (params.status === '' && params.currentPage === 1 && params.limit === 5) {
        return {
            code: 200,
            total: 6,
            items: [
                {
                    id: '111',
                    type: 'http',
                    url: 'https://mirrors.tuna.tsinghua.edu.cn/ubuntu-releases/22.04.3/ubuntu-22.04.3-live-server-arm.iso',
                    name: 'ubuntu-22.04.3-live-server-arm.iso',
                    threads: 2,
                    size: '3GB',
                    speed: '2.3MB',
                    progress: 80,  // 这里的progress是下载的进度，思考是怎么得到这个数据的
                    createdAt: '2023-11-11',
                    finishedAt: '2023-11-12',
                    status: 'downloading',
                    remainingTime: 300, // TODO:这里的remainingTime单位是秒，转换好给到前端，状态要是downloading,就是距离下载完成的剩余时间，要是downloaded就是完成下载的时间，pending以及其他状态为空
                    peers: 12,
                    downloadSpeed: '140KB',
                },
                {
                    id: '222',
                    type: 'http',
                    url: 'https://mirrors.tuna.tsinghua.edu.cn/ubuntu-releases/22.04.3/ubuntu-22.04.3-live-server-arm.iso',
                    name: 'ubuntu-22.04.3-live-server-arm.iso',
                    status: 'pending',
                    remainingTime: null,
                    size: '9MB',
                    speed: '1.2MB',
                    progress: 0,
                    createdAt: '2023/11/10 00:00:00',
                    finishedAt: '2023-11-15',
                    peers: 12,
                },
                {
                    id: '333',
                    type: 'bt',
                    name: 'ubuntu-22.04.3-live-server-arm.iso',
                    threads: 6,
                    status: 'downloading',
                    remainingTime: 100,
                    size: '2.6GB',
                    speed: '120KB',
                    progress: 50,
                    createdAt: '2023-11-11',
                    finishedAt: '2023-11-12',
                    peers: 10,
                    uploadSpeed: '198KB',
                    downloadSpeed: '198KB',
                },
                {
                    id: '444',
                    type: 'http',
                    url: 'https://mirrors.tuna.tsinghua.edu.cn/ubuntu-releases/22.04.3/ubuntu-22.04.3-live-server-arm.iso',
                    name: 'ubuntu-22.04.3-live-server-arm.iso',
                    status: 'downloaded',
                    remainingTime: 630,
                    size: '9MB',
                    speed: '1.2MB',
                    progress: 100,
                    createdAt: '2023/11/10 00:00:00',
                    finishedAt: '2023-11-15',
                    peers: 12,
                    downloadSpeed: '1.2MB',
                },
                {
                    id: '555',
                    type: 'bt',
                    name: 'ubuntu-22.04.3-live-server-arm.iso',
                    threads: 4,
                    status: 'downloading',
                    remainingTime: 200,
                    size: '2.6GB',
                    speed: '120KB',
                    progress: 10,
                    createdAt: '2023-11-11',
                    finishedAt: '2023-11-12',
                    peers: 10,
                    uploadSpeed: '198KB',
                    downloadSpeed: '198KB',
                },
                {
                    id: '666',
                    type: 'http',
                    url: 'https://mirrors.tuna.tsinghua.edu.cn/ubuntu-releases/22.04.3/ubuntu-22.04.3-live-server-arm.iso',
                    name: 'ubuntu-22.04.3-live-server-arm.iso',
                    status: 'cancled',
                    remainingTime: null,
                    size: '9MB',
                    speed: '1.2MB',
                    progress: 0,
                    createdAt: '2023/11/10 00:00:00',
                    finishedAt: '2023-11-15',
                    peers: 12,
                    downloadSpeed: '1.2MB',
                }
            ]
        }
    }
    else if (params.status === '' && params.currentPage === 2 && params.limit === 5) {
        return {
            code: 200,
            total: 6,
            items: [
                {
                    id: '111',
                    type: 'http',
                    url: 'https://mirrors.tuna.tsinghua.edu.cn/ubuntu-releases/22.04.3/ubuntu-22.04.3-live-server-arm.iso',
                    name: '这是第二页的数据',
                    threads: 2,
                    size: '3GB',
                    speed: '2.3MB',
                    progress: 80,  // 这里的progress是下载的进度，思考是怎么得到这个数据的
                    createdAt: '2023-11-11',
                    finishedAt: '2023-11-12',
                    status: 'downloading',
                    remainingTime: 300, // TODO:这里的remainingTime单位是秒，转换好给到前端，状态要是downloading,就是距离下载完成的剩余时间，要是downloaded就是完成下载的时间，pending以及其他状态为空
                    peers: 12,
                    downloadSpeed: '140KB',
                }]
        }
    }
    else if ((params.status =!'')) {  // 这里是过滤的数据，所有的情况都简写了
        return {
            code: 200,
            total: 1,
            items: [
                {
                    id: '111',
                    type: 'http',
                    url: 'https://mirrors.tuna.tsinghua.edu.cn/ubuntu-releases/22.04.3/ubuntu-22.04.3-live-server-arm.iso',
                    name: '测试测试',
                    threads: 1,
                    size: '10GB',
                    speed: '20B',
                    progress: 20,  // 这里的progress是下载的进度，思考是怎么得到这个数据的
                    createdAt: '2023-11-11',
                    finishedAt: '2023-11-12',
                    status: 'downloaded',
                    remainingTime: 300, // TODO:这里的remainingTime单位是秒，转换好给到前端，状态要是downloading,就是距离下载完成的剩余时间，要是downloaded就是完成下载的时间，pending以及其他状态为空
                    peers: 12,
                    downloadSpeed: '140KB',
                }]
        }
    }
}
// 改变线程数, params是一个对象，包含了id和threads两个属性
async function changeThreads(params) {
    console.log(params)
    return true
}

async function submitDownloadPath(path) {
    console.log(path)
    return true
}

// 重新下载任务的详细信息，ids是一个数组，单个任务，就是一个元素的数组，多个任务就是多个元素的数组，实现同一个接口单量和多量的处理
async function fetchTaskInfo(ids) {
    console.log(ids, '刷新，重新获取任务的详细信息')
    return true
}

// 暂停下载任务,ids是一个数组，单个任务，就是一个元素的数组，多个任务就是多个元素的数组，实现同一个接口单量和多量的处理
async function pauseTask(ids) {
    console.log(ids)
    return true
}

// 恢复下载任务，ids是一个数组
async function resumeTask(ids) {
    console.log(ids)
    return true
}

// 删除下载任务，ids是一个数组
async function deleteTask(ids) {
    console.log(ids)
    return true
}