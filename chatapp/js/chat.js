let username = prompt("아이디를 입력하세요.");
let roomNumber = prompt("채팅방 번호를 입력하세요.");

// SSE 연결
const eventSource = new EventSource(`http://localhost:8080/chat/room/${roomNumber}`);

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
    let chatBox = document.querySelector("#chat-box");
    let chatSendBox = document.createElement("div");
    chatSendBox.className = "send_box";

    chatSendBox.innerHTML = getSendMsgBox(data);
    chatBox.append(chatSendBox);
}

// 받은 메세지 생성
function initYourMessage(data) {
    let chatBox = document.querySelector("#chat-box");
    let chatReceiveBox = document.createElement("div");
    chatReceiveBox.className = "reveive_box";

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

    fetch("http://localhost:8080/chat", {
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
    return `<div class="send_msg">
                <p>${data.msg}</p>
                <span class="time_date"> ${dateFormat} / ${data.sender}</span>
            </div>`;
}

// 받은 메세지 박스 생성
function getReceiveMsgBox(data) {
    let dateFormat = dateConverter(data.createdAt);
    return `<div class="received_msg">
                <div class="received_withd_msg">
                    <p>${data.msg}</p>
                    <span class="time_date"> ${dateFormat} / ${data.sender}</span>
                </div>
            </div>`;
}

function dateConverter(localDateTime) {
    let date = new Date(localDateTime);
    return date.getHours() + ":" + date.getMinutes() + " | " + date.getMonth() + "월 " + date.getDate() + "일";
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

