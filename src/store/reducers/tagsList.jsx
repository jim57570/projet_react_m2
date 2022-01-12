const initialState = { tags: [] }

//TODO faire update tag

//Reducer pour gerer la liste des tags
function tagsReducer(state = initialState, action) {
    let nextState
    switch (action.type) {
        //Ajout d'un tag
        case 'ADD_TAG': 
            nextState = {
                ...state,
                tags: [...state.tags, action.value]
            };
            return nextState || state
        //Suppression d'un tag
        case 'DELETE_TAG':
            nextState = state;
            const index = nextState.tags.indexOf(action.value);
            if (index != -1) {
                nextState.tags.splice(index, 1);
            }
            return nextState || state
        //Modification d'un tag
        case 'UPDATE_TAG':
            nextState = state;
            return nextState || state
        //Reset de la liste
        case 'RESET_TAG':
            nextState = initialState;
            return nextState || state
        default:
            return state
    };
}

export default tagsReducer;