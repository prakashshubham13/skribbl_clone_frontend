import React, { useContext, useEffect, useRef, useState } from "react";
import { CanvasContext } from "../../utils/canvas/CanvasProvider";
import { useSelector } from "react-redux";
import { Theme } from "../../utils/theme/ThemeContext";
import styles from "./Chatboard.module.css";

const Chatboard = () => {
  const { socket } = useContext(Theme);
  const chatList = useSelector((state) => state.chat.chatList);
  const roomId = useSelector((state) => state.game.roomId);
  const [inputValue, setInputValue] = useState("");
  const [isScrollBottom, setIsScrollBottom] = useState(true);
  const ref = useRef(null);
  const sendChat = (e) => {
    // e.preventDefault();
    // e.stopPropagation();
    console.log("------------");
    if (e.key == "Enter") {
      socket.emit("chat", { roomId, guess: inputValue });
      setInputValue("");
    }
  };


  useEffect(() => {
    const chatContainer = ref.current;
    const bottomScrollCheck = () => {
      const { scrollHeight, scrollTop, clientHeight } = chatContainer;
      console.log(scrollHeight, scrollTop+ clientHeight + ( 2* 0.2 * 16));
      if(scrollHeight <= scrollTop+ clientHeight + ( 2* 0.2 * 16))
        {
          console.log("true------------------------");
          setIsScrollBottom(true);
        }else{
          setIsScrollBottom(false)
        }
    }
  chatContainer.addEventListener('scroll',bottomScrollCheck);
    return () => {
      
    }
  }, [])
  

  
  useEffect(() => {
    const chatContainer = ref.current;
    if (chatContainer) {
      const { scrollHeight, scrollTop, clientHeight } = chatContainer;
      console.log(scrollHeight, scrollTop+ clientHeight + ( 2* 0.2 * 16));
      if (isScrollBottom) {
        console.log('sss');
        chatContainer.scrollTop = scrollHeight - clientHeight;
      }
    }
  }, [chatList]);

  return (
    <div className={`chat_contr`}>
      <div className={` ${styles.chat_container}`} ref={ref}>
        {chatList.map((data) => (
          <div className={styles.chat_chip} style={{ '--color': data.color? 'rgb(102 235 102)' : 'white' }}>
            
            <div className={styles.chat_label}>{data.name}</div>
                        <p>{data.data}</p>
          </div>
        ))}
      </div>
      <div className={styles.chat_form}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            console.log(e.target);
            setInputValue(e.target.value);
          }}
          className={styles.chat_input}
          onKeyDown={sendChat}
        />
        <div className={styles.chat_length}>{inputValue.length}</div>
      </div>
    </div>
  );
};

export default Chatboard;
