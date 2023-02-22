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
function increment(e) {
  const id = e.id.split("-")[1];
  const value = document.getElementById(`value-${id}`);
  value.innerText = parseInt(value.innerText) + parseInt(e.value);
  const incrementValue = document.getElementById(`increment-${id}`);
  incrementValue.value = "";
}

function decrement(e) {
  const id = e.id.split("-")[1];
  const value = document.getElementById(`value-${id}`);
  let decValue = parseInt(value.innerText) - parseInt(e.value);
  if (decValue < 0) {
    decValue = 0;
  }
  value.innerText = decValue;
  const decrementValue = document.getElementById(`decrement-${id}`);
  decrementValue.value = "";
}

function deleteHandler(id) {
  store.dispatch({ type: 'deleteMatch', payload: id });
}

resetBtn.addEventListener("click", () => {
  for (let i = 0; i < innerValue.length; i++) {
    const totalValue = innerValue[i];
    totalValue.innerText = 0;
  }
});

matchBtn.addEventListener("click", () => {
  const state = store.getState();
  quantity = state.newMatch.length + 2;
  const match = `
<div class="wrapper">
<button  class="lws-delete">
<img src="./image/delete.svg" alt="" />
</button>
<h3 class="lws-matchName ">Match ${quantity}</h3>
</div>
<div class="inc-dec">
<div class="incrementForm">
<h4>Increment</h4>
<input
onchange='increment(this)'
  id='increment-${quantity}'
  type="number"
  name='increment'
  class="lws-increment increment"
/>
</div>
<div class="decrementForm">
<h4>Decrement</h4>
<input
onchange='decrement(this)'
id='decrement-${quantity}'
  type="number"
  name='decrement'
  class="lws-decrement"
/>
</div>
</div>
<div class="numbers">
<h2 id="value-${quantity}" class="lws-singleResult value">${count}</h2>
</div>
`;

  store.dispatch({ type: "addMatch", payload: match });
});
