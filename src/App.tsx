import "./App.css";

//@ts-ignore
window.keyboardStatusChanged = (value: boolean) => {
  alert(value);
};

function App() {
  return (
    <div className="container">
      <input placeholder="input" />
    </div>
  );
}

export default App;
