import React from 'react'
import styles from './Header.module.css'
import { useSelector } from 'react-redux';
const Header = () => {
  const time = useSelector((state)=>state.timer.time);
  const showTime = useSelector((state)=>state.timer.showTime);
  const mssg = useSelector((state)=>state.game.mssg);
  const hint = useSelector((state)=>state.game.hint);
  const currentRound = useSelector((state)=>state.game.currentRound);
  const totalRound = useSelector((state)=>state.game.totalRound);
  return (
    <div className="header_contr">
      <div className={styles.col_1}>
        <div className={styles.clock}>{showTime ? time : null}</div>
        <div>Round {currentRound} of {totalRound}</div>
      </div>
      <div className={styles.col_2}>{hint && 'hint:'}{" "}<span>{hint}</span></div>
      <div className={styles.col_3}>{mssg}</div>
    </div>
  )
}

export default Header