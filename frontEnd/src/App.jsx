<<<<<<< HEAD
<<<<<<< HEAD
import './App.css'
import AddRoutes from './AddRoutes/AddRoutes'

function App() {
  return (
    <>
      <AddRoutes />
    </>
  )
}

export default App
=======
import "./App.css";
import AddRoutes from "./AddRoutes/AddRoutes";
import { store } from "./store";
import { Provider } from "react-redux";
=======
import './App.css'
import AddRoutes from './AddRoutes/AddRoutes'
>>>>>>> afc081a49aea813fc597ed46cce39843d9982fee

function App() {
  return (
    <>
<<<<<<< HEAD
      <Provider store={store}>
        <AddRoutes />
      </Provider>
    </>
  );
}

export default App;
>>>>>>> master
=======
      <AddRoutes />
    </>
  )
}

export default App
>>>>>>> afc081a49aea813fc597ed46cce39843d9982fee
