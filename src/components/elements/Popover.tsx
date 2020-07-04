import React from 'react';

interface IPropsModel {
  children: any
  height: number
  width: number
  right?: number
  top: number
  left?: number
  backgroundColor: string
}

const Popover = (props:IPropsModel) => {
  const { children, height, width, right, top, left } = props;

  return (
    <div style={{
        width: width,
        height: height,
        top: top,
        right: right,
        left: left,
        zIndex: 5000000,
        textAlign: "center",
        position: "absolute",
        }}
        >
     {children}
    </div>
  );
}

export default Popover;