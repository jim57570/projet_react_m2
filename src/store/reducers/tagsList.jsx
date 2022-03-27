const initialState = { tags: [
    {
        name: "Restaurant",
        icon: '🍴',
    },
    {
        name: "Bar",
        icon: '🍺'
    },
] }

//TODO faire update tag

//Reducer pour gerer la liste des tags
function tagsReducer(state = initialState, action) {
    let nextState;
    let index;
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
            nextState = {...state};
            if (action.index != -1) {
                nextState.tags.splice(action.index, 1);
            }
            return nextState || state
        //Modification d'un tag
        case 'UPDATE_TAG':
            nextState = {...state};
            if (action.index != -1)
                nextState.tags[action.index] = action.value;
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