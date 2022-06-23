import Header from "./components/Header";
import Grid from "./components/Grid";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./App.css";
import { useState, useEffect } from "react";
function App() {
  const [playerGrid, setPlayerGrid] = useState([]);
  const [pcGrid, setPcGrid] = useState([]);
  const [canStart, setCanStart] = useState(false);
  const [turn, setTurn] = useState("player");
  const [hits, setHits] = useState({ pc: [], player: [] });

  const [winner, setWinner] = useState([]);
  function runGame() {
    //console.log("running")
  }
  function isIsInHits(x,y,whereToLook){
    if(whereToLook==="player"){
      let tempPLAYER=[...hits.player]
      for(let i=0;i<tempPLAYER.length;i++){
        if(tempPLAYER[i].x===x&&tempPLAYER[i].y===y){
          return true
        }
      }
      return false
    }
    else{
      let tempPC=[...hits.pc]
      for(let i=0;i<tempPC.length;i++){
        if(tempPC[i].x===x&&tempPC[i].y===y){
          return true
        }
      }
      console.log("false")
      return false
    }
  }
  function pcShoot() {
    
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    while (isIsInHits(x,y,"pc")) {
      console.log("pcshot")
       x = Math.floor(Math.random() * 10);
       y = Math.floor(Math.random() * 10);
    }
    tryHit(x,y,"pc")
  }
  function tryHit(x, y, shooter) {
    let temp = { ...hits };
    if (shooter === "player") {
      temp.player = [...temp.player, { x, y }];
    } else {
      temp.pc = [...temp.pc, { x, y }];
    }
    setHits({ ...temp });
    if (turn === "player") {
      setTurn("pc");
      
    } else {
      setTurn("player");
    }
    //console.log(x,y)
  }
  useEffect(()=>{
    if(turn==="pc"){
      pcShoot()
    }
  },[turn])
  function calculateHits(){
    //need 20 hits to win

  }
  function calculateSinking(){

  }
  function itIncludesCoordinate(x, y,where) {
    console.log(x,y)
    let temp=[]
    if(where==="player"){
      temp=[...playerGrid]
    }else{
      temp=[...playerGrid]
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
  useEffect(()=>{

  },[hits])
  return (
    <div className="App">
      <Header />
      <button onClick={() => setCanStart(true)}>Start Game</button>
      {canStart ? `It's ${turn}-s turn` : ""}
      {canStart ? runGame() : ""}
      <div id="grid-container">
        <DndProvider backend={HTML5Backend}>
          <Grid
            user={"palyer"}
            setParentState={setPlayerGrid}
            canStart={canStart}
            turn={turn}
            tryHit={tryHit}
            hits={hits.pc}
          />
        </DndProvider>
        <DndProvider backend={HTML5Backend}>
          <Grid
            user={"pc"}
            setParentState={setPcGrid}
            canStart={canStart}
            turn={turn}
            tryHit={tryHit}
            hits={hits.player}
          />
        </DndProvider>
      </div>
    </div>
  );
}

export default App;
