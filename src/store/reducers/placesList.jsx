const initialState = { places: [] }

//TODO faire update tag

//Reducer pour gerer la liste des places
function placesReducer(state = initialState, action) {
    let nextState
    switch (action.type) {
        //Ajout d'un tag
        case 'ADD_PLACE': 
            nextState = {
                ...state,
                places: [...state.places, action.value]
            };
            return nextState || state
        //Suppression d'un tag
        case 'DELETE_PLACE':
            nextState = state;
            const index = nextState.places.indexOf(action.value);
            if (index != -1) {
                nextState.places.splice(index, 1);
            }
            return nextState || state
        //Modification d'un tag
        case 'UPDATE_PLACE':
            nextState = state;
            return nextState || state
        default:
            return state
    };
}

export default placesReducer;