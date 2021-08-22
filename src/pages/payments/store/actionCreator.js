import axios from 'axios';

export const loadPaymentsInfo = ()=>{
  return (dispatch)=>{
    axios.post('https://ap-southeast-2.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/card-realm-locuu/service/card-app/incoming_webhook/fetch-card')
      .then( res=>{
        dispatch({ type:'load_payments_info', value: res.data })
      })
      .catch( err=>console.log(err))
  }
}