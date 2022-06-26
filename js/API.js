// {
//     "loginId":"wuyaqinglvwq",
//     "loginPwd":"222"
// }

var API = (
    /**
     * 
     * 登录功能界面所需 api函数
     */
    function () {
        const BASE_URL = 'https://study.duyiedu.com'
        const token = 'authorization'
        // localStorage.getItem(token)

        /**
         * 
         * @param {*} path  //请求地址
         * @param {*} body  //请求体内容
         * @param {*} method //请求方式
         * @returns //promise 发送请求 
         */
        function post(path, body, method) {
            const url = BASE_URL + path
            method = method || 'GET'
            let quest = {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    authorization: 'Bearer ' + localStorage.getItem(token)
                }
            }
            if (method === 'POST') {
                quest.body = JSON.stringify(body)
            }

            return fetch(url, quest)

        }

        /**
         * 
         * @param {string} type // 注册 登入 验证 发送消息等事件类型
         * @param {object} logininfo //请求体内容
         * @return {string}  //返回响应信息
         */
        async function login(type = 'login', logininfo = '', method = 'GET') {
            let path = ''
            if (type === 'login') { //登入
                path = '/api/user/login'
                method = 'POST'
            } else if (type === 'reg') {//注册
                path = '/api/user/reg'
                method = 'POST'

            } else if (type === 'exists') {//验证账户
                path = '/api/user/exists'
                method = 'GET'
            }
            else if (type === 'profile') {//当前用户登录信息
                path = '/api/user/profile'
                method = 'GET'
            }
            else if (type === 'history') {//获取聊天记录
                path = '/api/chat/history'
                method = 'GET'
            }
            else if (type === 'chat') {//聊天
                path = '/api/chat'
                method = 'POST'
            }


            path = path || '/api/chat/history';
            logininfo = logininfo || {
                "loginId": "love",
                "nickname": "wq",
                "loginPwd": "222"
            }
            const repson = await post(path, logininfo, method)
            const result = await repson.json()

            if (result.code == '0') {
                if (type === 'login') {
                    localStorage.setItem(token, repson.headers.get('authorization') || '')
                }
            }

            return result


        }
        return login
    })()