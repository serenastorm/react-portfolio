import "focus-visible";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import Routes from "infrastructure/routes/Routes";
import { PageTitle } from "Main/components";
import { PageBackground } from "CaseStudy/components";
import store from "infrastructure/redux/store";

import "./styles/styles.scss";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <PageTitle />
        <PageBackground />
        <Routes />
      </Router>
    </Provider>
  );
}

export default App;
