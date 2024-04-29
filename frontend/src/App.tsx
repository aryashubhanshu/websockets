import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState<string[]>([]);
  const [userMessage, setUserMessage] = useState("");

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    ws.onopen = () => {
      console.log("connected");
      setSocket(ws);
    };
    ws.onmessage = (message) => {
      console.log("Received message: ", message.data);
      setMessage((m) => [...m, message.data]);
    };

    return () => {
      ws.close();
    };
  }, []);

  if (!socket) {
    return <div>Connecting to socket server...</div>;
  }

  return (
    <div>
      <div style={{ border: "1px solid white", width: "30vw" }}>
        {message.map((m, ind) => (
          <div style={{ padding: "5px" }} key={ind}>
            {m}
          </div>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          display: "flex",
          gap: "10px",
          justifyContent: "center",
        }}
      >
        <input
          style={{
            width: "20vw",
            border: "1px solid white",
            backgroundColor: "transparent",
            padding: "5px 15px",
            borderRadius: "10px",
          }}
          type="text"
          onChange={(e) => setUserMessage(e.target.value)}
        />
        <button onClick={() => socket.send(userMessage)}>Send Message</button>
      </div>
    </div>
  );
};

export default App;
