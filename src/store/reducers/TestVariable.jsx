const initialState = { testVariable: "yes" }

function testVariableReducer(state = initialState, action) {
    let nextState;
    switch (action.type) {
        case 'CHANGE_TITLE':
            nextState = state;
            console.log("Avant : " + nextState.testVariable);
            if (nextState.testVariable == "yes")
                nextState.testVariable = "no";
            else
                nextState.testVariable = "yes";
            console.log("Après : " + nextState.testVariable);
            return nextState || state
        default:
            return state
    };
}

export default testVariableReducer;