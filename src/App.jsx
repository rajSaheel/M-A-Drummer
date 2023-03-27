import './App.css'
import { useSelector, useDispatch } from 'react-redux'
import { handlePower, handleVolume, handleBank } from './store/drum/drum.jsx'
import { DrumMachine } from './components/DrumMachine/DrumMachine.jsx'

export default function App() {

  
  const drum = useSelector(state => state)
  const dispatch = useDispatch()

  return (
    <main>
      <DrumMachine />
    </main>
  )
}