const initialState = { places: [], id: 0}


//Reducer pour gerer la liste des places
function placesReducer(state = initialState, action) {
    let nextState;
    let index;
    let id;
    switch (action.type) {
        //Ajout d'un lieu
        case 'ADD_PLACE':
            //auto increment
            action.value.id = state.id;
            state.id++;

            nextState = {
                ...state,
                places: [...state.places, action.value]
            };
            //console.log(nextState);
            return nextState || state
        //Suppression d'un lieu
        case 'DELETE_PLACE':
            nextState = {...state};
            index = nextState.places.findIndex(element => element.id == action.value);
            if (index != -1) {
                nextState.places.splice(index, 1);
            }
            return nextState || state
        //Modification d'un lieu
        case 'UPDATE_PLACE':
            //console.log("action.value");
            //console.log(action.value);
            nextState = {...state};
            id = action.value.id;
            index = nextState.places.findIndex(element => element.id == action.value.place.id);
            if (index != -1) {
                nextState.places[index] = action.value.place;
            }
            return nextState
        //Reset de la liste
        case 'RESET_PLACE':
            nextState = initialState;
            return nextState || state
        default:
            return state
    }
}

export default placesReducer;