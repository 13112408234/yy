
const baseURL = "https://edu.telking.com/api/?type=";
function ajax(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", baseURL + url, true);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    //把json数据转换为对象
                    resolve(JSON.parse(xhr.response))
                } else { reject(xhr.status); }
            }
        }
    })
}
    // ajax2().then(res=> {
    // console.log(res)
    // })