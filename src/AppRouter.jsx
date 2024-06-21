// AppRouter.js
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';

import RegisProduct from './pages/RegisProduct';
function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/home" exact component = {Home} />
        <Route path="/product-registration" exact component = {RegisProduct} />
      </Switch>
    </Router>
  );
}

export default AppRouter;
