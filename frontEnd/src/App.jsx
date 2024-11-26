import "./App.css";
import AddRoutes from "./AddRoutes/AddRoutes";
import { Provider } from "react-redux";
import { store } from "./store.jsx";

function App() {
  return (
    <>
      <Provider store={store}>
        <AddRoutes />
      </Provider>
    </>
  );
}

export default App;
