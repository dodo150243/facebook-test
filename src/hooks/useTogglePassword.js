import { useState } from 'react';

const useTogglePassword = (initialState = false) => {
  const [isShow, setIsShow] = useState(initialState);

  return [isShow, setIsShow];
};

export default useTogglePassword;
