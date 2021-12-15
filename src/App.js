//CSS
import "./styles.css";

//React
import React, { useState, useEffect } from "react";

function App() {
  const [inputisabled, setInputisabled] = useState(true);
  const [minute, setMinute] = useState(15);
  const [second, setSecond] = useState(0);
  const [counter, setCounter] = useState(1);
  const [countDown, setCountDown] = useState(false);
  const [start, setStart] = useState("START");
  const [end, setEnd] = useState(false);
  const [initialCount, setInitialCount] = useState(0);
  const [dashOffset, setDashOffset] = useState(2 * 259 * Math.PI);

  useEffect(() => {
    second < 10 ? setSecond(("0" + second).slice(-2)) : setSecond(second);
    if (minute === 0 && second === 0) {
      setEnd(true);
      alert("end");
    }
  }, [second, minute]);

  useEffect(() => {
    minute < 10 ? setMinute(("0" + minute).slice(-2)) : setMinute(minute);
  }, [minute]);

  //Au changement du state counter, le décompte commence
  useEffect(() => {
    if (countDown) {
      const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
      setMinute(Math.floor(counter / 60));
      setSecond(Math.floor(counter % 60));
      setDashOffset((2 * 259 * Math.PI) / (initialCount / counter));
      return () => clearInterval(timer);
    }
  }, [counter, countDown]);

  //On édite les minutes
  let handleChangeMin = (min) => {
    if (min > 60) {
      min = 60;
      setSecond(0);
    }
    setMinute(min);
  };
  //On édite les secondes
  let handleChangeSec = (sec) => {
    if (sec > 59) {
      sec = 0;
      setMinute(minute + 1);
    }
    setSecond(sec);
  };

  //On lance le chrono
  let chrono = () => {
    if (start === "START") {
      setStart("STOP");
      setCounter(minute * 60 + parseInt(second));
      if (initialCount === 0) {
        setInitialCount(minute * 60 + parseInt(second));
      }
    } else {
      setStart("START");
      setCounter(0);
    }
    setCountDown(!countDown);
  };

  return (
    <div className="wrapper">
      <div className={`ring ${end ? "ending" : ""}`}>
        <svg width="518" height="518" viewBox="0 0 518 518">
          <g style={{ transform: "rotate(-90deg)", transformOrigin: "center center" }}>
            <circle cx="259" cy="259" r="254" fill="none" stroke="#09a65a" strokeWidth="9" />
            <circle cx="259" cy="259" r="254" fill="none" stroke="#585858" strokeWidth="9" strokeDasharray={2 * 259 * Math.PI + " " + dashOffset} strokeDashoffset={"-" + dashOffset} />
          </g>
        </svg>
      </div>

      <div className="timer">
        <div className="time">
          <div className="minutes">
            <input min="00" max="60" type="text" value={minute} disabled={inputisabled ? "disabled" : ""} onChange={(e) => handleChangeMin(e.target.value)} />
          </div>
          <div className="colon">:</div>
          <div className="seconds">
            <input type="text" value={second} disabled={inputisabled ? "disabled" : ""} onChange={(e) => handleChangeSec(e.target.value)} />
          </div>
        </div>
        <button className="start" onClick={() => chrono()}>
          {start}
        </button>
        <button
          className="settings"
          onClick={() => {
            setInputisabled(!inputisabled);
            second < 10 ? setSecond(("0" + second).slice(-2)) : setSecond(second);
          }}>
          <img src="/images/gear.svg" alt="Settings" />
        </button>
      </div>
    </div>
  );
}

export default App;
