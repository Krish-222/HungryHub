import React, { useContext } from 'react'
import {createContext,useReducer} from "react"
const cartstateContext=createContext();
const cartDispatchContext=createContext();
const reducer= (state,action)=>{
  const {type}=action
  const {name,selectType,price,selectQty}=action
  switch(type){
    case "ADD":
      console.log(state);
      let ar=[...state]
       ar.splice(ar.length-1,0,{name,selectType,selectQty,price})
      return ar

    case "REMOVE":
      let arr=[...state];
      arr.splice(action.position,1);
      return arr;
    
    case "UPDATE":
      let c=0;
      for(const item of state){     
        if(item.id===action.id){
          break; 
        }
        c++;
      }
      // console.log(state)
      const updatedState=[...state]
      updatedState.splice(c, 1, { name, selectType, selectQty, price });
      console.log(updatedState)
      return updatedState;

    case "DROP":
      return []
      

    default:
      return "error in reducer";
    }
}


export const CartProvider=({children})=> {
    let [state,dispatch]=useReducer(reducer,[]);

  return (
    <cartDispatchContext.Provider value={dispatch}>
        <cartstateContext.Provider value={state}>
            {children}
        </cartstateContext.Provider>
    </cartDispatchContext.Provider>
  )
}



export const useCart=()=>useContext(cartstateContext);
export const useDispatchCart=()=>useContext(cartDispatchContext);
