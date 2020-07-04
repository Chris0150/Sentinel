import React from "react";

const useToggleState = (initialValue:any) => {
  const [value, setValue] = React.useState(initialValue);
  const toggle = ():void => setValue(!value);

  return [value, toggle];
};

export default useToggleState;