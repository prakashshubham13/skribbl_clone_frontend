import React, { useEffect, useState } from 'react'

const useMediaWidth = () => {
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
      const getWidth = () => {
        setWidth(window.innerWidth);
      }
    window.addEventListener('resize',getWidth);
      return () => {
        window.removeEventListener('resize',getWidth);
      }
    }, [])
    
  return width;
}

export default useMediaWidth;