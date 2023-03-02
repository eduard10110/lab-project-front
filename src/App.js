import Header from "containers/header";
import Menu from "containers/menu";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import RoutesBuilder from "routes";
import "react-toastify/dist/ReactToastify.css";

function App() {
  console.log("Running");
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          newestOnTop={true}
          closeOnClick
        />
        <Header />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Menu />
          <RoutesBuilder />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
