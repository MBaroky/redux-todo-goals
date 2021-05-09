// Rule #1: Only an event can change the state of the store.
// Rule #2: The function that returns the new state (reducer) needs to be a pure function.

function createStore (){
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

  return {
      getState,
      subscribe
  }
}

const store = createStore()

// store.subscribe(()=>{
//     console.log('the new state is: ', store.getState())
// })
// const unsubscribe = store.subscribe(()=>{
//     console.log('The store changed')
// })

// unsubscribe()
