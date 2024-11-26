import "./App.css";
import AddRoutes from "./AddRoutes/AddRoutes";
import { store } from "./store";
import { Provider } from "react-redux";

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
