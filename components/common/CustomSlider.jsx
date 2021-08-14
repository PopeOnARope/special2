import React from 'react'

const CustomSlider = ({ itemsCount = 5, index = 1 }) => {
  return (
    <div
      sx={{
        width: '100%',
        height: '10px',
        position: 'absolute',
        top: 0,
        zIndex: 50,
        backgroundColor: 'red',
      }}
    >
      <div
        sx={{
          backgroundColor: '#FFC391',
          width: `${100 / itemsCount}%`,
          height: '10px',
          marginLeft: `${(100 / itemsCount) * index}%`,
        }}
      ></div>
    </div>
  )
}

export default CustomSlider
