import React from 'react'

function History({Data}) {
  console.log(Data)
  return (
    <div>
      {Data.map((item,index)=>{
        return <div key={index}>
        <p>{item.values}</p>
        <p>{item.Result}</p>
        </div>
      })}
    </div>
  )
}

export default History