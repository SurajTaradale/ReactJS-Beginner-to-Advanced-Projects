import React from 'react'

function Button({ dispatch, Data }) {
  return (
    <button className={Data.class} onClick={() => dispatch({ type: Data.action , payload: { value:Data.value } })} >{Data.value}</button>
  )
}

export default Button