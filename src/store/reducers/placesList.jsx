const initialState = { places: [] }


//Reducer pour gerer la liste des places
function placesReducer(state = initialState, action) {
    let nextState;
    let index;
    switch (action.type) {
        //Ajout d'un lieu
        case 'ADD_PLACE': 
            nextState = {
                ...state,
                places: [...state.places, action.value]
            };
            return nextState || state
        //Suppression d'un lieu
        case 'DELETE_PLACE':
            nextState = state;
            index = nextState.places.indexOf(action.value);
            if (index != -1) {
                nextState.places.splice(index, 1);
            }
            return nextState || state
        //Modification d'un lieu
        case 'UPDATE_PLACE':
            nextState = {...state};
            index = action.index;
            if (index != -1)
                nextState.places[index] = action.value;
            return nextState || state
        //Reset de la liste
        case 'RESET_PLACE':
            nextState = initialState;
            return nextState || state
        default:
            return state
    };
}

export default placesReducer;