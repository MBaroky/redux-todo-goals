

const
ADD_GOAL = 'ADD_GOAL',
REMOVE_GOAL = 'REMOVE_GOAL',
ADD_TODO = 'ADD_TODO',
REMOVE_TODO = 'REMOVE_TODO',
TOGGLE_TODO = 'TOGGLE_TODO';

function addTodoAction (todo) {
    return {
        type:ADD_TODO,
        todo
    }
}
function removeTodoAction (id) {
    return {
        type:REMOVE_TODO,
        id
    }
}
function toggleTodoAction (id) {
    return {
        type:TOGGLE_TODO,
        id
    }
}

function addGoalAction (goal) {
    return {
        type:ADD_GOAL,
        goal
    }
}
function removeGoalAction (id) {
    return {
        type:REMOVE_GOAL,
        id
    }
}


function todos (state = [], action) {
    switch (action.type) {
        case ADD_TODO:
            return [...state, action.todo];
        case REMOVE_TODO:
            return state.filter(todo => todo.id !== action.id)
        case TOGGLE_TODO:
            return state.map(todo => todo.id !== action.id? todo
                :{...todo, complete : !todo.complete})
        default:
            return state

    }
}

function goals (state = [], action) {
    switch (action.type) {
        case ADD_GOAL:
            return [...state, action.goal]
        case REMOVE_GOAL:
            return state.filter(goal => goal.id !== action.id)
        default:
            return state
    }
}

// Middleware example
// const checkAndDispatch = (store, action) => {
//     if(
//         action.type === ADD_TODO
//         && action.todo.title.toLowerCase().includes('bitcoin')
//     ) {
//         return alert("Nope this is a bad idea")
//     }
//     if(
//         action.type === ADD_GOAL
//         && action.goal.title.toLowerCase().includes('bitcoin')
//     ) {
//         return alert("Nope this is a bad idea")
//     }

//     return store.dispatch(action);
// }

const checker = (store) => (next) => (action) => {
    if(
        action.type === ADD_TODO
        && action.todo.title.toLowerCase().includes('bitcoin')
    ) {
        return alert("Nope this is a bad idea")
    }
    if(
        action.type === ADD_GOAL
        && action.goal.title.toLowerCase().includes('bitcoin')
    ) {
        return alert("Nope this is a bad idea")
    }

    return next(action);
}

// Create store using Redux and compined reducers

const store = Redux.createStore(Redux.combineReducers({
    todos,
    goals
}), Redux.applyMiddleware(checker))




