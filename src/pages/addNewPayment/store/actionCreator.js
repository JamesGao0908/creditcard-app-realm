import axios from 'axios';

export const insertCardInfo = (number, name, expiration, cvv)=>{
  return (dispatch)=>{
    axios.post(`https://ap-southeast-2.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/card-realm-locuu/service/card-app/incoming_webhook/add-card`, null, { params: {
      number,
      name,
      expiration
    }})
    .then(res=>{
      dispatch({ type: 'uploaded_card_info' });
      setTimeout(() => {
        dispatch({ type: 'reset_card_info' });
      }, 1500);
    })
    .catch(err=>console.log(err));
  }
};

export const startloading = ()=>({
  type:'uploading_card_info'
});



