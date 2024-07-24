import React, { useContext } from "react";
import { Theme } from "../../utils/theme/ThemeContext";
import { useSelector } from "react-redux";

const rankArr = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th'];

const GameConsole = () => {
  const { socket } = useContext(Theme);
  const { guessList, gameOn, startBtnEnable, roomId } = useSelector(
    (state) => state.game
  );
  const { playerList } = useSelector((state) => state.player);
  const {showWaitScreen,gameEnd} = useSelector((state) => state.game);
  const getSortedList = (list) => {
    return Object.keys(list).map((data)=>{
      return list[data];
    })
  }
  return (
    <>
      {!gameOn || guessList.length || showWaitScreen ? (
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {guessList.length ? (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                flexWrap: "wrap",
                alignItems: "center",
                height: "100%",
              }}
            >
              {guessList.map((data) => (
                <div
                  style={{
                    width: "280px",
                    height: "80px",
                    background: "#fff",
                    margin: "2px auto",
                    display: "grid",
                    placeItems: "center",
                    borderRadius: "5px",
                    fontWeight: 900,
                    fontSize: "26px",
                    color: "rgba(0,0,0,0.8)",
                    cursor: "pointer",
                    boxShadow: "0 0 25px rgba(0,0,0,0.2)",
                  }}
                  onClick={() => {
                    socket.emit("selected", { roomId, selectedWord: data });
                  }}
                >
                  {data}
                </div>
              ))}
            </div>
          ) : null}

          {showWaitScreen && (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{marginBottom:'1rem'}}>
                <h1 style={{color:'crimson',borderBottom:'0.11rem solid grey'}}>{gameEnd ? 'Game Over' : `Time's Up`}</h1>
              </div>
              {getSortedList(playerList).sort((a,b)=>b.score - a.score).map((data,index)=>(<div style={{width:'50%',borderRadius:'0.2rem',boxShadow:'0 0 0.2rem rgba(0,0,0,0.4)',padding:"0.2rem 0.8rem",marginTop:'0rem',display:'flex',justifyContent:'space-between',alignItems:'center',flexDirection:'row',background:'rgba(0,0,0,0.1)',fontSize:'1.2rem',fontWeight:'800',color:'rgba(0,0,0,0.5)'}}>
        <div>{data.name}{"     "} <span style={{color:'goldenrod'}}>({rankArr[index]})</span></div>  <div>{data.score}</div>
      </div>))}
            </div>
          )}

          {!gameOn && (
            <button
              style={{
                width: "80%",
                height: "60px",
                margin: "auto",
                marginBottom: "10px",
                background: startBtnEnable ? "grey" : "#13f313",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                fontWeight: 700,
                fontSize: "22px",
                letterSpacing: "3px",
              }}
              onClick={() => socket.emit("start-game", { roomId })}
              disabled={startBtnEnable}
            >
              START
            </button>
          )}
        </div>
      ) : null}
    </>
  );
};

export default GameConsole;
