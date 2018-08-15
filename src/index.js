import React from "react";
import ReactDOM from "react-dom";

//Components
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";

//Styles w/ MUID
import "./styles/index.css";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import muiTheme from "./styles/muiTheme";

//Middleware
import logger from "redux-logger";

//Redux
import { applyMiddleware, compose, createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers/index";

//Router
import { routerMiddleware } from "react-router-redux";
import createHistory from "history/createBrowserHistory";

//Sagas
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/index";

//Thunk
import thunk from "redux-thunk";

//Create middleware
export const history = createHistory();
const routerMiddlewareWithHistory = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();

//Create Logger
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//create prod/dev store
const store =
  process.env.NODE_ENV === "production"
    ? createStore(rootReducer, applyMiddleware(sagaMiddleware, thunk, routerMiddlewareWithHistory))
    : createStore(
        rootReducer,
        composeEnhancers(
          applyMiddleware(logger, sagaMiddleware, thunk, routerMiddlewareWithHistory)
        )
      );

//Run sagas
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={muiTheme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
