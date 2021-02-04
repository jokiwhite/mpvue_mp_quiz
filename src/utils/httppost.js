const host = "http://localhost:8084/api"//如果有则输入
function request(url, method, data, header = {}) {
    wx.showLoading({
        title: '正在加载中....'
    })
    return new Promise((resolve, reject) => {
        wx.request({
            url: host+url,
            method: method,
            data: data,
            header: {
                // 'Authorization': 'Basic ' + window.btoa("webApp" + ":" + "webApp"),
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            success: function (res) {
                wx.hideLoading();
                resolve(res.data)
            },
            fail: function (res) {
                wx.hideLoading();
                reject(res);
            },
            complete: function (res) {
                wx.hideLoading();
            }
        })
    })
}

//封装get方法
export const get= function (obj) {
    return request(obj.url, 'GET', obj.data)
}
//封装post方法
export const post = function(obj) {
    return request(obj.url, 'POST', obj.data)
}

