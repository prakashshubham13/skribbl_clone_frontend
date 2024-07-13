import React from 'react'
import { useSelector } from 'react-redux';
import styles from '../../pages/Home.module.css'
import {avatar_list, color_coordinated, eyes_coordinated, mouth_coordinated} from '../../pages/Home'

const Scoreboard = () => {
  const {playerList} = useSelector(state=>state.player);
  console.log(playerList); 
  return (
    <div className="score_contr">
            {Object.keys(playerList).map((data)=>(<div style={{width:'90%',borderRadius:'0.2rem',boxShadow:'0 0 0.2rem rgba(0,0,0,0.4)',padding:"0rem 0.8rem",margin:'0 auto',marginTop:'0.6rem',display:'flex',justifyContent:'space-between',alignItems:'center',flexDirection:'row',background:'rgba(0,0,0,0.1)',fontSize:'1rem',fontWeight:'800',color:'rgba(0,0,0,0.5)',background: playerList[data].role == 'performer' ? 'orange' : (playerList[data].guess && !playerList[data].present) ? 'lightgreen' : (!playerList[data].present) ? 'grey' : playerList[data].guess ? 'green' : 'white'}}>
        <div style={{display:'flex',alignItems:'center'}}>
        {playerList[data].role}

          <div className={styles.avatar_container}>
              <div className={styles.avatar} style={{ "--size": 26 + "px" }}>
                <div
                  className={styles.color}
                  style={{
                    "--coordinateX": color_coordinated[playerList[data].avatar.color].x + "%",
                    "--coordinateY": color_coordinated[playerList[data].avatar.color].y + "%",
                  }}
                ></div>
                <div
                  className={styles.eyes}
                  style={{
                    "--coordinateX": eyes_coordinated[playerList[data].avatar.eyes].x + "%",
                    "--coordinateY": eyes_coordinated[playerList[data].avatar.eyes].y + "%",
                  }}
                ></div>
                <div
                  className={styles.mouth}
                  style={{
                    "--coordinateX": mouth_coordinated[playerList[data].avatar.mouth].x + "%",
                    "--coordinateY": mouth_coordinated[playerList[data].avatar.mouth].y + "%",
                  }}
                ></div>
                {/* <div className={styles.special}></div> */}
                <div className={styles.owner}></div>
              </div>
          

          </div>
          {playerList[data].name}
          
          </div> 
          
           <div>{playerList[data].score}</div>
      </div>))}
    </div>
  )
}

export default Scoreboard