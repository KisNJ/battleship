import { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import Ship from "./Ship";
import Square from "./Square";

export default function Grid({user,setParentState,canStart,turn,tryHit,hits,winner}) {
  const [occupiedTiles, setOccupiedTiles] = useState([]);
  const [moveThisShip, setMoveThisShip] = useState("");

  const ships = [
    { size: 4, quantity: 1 },
    { size: 3, quantity: 2 },
    { size: 2, quantity: 3 },
    { size: 1, quantity: 4 },
  ];
  useEffect(()=>{
    setParentState(occupiedTiles)
  },[occupiedTiles])
  useEffect(() => {
    let x, y;

    let temp = [];

    for (let i = 0; i < ships.length; i++) {
      for (let j = 0; j < ships[i].quantity; j++) {
        let rowOrcolumn = Math.random() > 0.5 ? "row" : "column";
        if (ships[i].size > 1) {
          if (rowOrcolumn === "row") {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
            while (
              x > 9 - ships[i].size + 1 ||
              itIncludesCoordinate(x, y) ||
              !isTheEnoughSpace(ships[i].size, x, y, rowOrcolumn).whatToReturn
            ) {
              y = Math.floor(Math.random() * 10);

              x = Math.floor(Math.random() * 10);
            }
            temp = [
              ...temp,
              {
                x,
                y,
                size: ships[i].size,
                rowOrcolumn,
                others: isTheEnoughSpace(ships[i].size, x, y, rowOrcolumn)
                  .others,
              },
            ];
          } else {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
            while (
              parseInt(y) > 9 - ships[i].size + 1 ||
              itIncludesCoordinate(x, y) ||
              !isTheEnoughSpace(ships[i].size, x, y, rowOrcolumn).whatToReturn
            ) {
              x = Math.floor(Math.random() * 10);

              y = Math.floor(Math.random() * 10);
            }
            temp = [
              ...temp,
              {
                x,
                y,
                size: ships[i].size,
                rowOrcolumn,
                others: isTheEnoughSpace(ships[i].size, x, y, rowOrcolumn)
                  .others,
              },
            ];
          }
        } else {
          x = Math.floor(Math.random() * 10);
          y = Math.floor(Math.random() * 10);
          while (itIncludesCoordinate(x, y)) {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
          }
          temp = [...temp, { x, y, size: 1, rowOrcolumn: "row", others: [] }];
        }
      }
    }
    function itIncludesCoordinate(x, y) {
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

    function isTheEnoughSpace(size, xHead, yHead, rowOrcolumn) {
      
      let coordsThatCouldBeInWay = [];
      if (rowOrcolumn === "row") {
        let yLocal = parseInt(yHead);
        for (let i = 0; i < size - 1; i++) {
          let x = parseInt(xHead) + i + 1;
          coordsThatCouldBeInWay = [
            ...coordsThatCouldBeInWay,
            { x, y: yLocal },
          ];
        }
      } else {
        let xLocal = parseInt(xHead);
        for (let i = 0; i < size - 1; i++) {
          let y = parseInt(yHead) + i + 1;
          coordsThatCouldBeInWay = [
            ...coordsThatCouldBeInWay,
            { x: xLocal, y },
          ];
        }
      }
      let whatToReturn = true;
      for (let i = 0; i < coordsThatCouldBeInWay.length; i++) {
        let xk = parseInt(coordsThatCouldBeInWay[i].x);
        let yk = parseInt(coordsThatCouldBeInWay[i].y);
        if (itIncludesCoordinate(xk, yk)) {
          whatToReturn = false;
        }
      }
      
      return { whatToReturn, others: coordsThatCouldBeInWay };
    }
    setOccupiedTiles(temp);
  }, [winner]);
  
  useEffect(() => {
    
    if (moveThisShip !== "") {
      let temp = [...occupiedTiles];
      function itIncludesCoordinate(x, y, fromX, fromY) {
        
        let xLocal = parseInt(x);
        let yLocal = parseInt(y);

        for (let i = 0; i < temp.length; i++) {
          if (temp[i].x !== fromX || temp[i].y !== fromY) {
            if (
              parseInt(temp[i].x) === xLocal &&
              parseInt(temp[i].y) === yLocal
            ) {
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
        }
        
        return false;
      }
      function isTheEnoughSpace(size, xHead, yHead, rowOrcolumn, fromX, fromY) {
        let coordsThatCouldBeInWay = [];
        if (rowOrcolumn === "row") {
          let yLocal = parseInt(yHead);
          for (let i = 0; i < size - 1; i++) {
            let x = parseInt(xHead) + i + 1;
            coordsThatCouldBeInWay = [
              ...coordsThatCouldBeInWay,
              { x, y: yLocal },
            ];
          }
        } else {
          let xLocal = parseInt(xHead);
          for (let i = 0; i < size - 1; i++) {
            let y = parseInt(yHead) + i + 1;
            coordsThatCouldBeInWay = [
              ...coordsThatCouldBeInWay,
              { x: xLocal, y },
            ];
          }
        }
        let whatToReturn = true;
        for (let i = 0; i < coordsThatCouldBeInWay.length; i++) {
          let xk = parseInt(coordsThatCouldBeInWay[i].x);
          let yk = parseInt(coordsThatCouldBeInWay[i].y);
          if (itIncludesCoordinate(xk, yk, fromX, fromY)) {
            whatToReturn = false;
          }
        }

        
        return { whatToReturn, others: coordsThatCouldBeInWay };
      }

      if (
        isTheEnoughSpace(
          moveThisShip.size,
          moveThisShip.toX,
          moveThisShip.toY,
          moveThisShip.rowOrcolumn,
          moveThisShip.fromX,
          moveThisShip.fromY
        ).whatToReturn  &&
        (moveThisShip.rowOrcolumn === "row"
          ? moveThisShip.toX <= 9 - moveThisShip.size + 1
          : parseInt(moveThisShip.toY) <= 9 - moveThisShip.size + 1)
      ) {

        for (let i = 0; i < temp.length; i++) {
          if (
            parseInt(temp[i].x) === parseInt(moveThisShip.fromX) &&
            parseInt(temp[i].y) === parseInt(moveThisShip.fromY)
          ) {
            temp[i].x = parseInt(moveThisShip.toX);
            temp[i].y = parseInt(moveThisShip.toY);
            temp[i].others = isTheEnoughSpace(
              moveThisShip.size,
              moveThisShip.toX,
              moveThisShip.toY,
              moveThisShip.rowOrcolumn,
              moveThisShip.fromX,
              moveThisShip.fromY
            ).others;
          }
        }
        
        setOccupiedTiles([...temp]);
        
      }
    }
  }, [moveThisShip]);

  function tryDrop(fromX, fromY, toX, toY, size, rowOrcolumn) {
    setMoveThisShip({ fromX, fromY, toX, toY, size, rowOrcolumn });
  }
  let SquareArr = [];
  for (let k = 0; k < 10; k++) {
    for (let m = 0; m < 10; m++) {
      SquareArr.push(<Square user={user}y={k} x={m} tryDrop={tryDrop} tryHit={tryHit} canStart={canStart} hits={hits} occupiedTiles={occupiedTiles}/>)
    }
  }
  
  function itIncludesCoordinate(x, y) {
    let temp=[...occupiedTiles]      
    let xLocal = parseInt(x);
    let yLocal = parseInt(y);
    for (let i = 0; i < temp.length; i++) {
      
        if (
          parseInt(temp[i].x) === xLocal &&
          parseInt(temp[i].y) === yLocal
        ) {
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
  function isThereEnoughSpace(rowOrcolumn,size,xHead,yHead){
    let coordsThatCouldBeInWay = [];
    if (rowOrcolumn === "row") {
      let yLocal = parseInt(yHead);
      for (let i = 0; i < size - 1; i++) {
        let x = parseInt(xHead) + i + 1;
        coordsThatCouldBeInWay = [
          ...coordsThatCouldBeInWay,
          { x, y: yLocal },
        ];
      }
    } else {
      let xLocal = parseInt(xHead);
      for (let i = 0; i < size - 1; i++) {
        let y = parseInt(yHead) + i + 1;
        coordsThatCouldBeInWay = [
          ...coordsThatCouldBeInWay,
          { x: xLocal, y },
        ];
      }
    }
    let whatToReturn = true;
    for (let i = 0; i < coordsThatCouldBeInWay.length; i++) {
      let xk = parseInt(coordsThatCouldBeInWay[i].x);
      let yk = parseInt(coordsThatCouldBeInWay[i].y);
      if (itIncludesCoordinate(xk, yk)) {
        
        whatToReturn = false;
      }
    }


    return { whatToReturn, others: coordsThatCouldBeInWay };
  }
  function tryToRotate(rowOrcolumn,size,x,y){
    if(user!=="pc"){

      let temp=[...occupiedTiles]
      let coordsThatCouldBeInWay = [];
      
      if(rowOrcolumn==="row"){
        
        
        if(isThereEnoughSpace("column",size,x,y).whatToReturn){
          if(parseInt(y) <= 9 - size + 1){            
          for (let i = 0; i < temp.length; i++) {
            if(temp[i].x===x&&temp[i].y===y){
              
              temp[i].rowOrcolumn="column"
              let xLocal = parseInt(x);
              for (let i = 0; i < size - 1; i++) {
                let yLocal = parseInt(y) + i + 1;
                coordsThatCouldBeInWay = [
                  ...coordsThatCouldBeInWay,
                  { x: xLocal, y:yLocal },
                ];
              }
              temp[i].others=coordsThatCouldBeInWay
            }
            
          }
         
          setOccupiedTiles([...temp])}
        }
      }else{
        if(isThereEnoughSpace("row",size,x,y).whatToReturn){
          
          if(parseInt(x) <= 9 - size + 1){
          for (let i = 0; i < temp.length; i++) {
            if(temp[i].x===x&&temp[i].y===y){
              temp[i].rowOrcolumn="row"
              let yLocal = parseInt(y);
              for (let i = 0; i < size - 1; i++) {
                let xLocal = parseInt(x) + i + 1;
                coordsThatCouldBeInWay = [
                  ...coordsThatCouldBeInWay,
                  { x:xLocal, y: yLocal },
                ];
              }
              temp[i].others=coordsThatCouldBeInWay
            }
            
          }
          setOccupiedTiles([...temp])}
        }
      }
    }
  }

  return (
    <div className="grid">
      {user==="pc"&&!canStart?<div id="blocking"></div>:""}
      {user!=="pc"?<div id="mask" style={!canStart?{display:"none"}:{}}></div>:""}
      {user==="pc"&&turn==="pc"?<div id="mask" style={!canStart?{display:"none"}:{}}></div>:""}
      <div className="not" style={{ gridArea: "X" }}>
        X
      </div>
      <div style={{ gridArea: "A" }} className="not">
        A
      </div>
      <div style={{ gridArea: "B" }} className="not">
        B
      </div>
      <div className="not" style={{ gridArea: "C" }}>
        C
      </div>
      <div className="not" style={{ gridArea: "D" }}>
        D
      </div>
      <div className="not" style={{ gridArea: "E" }}>
        E
      </div>
      <div className="not" style={{ gridArea: "F" }}>
        F
      </div>
      <div className="not" style={{ gridArea: "G" }}>
        G
      </div>
      <div className="not" style={{ gridArea: "H" }}>
        H
      </div>
      <div className="not" style={{ gridArea: "I" }}>
        I
      </div>
      <div className="not" style={{ gridArea: "J" }}>
        J
      </div>

      <div className="not" style={{ gridArea: "num1" }}>
        0
      </div>
      <div className="not" style={{ gridArea: "num2" }}>
        1
      </div>
      <div className="not" style={{ gridArea: "num3" }}>
        2
      </div>
      <div className="not" style={{ gridArea: "num4" }}>
        3
      </div>
      <div className="not" style={{ gridArea: "num5" }}>
        4
      </div>
      <div className="not" style={{ gridArea: "num6" }}>
        5
      </div>
      <div className="not" style={{ gridArea: "num7" }}>
        6
      </div>
      <div className="not" style={{ gridArea: "num8" }}>
        7
      </div>
      <div className="not" style={{ gridArea: "num9" }}>
        8
      </div>
      <div className="not" style={{ gridArea: "num10" }}>
        9
      </div>

      <div className="sub-grid">
        
        {occupiedTiles.map((x, index) => (
          <Ship user={user}tryToRotate={tryToRotate}rowOrcolumn={x.rowOrcolumn} size={x.size} x={x.x} y={x.y} canStart={canStart} hits={hits} ship={occupiedTiles[index]}/>
        ))}
        {SquareArr}
      </div>
    </div>
  );
}
