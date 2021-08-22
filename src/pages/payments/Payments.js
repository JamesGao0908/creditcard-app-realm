import React from 'react';
import { connect } from 'react-redux';
import NavBar from '../../common/NavBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import * as actionCreator from './store/actionCreator';

const styles = theme=>({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
});

class Payments extends React.Component{
  componentDidMount(){
    this.props.handleLoadPaymentsInfomation();
  }
  render(){
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <NavBar />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Card number</TableCell>
                  <TableCell align="center">name</TableCell>
                  <TableCell align="center">expiration</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {
                this.props.cardsInfo.map( (item,index)=>{
                  return(
                    <TableRow key={index}>
                      <TableCell component="th" scope="row"> {item.cardNo}</TableCell>
                      <TableCell align="center">{item.cardName}</TableCell>
                      <TableCell align="center">{item.expiration}</TableCell>
                    </TableRow>
                  );
                })
              }
              </TableBody>
            </Table>
          </TableContainer>
          </main>
      </div>
    )
  }
}

const mapState = (state)=>{
  return {
    cardsInfo: state.get('payments').get('cards').toJS(),
  }
}
const mapDispatch = (dispatch) => {
  return {
    handleLoadPaymentsInfomation(){
      dispatch( actionCreator.loadPaymentsInfo() );
    }
  }
}

export default connect( mapState,mapDispatch) (withStyles(styles)(Payments));