import React from 'react'
import { useDrop } from 'react-dnd'

export default function Square({x,y,tryDrop,tryHit,canStart,hits,occupiedTiles,user}){
    
    function moveShip(fromX,fromY,toX,toY,size,rowOrcolumn){
        
        tryDrop(fromX,fromY,toY,toX,size,rowOrcolumn)
    }
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'ship',
        //drop: () => moveShip(x,y),
        collect: monitor => ({
          isOver: !!monitor.isOver(),
        }),
        drop: monitor => {
            console.log(x,y)
            moveShip(monitor.x,monitor.y,y,x,monitor.size,monitor.rowOrcolumn)
          }
      }), [x, y])
    function whatToDoOnClick(){
        if(canStart){
            if(inHits(x,y)){

            }else{
                tryHit(x,y,"player")
            }
            
        }
    }
    function itIncludesCoordinate(x, y) {
        //console.log(x,y)
        let temp=[...occupiedTiles]
        let xLocal = parseInt(x);
        let yLocal = parseInt(y);
  
        for (let i = 0; i < temp.length; i++) {
          if (parseInt(temp[i].x) === xLocal && parseInt(temp[i].y) === yLocal) {
            return true;
          }
          for (let j = 0; j < temp[i].others.length; j++) {
            if (
              parseInt(temp[i].others[j].x) === xLocal &&
              parseInt(temp[i].others[j].y) === yLocal
            ) {
              return true;
            }
          }
        }
        return false;
    }
      function inHits(x,y){
        let temp=[...hits]
        for(let i=0;i<temp.length;i++){
            if(x===temp[i].x&&y===temp[i].y){
                return true
            }
        }
        return false
      }
      function userWhat(){
        if(user==="pc"){
          return({
            /*boxShadow:"rgb(255 0 0) 0px 0px 18px 4px inset",
            zIndex:"1"*/
            backgroundColor:"red",
            opacity:".7"
          })
        }else{
          return({
            backgroundColor:"red",
            opacity:".7"
        })
      }
    }
      function getStyle(){
        
        if(inHits(x,y)){
           // console.log(hits)
        //console.log(occupiedTiles)
            //console.log(itIncludesCoordinate(x,y))
            if(itIncludesCoordinate(x,y)){
                return(
                    userWhat()
                )
            }else{
                return(
                    {
                        //backgroundColor:"yellow"
                        boxShadow:"rgb(251 191 36) 0px 0px 18px 4px inset"
                    }
                )
            }
        }else{
            return(
                {

                }
            )
        }
      }
    return(
        <div ref={drop} onClick={whatToDoOnClick} style={getStyle()}>

        </div>
    )
}