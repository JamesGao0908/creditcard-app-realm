import './App.css';
import NewPayment from './pages/addNewPayment/NewPayment';
import Payments from './pages/payments/Payments';
import NotFound from './pages/404/';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import store from './store/store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path='/' exact component={NewPayment} />
            <Route path='/payments' exact component={Payments} />
            <Route path='*' exact={true} component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;

