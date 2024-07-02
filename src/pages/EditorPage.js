import React, { useEffect, useRef, useState } from "react";
import Client from "../components/Client";
import logo from "../n.png";
import Editor from "../components/Editor";
import {
  useNavigate,
  useLocation,
  useParams,
  Navigate,
} from "react-router-dom";
import toast from "react-hot-toast";
import { initSocket } from "../socket";

const EditorPage = () => {
  const codeRef=useRef(null);
  const [clients, setClients] = useState([]);
  const location = useLocation();
  const { roomId } = useParams();
  const socketRef = useRef(null);
  const reactnavigate = useNavigate();
  const handleLeave = () => {
    toast.success("You leave");
    reactnavigate("/");
  };

  async function handleCopyBtn(){
    try {
      await navigator.clipboard.writeText(roomId);

      toast.success('Room Id has been Copyied');

    } catch (error) {
      toast.error("Error in Copying Id");
      console.log("Error in Copying", error);
    }
  };

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      console.log(socketRef.current);
      socketRef.current.on("connect_error", (err) => handleError(err));
      socketRef.current.on("connect_failed", (err) => handleError(err));

      const handleError = (e) => {
        console.log("socket error", e);
        toast.error("Socket connection failed");
        reactnavigate("/");
      };

      socketRef.current.emit("join", {
        roomId,
        userName: location.state?.userName,
      });

      socketRef.current.on("joined", ({ socketId, userName, clients }) => {
        if (userName !== location.state?.userName) {
          toast.success(`${userName} joined`);
        }
        setClients(clients);

        socketRef.current.emit('codesync',{
          code:codeRef.current,
          socketId
        });

      });
      socketRef.current.on("disconnected", ({ socketId, userName }) => {
        toast.success(`${userName} leave`);
        setClients((prevClients) =>
          prevClients.filter((client) => client.socketId !== socketId)
        );
      });
    };

    init();

    return () => {
      socketRef.current.disconnect();
      socketRef.current.off("joined");
      socketRef.current.off("disconnected");
    };
  }, []); // Add an empty dependency array to ensure it runs only once

  if (!location.state) {
    return <Navigate to="/" />;
  }

  return (
    <div className="mainWrap">
      <div className="aside">
        <div className="asideInner">
          <div className="logo">
            <img src={logo} alt="Code Sync Logo" className="logoImg" />
          </div>
          <h3>Connected</h3>
          <div className="clientsList">
            {clients.map((client) => (
              <Client userName={client.userName} key={client.socketId} />
            ))}
          </div>
        </div>

        <button className="btn copyBtn" onClick={handleCopyBtn}>
          Copy ROOM ID
        </button>
        <button className="btn leaveBtn" onClick={handleLeave}>
          Leave
        </button>
      </div>
      <div className="editor">
        <Editor socketRef={socketRef} roomId={roomId} onCodeChange={(code)=>(codeRef.current=code)}/>
      </div>
    </div>
  );
};

export default EditorPage;
