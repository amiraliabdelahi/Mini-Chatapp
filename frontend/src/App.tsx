import { useState } from "react";
import Chatroom from "./pages/Chat-room";
import { socket } from "./socket";
function App() {
  const [showchat, setShowchat] = useState(false);
  const [username, setUsername] = useState("");
  const handleLogin = () => {
    if (username !== "") setShowchat(true);
    socket.emit("sendUsername", username);
  };
  return (
    <>
      {!showchat ? (
        <div className="space-y-4 p-10 bg-white rounded-lg">
          <h1 className="text-3xl text-purple-500 font-semibold">ChatRoad!</h1>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              autoFocus
              className="p-3 outline-none bg-[#dedede] rounded-md"
              placeholder="Username"
            />
            <button
              type="submit"
              className="bg-purple-500 p-3 rounded-md text-white font-semibold cursor-pointer"
            >
              Login
            </button>
          </form>
        </div>
      ) : (
        <Chatroom username={username} />
      )}
    </>
  );
}

export default App;
