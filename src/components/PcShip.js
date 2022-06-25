import React from 'react'


export default function PcShip({rowOrcolumn,size,x,y,tryToRotate,user,canStart,hits,ship}){
    console.log(hits)
    console.log(ship)
    function isItSunk(x,y,others){
      //console.log("calcin")
      let foundXY =false
      for (let index = 0; index < hits.length; index++) {
          if(hits[index].x===x&&hits[index].y===y){
              foundXY=true
          }
      }
      let foundOthers=[]
      for (let i = 0; i < others.length; i++) {
          for (let index = 0; index < hits.length; index++) {
              if(others[i].x===hits[index].x&&others[i].y===hits[index].y){
                  foundOthers.push(true)
              }
          }
      }
      if(foundXY&&foundOthers.length===others.length){
          return true
      }else{
          return false
      }
  }
    function determineStyle(rowOrcolumn, size, x, y) {
        if (rowOrcolumn === "row") {
          return {
            gridColumn: `${parseInt(x) + 1}`,
            gridRow: `${parseInt(y)+1}`,
            width: `${size * 40}px`,
            zIndex:"999",
            display:"block",
            opacity:"1",
            bacgkGroundColor:"red",
            pointerEvents:user!=="pc"?canStart?"none":"":""
          };
        } else {
          return {
            gridColumn: `${parseInt(x) + 1}`,
            gridRow: `${parseInt(y)+1}`,
            width: `${size * 40}px`,
          zIndex:"999",
            display:"block",
            opacity:"1",
            bacgkGroundColor:"none",
            pointerEvents:user!=="pc"?canStart?"none":"":""
          };
        }
      }
      

    function localRotate(rowOrcolumn,size,x,y){
      console.log("cfklj")
      tryToRotate(rowOrcolumn,size,x,y)
    }
    function whatToDoOnClick(){
      console.log("clidck")
      console.log(canStart)
      if(canStart){
        /*console.log("true click")
        tryHit(x,y)*/
      }else{
        console.log("rptate")
        localRotate(rowOrcolumn,size,x,y)
      }
    }
    return(
        <div
        onClick={whatToDoOnClick}
        className={user==="pc"?"pcShips occupied":"occupied"}
        
        style={determineStyle(rowOrcolumn, size, x, y)}
        
      >
        x:{parseInt(x)} y:{parseInt(y)}
      </div>
    )
}