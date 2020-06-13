const target = document.getElementById("target");

function render(template) {
  document.getElementById("target").innerHTML = "";
  document.getElementById("target").appendChild(template);
}

function uiInterface() {
  let state = {
    count: 0
  };

  const observers = [];
  const setState = handler => {
    state = handler(state);
  };

  const update = () => {
    setState(state => ({
      ...state,
      count: state.count + 1
    }));
    observers.forEach(ob => ob());
  };

  const button = () => {
    const button = document.createElement("input");
    button.type = "button";
    button.value = "update";
    button.addEventListener("click", () => {
      update();
    });
    return button;
  };

  const h2 = count => {
    const h2 = document.createElement("h2");
    h2.innerHTML = `count is ${count}`;
    return h2;
  };

  const renderComp = () => {
    const div = document.createElement("div");
    div.appendChild(button());
    div.appendChild(h2(state.count));

    render(div);
  };

  observers.push(state => renderComp());
  renderComp();
}

uiInterface();
