import React,{useState,createContext} from 'react'

export const ContextApi =createContext();
const ContextProvider = (props) => {

    const [user, setUser] = useState({});
   
  return (
    <ContextApi.Provider value={{user, setUser}}>
        {props.children}
        </ContextApi.Provider>
  )
}

export default ContextProvider