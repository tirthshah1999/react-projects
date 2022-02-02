import React, { useState, useEffect } from 'react'
import rgbToHex from './utils'

const SingleColor = ({rgb, weight, index, hexColor}) => {
  const [alert, setAlert] = useState(false);

  const bcg = rgb.join(",");  // e.g rgb is in arr [255,255,255] so convert into str like 255,255,255
  const hexValue = `#${hexColor}`;
  
  useEffect(() => {
    const id = setTimeout(() => {
      setAlert(false);
    }, 3000);

    return () => clearTimeout(id);
  }, [alert]);

  return (
    <article className={`color ${index > 10 && 'color-light'}`} style={{backgroundColor: `rgb(${bcg})
    `}} onClick={() => {
      setAlert(true);
      navigator.clipboard.writeText(hexValue);  // copy color
    }}>
      <p className='percent-value'>{weight}%</p>
      <p className='color-value'>{hexValue}</p>
      {alert && <p className='alert'>copied to clipboard</p>}
    </article>

  )
}

export default SingleColor
