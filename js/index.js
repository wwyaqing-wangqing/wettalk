//聊天记录初始化
(async function () {
    function $(selector) {
        return document.querySelector(selector)
    }

    function addhistory(arr) {
        if (arr.from) {
            insertHtml = `<div class="chat-item me">
      <img class="chat-avatar" src="./asset/avatar.png" />
      <div class="chat-content">${arr.content}</div>
      <div class="chat-date">${new Date(arr.createdAt)}</div>
    </div>`
        }
        else {
            insertHtml = `<div class="chat-item">
        <img class="chat-avatar" src="./asset/robot-avatar.jpg" />
        <div class="chat-content">${arr.content}</div>
        <div class="chat-date">${new Date(arr.createdAt)}</div>
      </div>`
        }

        return insertHtml

    }
    const doms = {
        container: $('.chat-container'),
        btn: $('button'),
        txt: $('#txtMsg'),
        close: $('.icon-close'),
        nickname: $('#nickname'),
        loginId: $('#loginId'),
    }
    doms.container.innerHTML = ''
    async function gethistory() {
        let htmltext = ''
        const history = await API('history', '', 'POST')
        if (history.code == '0') {
            for (const item of history.data) {
                htmltext += addhistory(item)
                doms.container.innerHTML = htmltext
            }
        }
        else {
            alert(history.msg)
            location.href = './login.html';
        }
        doms.container.scrollTop = doms.container.scrollHeight


    }
    const repsonresult = await API('profile', '', 'GET')
    if (!repsonresult.data) {
        alert(repsonresult.msg)
        return
    } else {
        // doms.nickname.innerText = repsonresult.data.nickname
        doms.loginId.innerText = repsonresult.data.loginId
    }
    gethistory()
    doms.btn.addEventListener('click', async (e) => {
        e.preventDefault()
        const content = { content: doms.txt.value }

        let child = document.createElement('div')
        child.innerHTML = `<div class="chat-item me">
    <img class="chat-avatar" src="./asset/avatar.png" />
    <div class="chat-content">${doms.txt.value}</div>
    <div class="chat-date"></div>
  </div>`
        doms.container.appendChild(child)
        doms.txt.value = '' //清空文本信息
        doms.container.scrollTop = doms.container.scrollHeight
        const result = await API('chat', content, 'POST') //得到login的返回值
        if (result.code == '0') {
            // console.log('发送成功', result.data)
            await gethistory()//成功后显示更新聊天记录
            doms.container.scrollTop = doms.container.scrollHeight

        }
        else {
            alert(result.msg)
        }


    })
    doms.close.addEventListener('click', () => {

        localStorage.setItem('authorization', '')
        location.href = './login.html';
    })
})()