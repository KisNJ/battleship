import React from 'react'
import { useDrag } from 'react-dnd'

export default function Ship({rowOrcolumn,size,x,y,tryToRotate,user,canStart,hits,ship}){
  function isItSunk(x,y,others){
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
let isThisShipSunk=isItSunk(x,y,ship.others)
    function determineStyle(rowOrcolumn, size, x, y) {
        if (rowOrcolumn === "row") {
          return {
            gridColumn: `${parseInt(x) + 1}`,
            gridRow: `${parseInt(y)+1}`,
            width: `${size * 40}px`,
            zIndex:user==="pc"&&isThisShipSunk?"999":(user!=="pc"?isDragging?"-1":"10":canStart?"-1":isDragging?"-1":"10"),
            display:user==="pc"&&isThisShipSunk?"block":(user!=="pc"?isDragging?"block":"block":canStart?"none":isDragging?"block":"10"),
            opacity:user==="palyer"?"1":user==="pc"&&isThisShipSunk?"1":"0",
            bacgkGroundColor:user==="pc"?!isDragging?"none":"":"",
            pointerEvents:user!=="pc"?canStart?"none":"":""
          };
        } else {
          return {
            gridColumn: `${parseInt(x) + 1}`,
            gridRow: `${parseInt(y)+1}`,
            height: `${size * 40}px`,
            zIndex:user==="pc"&&isThisShipSunk?"999":(user!=="pc"?isDragging?"-1":"10":canStart?"-1":isDragging?"-1":"10"),
            display:user==="pc"&&isThisShipSunk?"block":(user!=="pc"?isDragging?"block":"block":canStart?"none":isDragging?"block":"10"),
            opacity:user==="palyer"?"1":user==="pc"&&isThisShipSunk?"1":"0",
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
      tryToRotate(rowOrcolumn,size,x,y)
    }
    function whatToDoOnClick(){

      if(canStart){

      }else{

        localRotate(rowOrcolumn,size,x,y)
      }
    }
    return(
        <div
        onClick={whatToDoOnClick}
        className={user==="pc"?"pcShips occupied":"occupied "}
        
        style={determineStyle(rowOrcolumn, size, x, y)}
        ref={dragRef}
      >
        
      </div>
    )
}