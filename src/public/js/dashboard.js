let messagesBoard, hiTitle;
window.onload = () => {
    messagesBoard = document.querySelector('.messages-board');
    hiTitle = document.querySelector('.hi-title');
    run();
}

function getAllMessages() {
    return new Promise((resolve, reject) => {
        fetch('/message/all', { headers: { 'Accept':'application/json' } })
            .then(data => data.json())
            .then(data => resolve(data))
            .catch(err => reject(err))
    })
}

function fetchUserData() {
    return new Promise((resolve, reject) => {
        fetch('/user/data/me', { headers: { 'Accept':'application/json' } })
            .then(data => data.json())
            .then(data => resolve(data))
            .catch(err => reject(err))
    })
}

function writeMessage(data) {
    let reactions = data.Reactions
        .map(item => item.liked)
        .reduce((total, value) => (total[value] = (total[value] || 0)+1, total), {});
    
    let html = `
    <div class="post--div" msgId='${ data.id }' authorId='${ data.User.id }'>
        <input type='hidden' name='msg-id' value='${ data.id }'>
        <input type='hidden' name='author-id' value='${ data.User.id }'>
        <div class="texts">
            <small class="author-text">${ data.User.name } - ${ data.User.user }</small>
            <p class="message-text">${ data.message }</p>

            ${data.refsMessage ? `
                <div class="inherited-message--div container" 
                onclick='window.location.href="/message/${ data.Message.id }"'>
                    <small class="author-text">${ data.Message.User.name } - ${ data.Message.User.user }</small>
                    <p class="message-text">${ data.Message.message }</p>
                </div><br>` : ''
            }

            <small class="datetime-text">${ data.createdAt }</small><br>
        </div>
        <div class="reactions">
            <div class="reaction--div">
                <small class="reaction-up--text">${ reactions.true || 0 }</small>
                <img class='svg-icon' onclick='reactUp(this)' src="/imgs/icons/arrow-top.svg">
            </div>
            <div class="reaction--div">
                <img class='svg-icon' onclick='reactDown(this)' src="/imgs/icons/arrow-bottom.svg">
                <small class="react-down--text">${ reactions.false || 0 }</small>
            </div><br>
            ${data.User.id == document.userData.id 
                ? '<a><img class="svg-icon" onclick="deleteMessage(this)" src="/imgs/icons/trash.svg"></a>'
                : ''
            }
            <a href='/dashboard/${data.id}'><img class='svg-icon' src="/imgs/icons/comment.svg"></a>
        </div>
    </div>`;
    messagesBoard.innerHTML = html + messagesBoard.innerHTML;
}

function reactUp(element) {
    fetch(`/react/${ element.msgId }/up`)
    .then(data => data.json())
    .catch(err => alert(err))
}
function reactDown(element) {
    fetch(`/react/${ element.msgId }/down`)
    .then(data => data.json())
    .catch(err => alert(err))
}

function deleteMessage(element) {
    let postDiv = element.parentElement.parentElement.parentElement;
    let postId = postDiv.getAttribute('msgId');
    fetch(`/message/delete/${ postId }`)
        .then(data => location.reload())
        .catch(err => console.log(err))
}

function run() {
    fetchUserData()
    .then(data => document.userData = data)
    .then(data => hiTitle.innerHTML = `Hi, ${data.name}! :3`)

    getAllMessages()
    .then(data => data.forEach((msg) => writeMessage(msg)))
}