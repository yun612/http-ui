// const BASE_URL = "http://localhost:8080"
const BASE_URL = "http://43.248.191.29:8585"

//setting api,
async function fetchSettings() {
    try {
        const resp = await fetch(`${BASE_URL}/setting`, {
            // const resp = await fetch("https://v1.hitokoto.cn?c=i", {  //示例一言是可以的
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await resp.json()
        console.log(data.data, 'data json')
        // TODO: 这里返回的是对象
        return data.data
    } catch (e) {
        console.log(e)
    }
}

// save settings
async function saveSettings(params) {
    console.log(params)
    const resp = await fetch(`${BASE_URL}/setting/save`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(params)
    })
    return true
}

// TODO: 获取文件列表，过滤可以一起做了，四个参数 path, type, sort，order（正序/倒序）
//TODO：一定要注意，我获取数据的时候是 / 开头的

async function fetchFileList(params) {
    console.log(params)

        const resp = await fetch(BASE_URL + "/file/file_list", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
        })
            console.log(resp, 'resp')
            const data = await resp.json()
            console.log(data, 'data json')  
            return data.data
}
