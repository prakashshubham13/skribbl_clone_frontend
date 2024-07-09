import React, { useEffect, useRef } from 'react'

const useClickOutside = (fn) => {
    const ref = useRef(null);
    const check = (e) => {
        if(ref.current && !ref.current.contains(e.target))
            fn();
    }
    useEffect(() => {
      document.addEventListener('click',check)
    
      return () => {
        
      }
    }, [])
    
  return [ref];
}

export default useClickOutside