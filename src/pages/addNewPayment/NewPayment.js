import React from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import chipImg from '../../statics/icons/chip.png';
import masterLogo from '../../statics/icons/masterlogo.png';
import visaLogo from '../../statics/icons/visalogo.png';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import { withStyles } from '@material-ui/core/styles';
import NavBar from '../../common/NavBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import DoneIcon from '@material-ui/icons/Done';
import * as actionCreator from './store/actionCreator';
import { Spin } from 'antd';
import 'antd/dist/antd.css';
import { Card, CardFront, CardBack, CreditcardForm, } from './style.js';

const styles = theme=>({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    overflow: 'auto',
    display:'flex',
    flexDirection:'column',
    alignItems: 'center',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
});

class NewPayment extends React.Component{
  
  constructor(props){
    super(props);
    this.state={
      creditcardName:'',
      creditcardNumber:'',
      creditcardExpireMonth:'',
      creditcardExpireYear:'',
      creditcardCVV:'',
      creditLogo: '',
      flip:false,
      numberInputError:false,
      numberInputhelperText:' ',
      nameInputError:false,
      nameInputhelpText:' ',
      monthInputError:false,
      yearInputError:false,
      cvvInputError:false,
    }
    this.handleCardNumberInput = this.handleCardNumberInput.bind(this);
    this.handleCardNameInput = this.handleCardNameInput.bind(this);
    this.handleCardCVVInput = this.handleCardCVVInput.bind(this);
    this.handleCardCVVFocus = this.handleCardCVVFocus.bind(this);
    this.handleCardCVVBlur = this.handleCardCVVBlur.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  //handle input focus CVV
  handleCardCVVFocus(){
    this.setState({ flip:true})
  }
  //handle input blur CVV
  handleCardCVVBlur(){
    this.setState({ flip:false})
  }
  //handle number input
  handleCardNumberInput(e){
    if( /^\d+$/.test(e.target.value) || e.target.value==='' )
      this.setState({numberInputError:false, numberInputhelperText:' '});
    else{
      this.setState({numberInputError:true, numberInputhelperText:'Invaild input number[0-9] only'});
      setTimeout(()=>{
        this.setState({numberInputError:false, numberInputhelperText:' '});
      },2000);
    }
    let tmp = e.target.value.replace(/\D/g,'').substring(0,16);
    this.setState({ creditcardNumber: tmp });
    switch(tmp.charAt(0)){
      case '4':{
        this.setState({ creditLogo: masterLogo});
        break;
      }
      case '5':{
        this.setState({ creditLogo: visaLogo});
        break;
      }
      default:{
        this.setState({ creditLogo: ''});
      }
    }
  }
  //handle name input 
  handleCardNameInput(e){
    // let tmp = e.target.value.replace(/[1-9]/g,'').substring(0,25);
    if(/^[a-zA-Z ]+$/.test(e.target.value) || e.target.value === '' ){
      this.setState({ creditcardName: e.target.value.substring(0,30) });
      this.setState({ nameInputError:false, nameInputhelpText:' '})
    }else{
      this.setState({ nameInputError:true, nameInputhelpText:'Invalid input only accpet[a-z,A-Z] characters'})
      setTimeout(() => {
        this.setState({ nameInputError:false, nameInputhelpText:' '})
      }, 2000);
    }
    
  }
  //handle cvv input
  handleCardCVVInput(e){
    let tmp = e.target.value.replace(/\D/g,'').substring(0,3);
    this.setState({ creditcardCVV: tmp });
  }
  //handle form submit and insert data in realm
  handleFormSubmit(){
    if(this.state.creditcardNumber.length !==16){
      this.setState({ numberInputError: true, numberInputhelperText:'invalid credit card number'});
      setTimeout(()=>{
        this.setState({ numberInputError: false, numberInputhelperText:' ' });
      },2000);
    }
    if(this.state.creditcardName ===''){
      this.setState({ nameInputError: true, nameInputhelpText:'invalid credit card name input'})
      setTimeout(()=>{
        this.setState({nameInputError:false,  nameInputhelpText:' '})
      },2000)
    }
    if(this.state.creditcardCVV.length !==3){
      this.setState({ cvvInputError:true});
      setTimeout(()=>{
        this.setState({ cvvInputError:false});
      },2000)
    }
    if(this.state.creditcardExpireMonth ===''){
      this.setState({ monthInputError:true});
      setTimeout(()=>{
        this.setState({ monthInputError:false});
      },2000)
    }
    if(this.state.creditcardExpireYear ===''){
      this.setState({ yearInputError:true});
      setTimeout(()=>{
        this.setState({ yearInputError:false});
      },2000)
    }
    //process submit
    if(this.state.creditcardNumber.length === 16 && this.state.creditcardCVV.length ===3 &&
      this.state.creditcardName !== '' && this.state.creditcardExpireMonth !== '' && 
      this.state.creditcardExpireYear !== ''){      
        this.props.handleSubmitFormLoading();  
        const expiration = this.state.creditcardExpireMonth+'-'+this.state.creditcardExpireYear;
        setTimeout(()=>{
          this.props.handleSubmit(this.state.creditcardNumber, this.state.creditcardName, expiration, this.state.creditcardCVV);   
          this.setState({ creditcardName:'', creditcardNumber:'', creditcardExpireMonth:'', creditcardExpireYear:'', creditcardCVV:'' });
        },1000);
    }
  }

  render(){
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <NavBar />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} style={{ marginBottom : '20px'}} />
          <Card className={ this.state.flip ? 'active':''}>
          <CardFront>
              <div className='cardfrontlevel1'>
                <div><img style={{width:'60px',}} src={chipImg} alt='chip-logo'/></div>
                <div>{ (this.state.creditLogo ==='') ? <CreditCardIcon style={{ width:'60px', right:'20px', position:'absolute', backfaceVisibility:'hidden' }} />:(<img style={{width:'60px', right:'20px', position:'absolute', backfaceVisibility:'hidden'}} className='logo' alt='company-logo' src={this.state.creditLogo} />) }</div>
              </div>
              <div className='cardfrontlevel2'>
                { (this.state.creditcardNumber==='') ? '#### #### #### ####':(this.state.creditcardNumber.slice(0,4)+" "+this.state.creditcardNumber.slice(4,8)+" "+this.state.creditcardNumber.slice(8,12)+" "+this.state.creditcardNumber.slice(12,16)) }
              </div>
              <div className='cardfrontlevel3'>
              <div style={{ flex:'7' }}>{ (this.state.creditcardName==='') ? 'Full Name':this.state.creditcardName }</div>
              <div style={{ flex:'3' }}>
                {(this.state.creditcardExpireMonth==='') ? 'MM':(this.state.creditcardExpireMonth)}
                /
                {(this.state.creditcardExpireYear==='') ? 'YY':(this.state.creditcardExpireYear)} 
              </div>
            </div>
            </CardFront>
          <CardBack>
            <div className='cardbacklevel0'></div>
            <div className='cardbacklevel1'></div>
            <div className='cardbacklevel2'>CVV</div>
            <div className='cardbacklevel3'>{this.state.creditcardCVV}</div>
            <div className='cardbacklevel4'>{ (this.state.creditLogo === '') ? '': <img alt='creditLogo' src={this.state.creditLogo} style={{ width:'60px'}} /> }</div>
          </CardBack>
        </Card>
          <CreditcardForm>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="cardNo"
            label="Credit Card Number"
            name="creditcarednumber"
            value={this.state.creditcardNumber}
            onChange={ e=>this.handleCardNumberInput(e) }
            error={this.state.numberInputError}
            helperText={this.state.numberInputhelperText}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            required
            id="cardName"
            label="Credit Card Name"
            name="creditcardname"
            value={this.state.creditcardName}
            onChange={e=>this.handleCardNameInput(e)}
            error={this.state.nameInputError}
            helperText={this.state.nameInputhelpText}
          />
          <div className='creditcardformlevel3'>
            <FormControl required style={{ flex:'1' }} error={this.state.monthInputError}>
              <InputLabel>Expire month</InputLabel>
              <Select
                labelId="required-label"
                value={this.state.creditcardExpireMonth}
                onChange={e=>this.setState({creditcardExpireMonth:e.target.value})}
              >
                <MenuItem value="01">January</MenuItem>
                <MenuItem value="02">Feburary</MenuItem>
                <MenuItem value="03">March</MenuItem>
                <MenuItem value="04">April</MenuItem>
                <MenuItem value="05">May</MenuItem>
                <MenuItem value="06">June</MenuItem>
                <MenuItem value="07">July</MenuItem>
                <MenuItem value="08">August</MenuItem>
                <MenuItem value="09">September</MenuItem>
                <MenuItem value="10">October</MenuItem>
                <MenuItem value="11">November</MenuItem>
                <MenuItem value="12">December</MenuItem>
              </Select>
              {
                (this.state.monthInputError) ? (<FormHelperText>Required</FormHelperText>):(<FormHelperText style={{visibility:'hidden'}}>Required</FormHelperText>)
              }
            </FormControl>
            <FormControl required style={{ flex:'1' }} error={this.state.yearInputError}>
              <InputLabel >Expire year</InputLabel>
              <Select
                labelId="demo-simple-select-required-label"
                value={this.state.creditcardExpireYear}
                onChange={e=>this.setState({creditcardExpireYear:e.target.value})}
              >
                <MenuItem value="2021">2021</MenuItem>
                <MenuItem value="2022">2022</MenuItem>
                <MenuItem value="2023">2023</MenuItem>
                <MenuItem value="2024">2024</MenuItem>
                <MenuItem value="2025">2025</MenuItem>
                <MenuItem value="2026">2026</MenuItem>
                <MenuItem value="2027">2027</MenuItem>
                <MenuItem value="2028">2028</MenuItem>
              </Select>
              {
                (this.state.yearInputError) ? (<FormHelperText>Required</FormHelperText>):(<FormHelperText style={{visibility:'hidden'}}>Required</FormHelperText>)
              }
            </FormControl>
            <TextField
              style={{ flex:'1' }}
              variant="outlined"
              margin="normal"
              required
              id="CVV"
              label="CVV"
              name="creditcaredcvv"
              value={this.state.creditcardCVV}
              onChange={e=>this.handleCardCVVInput(e)}
              onFocus={(e)=>this.handleCardCVVFocus()}
              onBlur={(e)=>this.handleCardCVVBlur()}
              error={this.state.cvvInputError}
              helperText={ (this.state.cvvInputError)? 'Invalid input':' ' }
            />
          </div>
          <Button
            style={{ marginTop:'2vh'}}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={()=>this.handleFormSubmit()}>
              {
              (this.props.uploading) ? (<Spin />):( (this.props.uploaded)? (<><DoneIcon />&nbsp;Done</>):'submit' )
              }
          </Button>
        </CreditcardForm>
        </main>
      </div>
    )
  }
}

const mapState = (state)=>{
  return {
    uploading:state.get('addpayment').get('uploading'),
    uploaded:state.get('addpayment').get('uploaded'),
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(number, name, expiration, cvv){
      dispatch(actionCreator.insertCardInfo(number, name, expiration, cvv) );
    },
    handleSubmitFormLoading(){
      dispatch( actionCreator.startloading());
      // return 'loading_handled';
    }
  }
}

export default connect( mapState,mapDispatch) (withStyles(styles)(NewPayment));