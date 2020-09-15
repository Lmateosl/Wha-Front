import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function BasicTextFields() {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="outlined-basic" inputProps={{style: {backgroundColor: 'white'}, startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),}} style={{width: '95%'}} label="Número de documento de identificación" variant="outlined"
          onChange= {(event) => {window.sessionStorage.setItem('id', event.target.value)}}
      />
    </form>
  );
}