import React from 'react'

/*const Meetings =({ params }: { params: {Id: string } }) => {
  return (
    <div> Meetings Room : {params.Id}</div>
  )
}

export default Meetings*/

export default function meeting({params} :{params : {Id:string}}){
  return <h1>{params.Id}</h1>
}