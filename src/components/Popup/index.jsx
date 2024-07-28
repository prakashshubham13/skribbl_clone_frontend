import React from 'react'

const Popup = ({open,onClose,mssg}) => {
  return (
    <>
    {open && <div style={{position:'fixed',width:'100vw',height:'100vh',background:'rgba(0,0,0,0.3)',top:'0%',left:'0%',zIndex:'999999'}}>
        <div style={{width:'25vw',height:'25vh',background:'rgba(255,255,255,0.9)',borderRadius:'0.5rem',position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)'}}>
            <div style={{display:'flex',justifyContent:'flex-end',paddingRight:'0.8rem',paddingTop:'0.5rem',cursor:'pointer'}} onClick={()=>onClose()}>X</div>
            <div style={{position:"absolute",top:'50%',left:'50%',transform:'translate(-50%,-50%)'}}>
                <h3 style={{color:'crimson'}}>{mssg}</h3>
            </div>
        </div>
        </div>}
    </>
  )
}

export default Popup