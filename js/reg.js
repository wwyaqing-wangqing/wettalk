//注册事件

function $(selector) {
    return document.querySelector(selector)
}
const doms = {
    txtLoginId: $('#txtLoginId'),
    txtNickname: $('#txtNickname'),
    txtLoginPwd: $('#txtLoginPwd'),
    txtLoginPwdConfirm: $('#txtLoginPwdConfirm'),
    submit: $('.submit')
}
doms.submit.addEventListener('click', async (e) => {
    e.preventDefault()
    const loginId = txtLoginId.value
    const nickname = txtNickname.value
    const loginPwd = document.querySelector('#txtLoginPwd').value

    const obj = {
        loginId,
        nickname,
        loginPwd
    }
    const result = await API('reg', obj, 'POST') //得到login的返回值
    if (result.code == '0') {
        // location.href = './login.html';
    }
    else {
        alert(result.msg)
    }


})