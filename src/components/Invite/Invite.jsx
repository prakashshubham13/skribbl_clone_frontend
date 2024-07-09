import React from 'react'
import useCopy from '../../custom_hooks/useCopy'
import styles from './Invite.module.css';
import { useSelector } from 'react-redux';
const Invite = () => {
  const [copyRef, triggerCopy] = useCopy();
  const roomId = useSelector((state)=>state.game.roomId);
  return (
    <div className={`invite_contr`}>
    <div className={`${styles.container}`}>
      <input tabIndex={-1} className={styles.copy_text} ref={copyRef} type="text" readOnly name="" id="" value={`${process.env.REACT_APP_BASE_URL}/${roomId}`} />
      <div className={styles.copy_btn} onClick={()=>triggerCopy()}>Copy Invite</div>
    </div>
    </div>
  )
}

export default Invite