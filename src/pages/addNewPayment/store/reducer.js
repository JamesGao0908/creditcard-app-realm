import { fromJS } from 'immutable';

const defaultState = fromJS({
  uploading:false,
  uploaded:false,
});

export default function reducer (state = defaultState, action ) {
  switch (action.type) {
    case 'uploading_card_info':{
      return state.merge( {'uploading': true} );
    }
    case 'uploaded_card_info':{
      return state.merge( {'uploaded': true, 'uploading': false} );
    }
    case 'reset_card_info' :{
      return state.merge( {'uploaded' : false});
    }
    default :
      return state;
  }
}