import Header from "./components/Header";
import Grid from "./components/Grid";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import LittleDisplayShips from "./components/LittleDisplayShips";
import "./App.css";
import { useState, useEffect } from "react";
function App() {
  const [playerGrid, setPlayerGrid] = useState([]);
  const [pcGrid, setPcGrid] = useState([]);

  const [canStart, setCanStart] = useState(false);
  const [reset, setReset] = useState(false);
  const [turn, setTurn] = useState("player");
  const [hits, setHits] = useState({ pc: [], player: [] });
  const [didPCHit, setDidPCHit] = useState(false);
  const [winner, setWinner] = useState("");

  function newGame() {
    setWinner("");
    setPlayerGrid([]);
    setPcGrid([]);
    setCanStart(false);
    setTurn("player");
    setHits({ pc: [], player: [] });
    setDidPCHit(false);
    setReset((old) => !old);
  }
  function isIsInHits(x, y, whereToLook) {
    if (whereToLook === "player") {
      let tempPLAYER = [...hits.player];
      for (let i = 0; i < tempPLAYER.length; i++) {
        if (tempPLAYER[i].x === x && tempPLAYER[i].y === y) {
          return true;
        }
      }
      return false;
    } else {
      let tempPC = [...hits.pc];
      for (let i = 0; i < tempPC.length; i++) {
        if (tempPC[i].x === x && tempPC[i].y === y) {
          return true;
        }
      }
      
      return false;
    }
  }
  function pcShoot() {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    if (didPCHit) {
      let lastHit = hits.pc[hits.pc.length - 1];     
      if (lastHit.x < 9) {
        x=lastHit.x+1
      }else{
        x=lastHit.x-1
      }
      y=lastHit.y
    }
    while (isIsInHits(x, y, "pc")) {
      
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    }
    tryHit(x, y, "pc");
  }
  function tryHit(x, y, shooter) {
   
    let temp = { ...hits };
    if (shooter === "player") {
      temp.player = [...temp.player, { x, y }];
    } else {
      if (itIncludesCoordinate(x, y, "player")) {
        setDidPCHit(true);
      } else {
        setDidPCHit(false);
      }
      temp.pc = [...temp.pc, { x, y }];
    }
    setHits({ ...temp });    
  }
  useEffect(() => {
    if (turn === "pc") {
      pcShoot();
    }
  }, [turn]);

  function itIncludesCoordinate(x, y, where) {
    
    let temp = [];
    if (where === "player") {
      temp = [...playerGrid];
    } else {
      temp = [...pcGrid];
    }
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
  useEffect(() => {
    let playerHitCount;
    let pcHitCount;
    if (turn === "player") {
      let temp = [...hits.player];
      let hitCount = 0;
      for (let index = 0; index < temp.length; index++) {
        const element = temp[index];
        if (itIncludesCoordinate(element.x, element.y, "pc")) {
          hitCount++;
        }
      }
      
      if (hitCount === 20) {
        setWinner("player");
        setCanStart(false)
      }
      playerHitCount=hitCount
      
    } else {
      let temp = [...hits.pc];
      let hitCount = 0;
      for (let index = 0; index < temp.length; index++) {
        const element = temp[index];
        if (itIncludesCoordinate(element.x, element.y, "player")) {
          hitCount++;
        }
      }
      if (hitCount === 20) {
        setWinner("pc");
        setCanStart(false)
      }
      pcHitCount=hitCount
    }
    if(canStart){
    if(pcHitCount!==20&&playerHitCount!==20){
      if(turn==="pc"){
        setTurn("player")
      }else{
        setTurn("pc")
      }
    }}
  }, [hits]);

  return (
    <div className="App">
      <Header />
      <div id="uppper-container">
      <button onClick={() => setCanStart(true)}>Start Game</button>
      {winner !== "" ? <div className="upper-text">The winner is {winner}</div> : ""}
      {canStart && winner === "" ?<div className="upper-text"> It's {turn}-s turn </div>: ""}
      {winner !== "" ? <button onClick={newGame}>New Game</button> : ""}
      </div>
      <div id="grid-container">
        {winner !== "" ? <div id="blocking"></div> : ""}



        <div className="half">
          <LittleDisplayShips ships={playerGrid} user={"player"} hits={hits.pc}/>
        <DndProvider backend={HTML5Backend}>
          <Grid
            user={"palyer"}
            setParentState={setPlayerGrid}
            canStart={canStart}
            turn={turn}
            tryHit={tryHit}
            hits={hits.pc}
            winner={reset}
          />
        </DndProvider>
        </div>
        <div className="half">
        <DndProvider backend={HTML5Backend}>
          <Grid
            user={"pc"}
            setParentState={setPcGrid}
            canStart={canStart}
            turn={turn}
            tryHit={tryHit}
            hits={hits.player}
            winner={reset}
          />
        </DndProvider>
        <LittleDisplayShips ships={pcGrid} user={"pc"} hits={hits.player}/>
        </div>
      </div>
    </div>
  );
}

export default App;
