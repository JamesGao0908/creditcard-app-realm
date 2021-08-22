import { fromJS } from 'immutable';

const defaultState = fromJS({
  cards : [],
  dummy:'helloworld!'
});

export default function reducer (state = defaultState, action ) {
    switch (action.type) {
      case 'load_payments_info' :{
        return state.set( 'cards', fromJS(action.value) );
      }
      default :
          return state;
    }
}