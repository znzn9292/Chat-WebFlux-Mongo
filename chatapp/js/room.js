let initRoom = "";
// SSE 연결
const eventSource = new EventSource(`http://localhost:8081/room`);

eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);

    let talkLineArea = document.querySelector("#talk_line_area");
    let talkLineBox = document.createElement("li");
    talkLineBox.innerHTML = getTalkLise(data);
    talkLineArea.append(talkLineBox);
}

function getTalkLise(data) {
    return `<a href="#" onclick=roomJoin(${data.roomNumber})>
                <img src="./img/k-pay.png" class="profile-img" alt="k페이프로필사진">
                <div class="talk">
                    <p class="friend-name">${data.title}</p>
                    <p class="chat-content">메시지가 도착했습니다.</p>
                </div>
                <div class="chat-status">
                    <time datetime="15:40:00+09:00">오후 3:40</time>
                    <span class="chat-balloon">1</sapn>
                </div>
            <a href="#">`;
}

// 채팅방 이동
function roomJoin(roomNumber) {
    location.href = "/chat2.html?roomNumber=" + roomNumber;
}