// 点击登入事件  
//获取需要的对象
(function () {
    //验证功能
    //包装的很垃圾 跟没包装一样 就当熟悉构造函数了
    const txtLoginId = new FieldValidator('txtLoginId', function (value) {
        if (!value) {
            return '账户不能为空'
        }
        else {
            return ''
        }

    })
    const txtLoginPwd = new FieldValidator('txtLoginPwd', function (value) {
        if (!value) {
            return '密码不能为空'
        } else {
            return ''
        }
    })


    const btn = document.querySelector('.submit')
    btn.addEventListener('click', async (e) => {
        e.preventDefault()

        // return
        const loginId = document.querySelector('#txtLoginId').value

        const loginPwd = document.querySelector('#txtLoginPwd').value


        const result = await API('login', { loginId, loginPwd }, 'POST') //得到login的返回值
        if (result.code == '0') {
            location.href = './index.html';
        }
        else {
            alert(result.msg)
        }


    })
})()