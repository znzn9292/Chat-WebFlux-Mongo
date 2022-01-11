let initRoom = "";
// SSE 연결
const eventSource = new EventSource(`http://localhost:8080/chat/room`);

eventSource.onmessage = (event) => {
    console.log("event = ", event)
    const data = JSON.parse(event.data);
    // console.log("data => ", data);

}

