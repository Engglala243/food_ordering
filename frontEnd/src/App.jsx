import "./App.css";
import AddRoutes from "./AddRoutes/AddRoutes";
import { Provider } from "react-redux";
import { store } from "./store.jsx";
import { CookiesProvider } from "react-cookie";

function App() {
  return (
    <>
      <CookiesProvider>
        <Provider store={store}>
          <AddRoutes />
        </Provider>
      </CookiesProvider>
    </>
  );
}

export default App;
