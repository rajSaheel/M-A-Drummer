//power action
const HANDLE_POWER = "HANDLE_POWER"

export const handlePower = () => {
  return { type: HANDLE_POWER }
}

// display action
const HANDLE_DISPLAY = "HANDLE_DISPLAY"

export const handleDisplay = (string) => {
  return { type: HANDLE_DISPLAY,string }
}

//volume action
const HANDLE_VOLUME = "HANDLE_VOLUME"

export const handleVolume = (volume) => {
  return { type: HANDLE_VOLUME, volume }
}

//bank action
const HANDLE_BANK = "HANDLE_BANK"

export const handleBank = () => {
  return { type: HANDLE_BANK }
}

const defaultState = {
  power: true,
  display: "---",
  volume: 50,
  bank: false
}

export const drum = (state = defaultState, action) => {
  switch (action.type) {
    case HANDLE_POWER: return Object.assign({}, state, { power: !state.power })
      break
    case HANDLE_DISPLAY: return Object.assign({}, state, { display: action.string })
      break
    case HANDLE_VOLUME: return Object.assign({}, state, { volume: action.volume })
      break
    case HANDLE_BANK: return Object.assign({}, state, { bank: !state.bank })
      break;
    default: return state;
  }
}
