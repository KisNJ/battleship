import React from 'react'
import { useDrag } from 'react-dnd'

export default function Ship({rowOrcolumn,size,x,y,tryToRotate,user,canStart}){
    
    function determineStyle(rowOrcolumn, size, x, y) {
        if (rowOrcolumn === "row") {
          return {
            gridColumn: `${parseInt(x) + 1}`,
            gridRow: `${parseInt(y)+1}`,
            width: `${size * 40}px`,
          zIndex:user!=="pc"?isDragging?"-1":"10":canStart?"-1":isDragging?"-1":"10",
            display:user!=="pc"?isDragging?"block":"block":canStart?"none":isDragging?"block":"10",
            bacgkGroundColor:user==="pc"?!isDragging?"none":"":"",
            pointerEvents:user!=="pc"?canStart?"none":"":""
          };
        } else {
          return {
            gridColumn: `${parseInt(x) + 1}`,
            gridRow: `${parseInt(y)+1}`,
            height: `${size * 40}px`,
            zIndex:user!=="pc"?isDragging?"-1":"10":canStart?"-1":isDragging?"-1":"10",
            display:user!=="pc"?isDragging?"block":"block":canStart?"none":isDragging?"block":"10",
            pointerEvents:user!=="pc"?canStart?"none":"":""
          };
        }
      }
      
      const [{ isDragging }, dragRef] = useDrag({
        type: user!=="pc"?'ship':"ship2",
        item: {rowOrcolumn,size,x,y},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            item: monitor.getItem(),
        })
    })
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
        ref={dragRef}
      >
        x:{parseInt(x)} y:{parseInt(y)}
      </div>
    )
}