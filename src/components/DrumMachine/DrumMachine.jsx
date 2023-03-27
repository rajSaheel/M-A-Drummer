import "./DrumMachine.css"
import {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { handlePower, handleVolume, handleBank, handleDisplay } from '../.././store/drum/drum.jsx'


export const DrumMachine = () => {
  const beats = [
    {
      keyN: "Q",
      name: "Heater 1",
      link: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
      altName: "Chord-1",
      altLink: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"
    },
    {
      keyN: "W",
      name: "Heater 2",
      link: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
      altName: "Chord-2",
      altLink: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"
    },
    {
      keyN: "E",
      name: "Heater 3",
      link: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
      altName: "Chord-3",
      altLink: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"
    },
    {
      keyN: "A",
      name: "Heater 4",
      link: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
      altName: "Shakers",
      altLink: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"
    },
    {
      keyN: "S",
      name: "Clap",
      link: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
      altName: "Open-HH",
      altLink: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"
    },
    {
      keyN: "D",
      name: "Open-HH",
      link: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
      altName: "Closed-HH",
      altLink: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"
    },
    {
      keyN: "Z",
      name: "Kick-n'-Hat",
      link: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
      altName: "Punchy-Kick",
      altLink: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"
    },
    {
      keyN: "X",
      name: "Kick",
      link: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
      altName: "Side-Stick",
      altLink: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"
    },
    {
      keyN: "C",
      name: "Closed-HH",
      link: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
      altName: "Snare",
      altLink: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
    }
  ]
  const keys = []

  const drum = useSelector(drum => drum)
  const dispatch = useDispatch()

  const trigger = (e) => {
    e.target.className="highlight"
    setTimeout(()=>e.target.className="drum-pad",100)
    if (drum.power) {
      const audio = e.target.firstElementChild
      audio.volume = drum.volume / 100
      audio.play()
      dispatch(handleDisplay(e.target.id))
    }
  }

  const changeVolume = (e) => {
    dispatch(handleVolume(e.target.value))
    dispatch(handleDisplay("Volume " + e.target.value))
    setTimeout(() => dispatch(handleDisplay("---")), 1000)
  }

  const toggleSwitch = (e) => {
    let css = e.target.style

    if (css.float === "left") css.float = "right"
    else css.float = "left"

    if (e.target.id == "power-btn") { dispatch(handlePower()); dispatch(handleDisplay("---")) }
    else if (e.target.id == "bank-btn") {dispatch(handleBank());dispatch(handleDisplay("Smooth Piano Kit"));}
  }

  const eventListen=(e)=>{
    try{
      const key=e.key.toUpperCase()
      let id
      beats.forEach((item)=>{
        if(item.keyN===key) id=item.name
      })
      const event=new Event("click",{bubbles:true,cancelable:false})
      document.getElementById(id).dispatchEvent(event)
    }catch(e){} 
  }

   useEffect(()=>{
    window.addEventListener("keydown",eventListen)
  },[])

  return (
    <div id={"drum-machine"}>
      <div id={"drum-keys"}>
        {
          beats.map((item, index) => {
            return (<div key={index} id={(drum.bank) ? item.altName : item.name} className={"drum-pad"} onClick={trigger} onKeyDown={(e)=>{e.target.className="highlight"}}>{item.keyN}
              <audio id={item.keyN} className={"clip"} src={(drum.bank) ? item.altLink : item.link}></audio>
            </div>)
          })
        }
      </div>
      <div id={"drum-control"}>
        <div id={"power-control"} className={"control"}>
          <h4>POWER</h4>
          <div className="select">
            <div id={"power-btn"} className="inner" style={{ float: "right" }} onClick={toggleSwitch}></div>
          </div>
        </div>
        <div id={"display"}>
          <h2>{drum.display}</h2>
        </div>
        <div id="volume-slider"><input id={"volume"} max="100" min="0" step="1" type="range" onChange={changeVolume} /></div>
        <div id={"bank-control"} className={"control"}>
          <h4>BANK</h4>
          <div className="select">
            <div id={"bank-btn"} className="inner" style={{ float: "left" }} onClick={toggleSwitch}></div>
          </div>
        </div>
      </div>
    </div >
  )
}