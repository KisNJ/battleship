import React from 'react'


export default function PcSquare({x,y,tryDrop,tryHit,canStart,hits,occupiedTiles}){
    
    function moveShip(fromX,fromY,toX,toY,size,rowOrcolumn){
        
        tryDrop(fromX,fromY,toY,toX,size,rowOrcolumn)
    }

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
      function getStyle(){
        
        if(inHits(x,y)){
           // console.log(hits)
        //console.log(occupiedTiles)
            //console.log(itIncludesCoordinate(x,y))
            if(itIncludesCoordinate(x,y)){
                return(
                    {
                        backgroundColor:"red"
                    }
                )
            }else{
                return(
                    {
                        backgroundColor:"yellow"
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
        <div  onClick={whatToDoOnClick} style={getStyle()}>

        </div>
    )
}