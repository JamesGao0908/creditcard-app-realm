import { combineReducers } from 'redux-immutable';

import { reducer as paymentsRecducer} from '../pages/payments/store/store';
import { reducer as addPaymentRecducer} from '../pages/addNewPayment/store/store';

const mainReducer = combineReducers ({
    payments : paymentsRecducer,
    addpayment : addPaymentRecducer,
})

export default mainReducer;
