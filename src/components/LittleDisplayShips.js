
import React from 'react'
export default function LittleDisplayShips({ships,user,hits}){
    let hitIndexes=[]
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
    for (let i = 0; i < ships.length; i++) {
        if(isItSunk(ships[i].x,ships[i].y,ships[i].others)){
            hitIndexes.push(i)
        }
    }
    //console.log(hitIndexes)
    let displayTheseShips=ships.map((x,index)=><div className={hitIndexes.includes(index)?'small-ship-container sunk':'small-ship-container'}><div className='small-square'></div>{x.others.map(y=><div className='small-square'></div>)}</div>)
    return(
        <div className={user==="pc"?"pc-Ships":'little-ships'}>
            {displayTheseShips}
        </div>
    )
}