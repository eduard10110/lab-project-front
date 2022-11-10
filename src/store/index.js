import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./reducers/index";

const middleware = composeWithDevTools();
const store = createStore(reducers, middleware);

export default store;
