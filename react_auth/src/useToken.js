import {useState} from 'react';

export default function useToken(){
    const [jwtoken, setToken] = useState(getToken());
    
    function getToken(){
    const tokenString = localStorage.getItem('token');
    const token = JSON.parse(tokenString);
    return token?.token
  }

  const saveToLocal = userToken => {
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
      setToken: saveToLocal,
      jwtoken
  }

}

  