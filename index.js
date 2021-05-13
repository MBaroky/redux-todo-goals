// Rule #1: Only an event can change the state of the store.
// Rule #2: The function that returns the new state (reducer) needs to be a pure function.

// Library code
function createStore (reducer){
    // The store should have four parts
    // 1. The state
    // 2. Get the state.
    // 3. Listen to changes on the state.
    // 4. Update the state

    let state;
    let listeners = []

    const getState = () => state
    const subscribe = (listener) => {
        listeners.push(listener)
        return ()=>{
            listeners = listeners.filter( l => l !== listener)
        }
    }

    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(listener => listener())
    }

    return {
        getState,
        subscribe,
        dispatch
    }
}


//   App code

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

// ROOT REDUCER

function app(state = {}, action){
    return {
        todos: todos(state.todos, action),
        goals: goals(state.goals, action)
    }
}

const store = createStore(app);

store.subscribe(()=>{
    console.log('the state is now: ', store.getState())
})


store.dispatch(addTodoAction({
    id:0,
    title:"learn redux",
    complete:false
}))
store.dispatch(addTodoAction({
    id:1,
    title:"learn redux1",
    complete:false
}))
store.dispatch(removeTodoAction(0))
store.dispatch(toggleTodoAction(1))

store.dispatch(addGoalAction({
    id:0,
    title:"be a great developer"
}))
store.dispatch(addGoalAction({
    id:1,
    title:"do your best"
}))
store.dispatch(removeGoalAction(0))


