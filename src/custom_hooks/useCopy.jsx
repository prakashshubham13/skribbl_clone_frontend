import React, { useRef } from 'react'

const useCopy = () => {
    const copyRef = useRef(null);
    const copyFn = async() => {
        try {
            const success = await navigator.clipboard.writeText(copyRef.current.value);
            console.log(success);
        } catch (error) {
            console.log(error);
        }
    }
  return [copyRef, copyFn];
}

export default useCopy;