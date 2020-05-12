import {SET_ALERT,REMOVE_ALERT} from '../actions/types'

const initialState = [
    
]

export default function(state =initialState,action){
    const { type, payload} = action
    switch (type) {
        case SET_ALERT:
            // state is  immutable so first add previous states than add to it 
            return [...state,payload]
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== payload)
        default:
            return state;
    }
}