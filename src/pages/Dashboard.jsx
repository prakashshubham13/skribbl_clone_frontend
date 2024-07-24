import React, { useContext, useEffect, useState } from "react";
import Logo from "../components/Logo/Logo";
import Header from "../components/Header/Header";
import Scoreboard from "../components/Scoreboard/Scoreboard";
import Chatboard from "../components/Chatboard/Chatboard";
import Toolbar from "../components/Toolbar/Toolbar.jsx";
import Canvas from "../components/Canvas/Canvas.jsx";
import "./Dashboard.css";
import Invite from "../components/Invite/Invite.jsx";
import CanvasProvider, {
  CanvasContext,
} from "../utils/canvas/CanvasProvider.jsx";
import { Theme } from "../utils/theme/ThemeContext.jsx";
import { useDispatch, useSelector } from "react-redux";
import { updateTime } from "../redux/timerSlice.js";
import { updatePlayer } from "../redux/playerSlice.js";
import { updateChatList } from "../redux/chatSlice.js";
import {
  setGameEnd,
  updateCurrentRound,
  updateGameOn,
  updateGuessList,
  updateHint,
  updateMssg,
  updateReadyEnable,
  updateShowWaitScreen,
  updateTotalRound,
} from "../redux/gameSlice.js";
import join_play from '../assets/sounds/join.mp3';
import right_play from '../assets/sounds/right.mp3';
import round_play from '../assets/sounds/round.mp3';

const Dashboard = () => {
  const { socket } = useContext(Theme);


  const roomId = useSelector(state=>state.game.roomId);

  const dispatch = useDispatch();

  const { getBoardRef, getCanvasStack, enableCanvas, toggleEnabledCanvas } =
    useContext(CanvasContext);

  const boardRef = getBoardRef();
  const canvasStack = getCanvasStack();

  const [guessWordList, setGuessWordList] = useState([]);
  const [statusMssg, setStatusMssg] = useState("");
  const [timer, setTimer] = useState(0);
  const [hint, setHint] = useState("");

const join_audio = new Audio(join_play);
const right_audio = new Audio(right_play);
const round_audio = new Audio(round_play);

  const playSound = (event) => {
    switch (event) {
      case 'join':
        join_audio.play();
        break;
      case 'right':
        right_audio.play();
        console.log("Rfsdffvbb vb v bv b cv cf");
        break;
      case 'round':
          round_audio.play();
          break;
      default:
        break;
    }
  }

  /*Canvas Vars*/

  function draw(canvas, context, data, WIDTH, HEIGHT) {
    switch (data.action) {
      case "start": {
        context.strokeStyle = data.color;
        context.lineWidth = data.size;
        context.beginPath();
        context.moveTo(data.x * (WIDTH / 100), data.y * (HEIGHT / 100));
        break;
      }
      case "draw": {
        context.lineTo(data.x * (WIDTH / 100), data.y * (HEIGHT / 100));
        context.stroke();
        break;
      }
      case "stop": {
        context.lineTo(data.x * (WIDTH / 100), data.y * (HEIGHT / 100));
        context.stroke();
        break;
      }
      default:
        break;
    }
  }

  function redraw() {
    const canvas = boardRef.current;
    const context = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const WIDTH = canvas.offsetWidth;
    const HEIGHT = canvas.offsetHeight;
    canvasStack.current.forEach((arr) => {
      arr.forEach((data) => draw(canvas, context, data, WIDTH, HEIGHT));
    });
  }

  function clear() {
    if (!canvasStack.current.length) return;
    const canvas = boardRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    canvasStack.current = [];
    socket.emit("performer-drawing", {
      roomId,
      drawArray: canvasStack.current,
    });
  }

  function undo() {
    if (!canvasStack.current.length) return;
    canvasStack.current.pop();
    socket.emit("performer-drawing", {
      roomId,
      drawArray: canvasStack.current,
    });
    redraw();
    console.log(canvasStack.current);
  }

  function statusGenerator(data) {
    console.log("<<<<<<<<<<<<<<<<<<<<<<<<<", data);
    switch (data.status) {
      case "ready": {
        toggleEnabledCanvas(false);
        dispatch(updateTotalRound(data.config.totalRound));
        dispatch(updateReadyEnable(data.config.ready));
        dispatch(updateGameOn(data.config.gameStart));
        break;
      }
      case "start-error": {
        dispatch(updateMssg(data.mssg));
        break;
      }
      case "select": {
        dispatch(updateShowWaitScreen(false));
        toggleEnabledCanvas(false);
        dispatch(updateReadyEnable(false));
        dispatch(updateGameOn(true));
        dispatch(updateGuessList(data.data));
        dispatch(updateMssg(data.mssg));
        dispatch(updateCurrentRound(data.currentRound));
        canvasStack.current = [];
        redraw();
        break;
      }
      case "selecting": {
        dispatch(updateShowWaitScreen(false));
        toggleEnabledCanvas(false);
        dispatch(updateReadyEnable(false));
        dispatch(updateGameOn(true));
        setStatusMssg(data.mssg);
        dispatch(updateMssg(data.mssg));
        dispatch(updateCurrentRound(data.currentRound));
        canvasStack.current = [];
        redraw();
        break;
      }
      case "draw": {
        toggleEnabledCanvas(true);
        dispatch(updateGuessList([]));
        dispatch(updateMssg(data.mssg));
        break;
      }
      case "drawing": {
        console.log("888888888888888888888888888888888888888888888888888888888888888888888");
        console.log(data);
        toggleEnabledCanvas(false);
        dispatch(updateMssg(data.mssg));
        canvasStack.current = data.data;
        redraw();
        break;
      }
      case "timer": {
        console.log(data.time);
        setTimer(data.time);
        break;
      }
      case "hint": {
        dispatch(updateHint(data.data));
        break;
      }
      case "wait": {
        playSound('round');
        toggleEnabledCanvas(false);
        console.log("WAIT");
        dispatch(updateShowWaitScreen(true));
        dispatch(updateHint(""));
        dispatch(updateMssg(data.mssg));
        canvasStack.current = [];
        redraw();
        break;
      }
      case "end": {
        toggleEnabledCanvas(false);
        dispatch(setGameEnd(true));
        console.log("ENDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD");
        break;
      }
      case "perform-draw": {
        canvasStack.current = data.data;
        console.log(
          "----------------------------Perform draw-----------------------------"
        );
        console.log(data.data);
        console.log(canvasStack.current);
        redraw();
        break;
      }
      default:
        break;
    } 
  }
  /*Canvas Vars*/

  const [mssg, setMssg] = useState("Need Atleast 2 players to start the game");
  useEffect(() => {
    console.log("888888888888888888888888888888888", socket);
    socket.emit("in-game", { roomId });
    socket.on("start-error", ({ checkJoin }) => {
      console.log(checkJoin.mssg);
      console.log(
        "-----------------------------000000000000000000--------------"
      );
      setMssg(checkJoin.mssg);
    });
    socket.on("notify", (data) => statusGenerator(data));
    socket.on("player-info", (data) => dispatch(updatePlayer(data.data)));
    socket.on("send-chat", (data) => {
      console.log(data);
      if(data.color)
        playSound('right');
      dispatch(updateChatList(data));
    });
    socket.on("timer", (data) => {
      console.log("Timer---", data);
      setTimer(data.time);
      dispatch(
        updateTime({
          time: data.time,
          showTime: data.timerRunning,
        })
      );
    });
    socket.on('play',(data)=>playSound(data.sound))
  }, []);

  return (
    <div className="game">
      <div className="game-wrapper">
        {/** Game Logo */}
        <Logo />
        {/** Game Bar */}
        <Header />
        {/** Game Player */}
        <Scoreboard />
        {/** Game Canvas */}
        {/* <CanvasProvider> */}
        <Canvas undo={undo} clear={clear} draw={draw} redraw={redraw} />

        <Toolbar value={{ undo, clear }} />

        {/* {value => (
          <> */}
        {/** Toolbar */}

        {/* </>
        )} */}
        {/* </CanvasProvider> */}
        {/** Game Chat */}
        <Chatboard />
        {/** Invite */}
        <Invite />
      </div>
    </div>
  );
};

export default Dashboard;
