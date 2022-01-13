function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

let username = prompt("아이디를 입력하세요.");
let roomNumber = getParameterByName("roomNumber");

// SSE 연결
const eventSource = new EventSource(`http://localhost:8081/room/${roomNumber}`);

eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.sender === username) {
        // 오른쪽 편 메세지 (내 메세지)
        initMyMessage(data);

    } else {
        // 왼쪽 편 메세지 (다른 사람 메세지)
        initYourMessage(data);

    }
}

// 보낸 메세지 생성
function initMyMessage(data) {
    let chatBox = document.querySelector("#main-chat");
    let chatSendBox = document.createElement("div");
    chatSendBox.className = "me-chat";

    chatSendBox.innerHTML = getSendMsgBox(data);
    chatBox.append(chatSendBox);
}

// 받은 메세지 생성
function initYourMessage(data) {
    let chatBox = document.querySelector("#main-chat");
    let chatReceiveBox = document.createElement("div");
    chatReceiveBox.className = "friend-chat";

    chatReceiveBox.innerHTML = getReceiveMsgBox(data);
    chatBox.append(chatReceiveBox);
}

// 메세지 전송 서버 통신
async function sendMessage() {
    let msgInput = document.querySelector("#chat-outgoing-msg");
    let chat = {
        sender: username,
        roomNumber: roomNumber,
        msg: msgInput.value
    };

    fetch("http://localhost:8081/chat", {
        method: "post",
        body: JSON.stringify(chat),
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        }
    })

    msgInput.value = "";
}

// 보내는 메세지 박스 생성
function getSendMsgBox(data) {
    let dateFormat = dateConverter(data.createdAt);
    return `<div class="me-chat-col">
                <span class="balloon">${data.msg}</span>
            </div>
            <time>${dateFormat}</time>`;
}

// 받은 메세지 박스 생성
function getReceiveMsgBox(data) {
    let dateFormat = dateConverter(data.createdAt);
    return `<img class="profile-img" src="./img/default.png" alt="프사">
            <div class="friend-chat-col">
                <span class="profile-name">${data.sender}</span>
                <span class="balloon">${data.msg}</span>
            </div>
            <time>${dateFormat}</time>`;
}

function dateConverter(localDateTime) {
    let date = new Date(localDateTime);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let amPm = hours < 12 ? "오전" : "오후";


    return amPm + " " + hours + ":" + minutes;
}

// 전송 버튼 메세지 전송
document.querySelector("#chat-outgoing-button").addEventListener("click", () => {
    sendMessage();
})

// 엔터 키 메세지 전송
document.querySelector("#chat-outgoing-msg").addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
        sendMessage();
    }
})

