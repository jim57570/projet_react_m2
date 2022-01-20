const initialState = { places: [] }


//Reducer pour gerer la liste des places
function placesReducer(state = initialState, action) {
    let nextState;
    let index;
    switch (action.type) {
        //Ajout d'un lieu
        case 'ADD_PLACE':
            console.log("ADD PLACE");
            nextState = {
                ...state,
                places: [...state.places, action.value]
            };
            console.log(nextState);
            return nextState || state
        //Suppression d'un lieu
        case 'DELETE_PLACE':
            nextState = {...state};
            index = nextState.places.findIndex(element => element == action.value);
            if (index != -1) {
                nextState.places.splice(index, 1);
            }
            return nextState || state
        //Modification d'un lieu
        case 'UPDATE_PLACE':
            nextState = {...state};
            // console.log("index envoye: " + action.value.index);
            index = action.value.index;
            // console.log("index: " + index);
            // console.log("Place:\n");
            // console.log(action.value.place);
            if (index != -1) {
                nextState.places[index] = action.value.place;
            }
            // console.log("Nextstate:\n");
            // console.log(nextState);
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