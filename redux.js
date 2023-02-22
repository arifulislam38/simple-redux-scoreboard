let count = 0;
const value = document.getElementById(`value-${count}`);
const innerValue = document.getElementsByClassName("value");
const resetBtn = document.getElementById("reset-btn");
const matchBtn = document.getElementById("match-btn");
const matchContainer = document.getElementById("match-container");

//initial State declaration
const initialState = {
  newMatch: [],
};

//reducer function create
const reducer = (state = initialState, action) => {
  if (action.type === "deleteMatch") {
    return {
      ...state,
      newMatch: state.newMatch.filter((nm) => nm.id !== action.payload),
    };
  } else if (action.type === "addMatch") {
    return {
      ...state,
      newMatch: [
        ...state.newMatch,
        { match: action.payload, id: state.newMatch.length + 2 },
      ],
    };
  } else {
    return state;
  }
};

//create store
const store = Redux.createStore(reducer);

const render = () => {
  const state = store.getState();
  const div = document.createElement("div");
  div.classList.add("match");
  if (state.newMatch.length) {
    state.newMatch.map((match) => {
      div.innerHTML = match.match;
      matchContainer.appendChild(div);
    });
  }
};

store.subscribe(render);
render();

//event trigger

