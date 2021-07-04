import React, { useState } from 'react';
import axiosInstance from '../axios';
import { useHistory } from 'react-router-dom';
//MaterialUI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import validator from 'validator'
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab'
import Nav from './Nav'



const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function SignUp() {
	const history = useHistory();
	const initialFormData = Object.freeze({
		email: '',
		username: '',
		password: '',
	});

	const [formData, updateFormData] = useState(initialFormData);
	const [error,upError]=useState(false)
	const[helpertext,UphelperText]=useState('')
	const [mailerror,upMailError]=useState(false)
	const[mailhelpertext,upMailHelperText]=useState('')
	const[passhelp,upPassHelp]=useState('')
	const[passerror,upPassError]=useState(false)
	
	const[showerror,UpShowError]=useState({});
	const[valerror,UpValError]=useState(false);
	const[enable,upEnable]=useState(false)



	
	
	const handleChange = (e) => {
		if(e.target.name==='password'){
			if(e.target.value.length>=8){
               upPassHelp('')
			   upPassError(false)
			}
			else{
				if(e.target.value.length==0){
					upPassHelp('')
					upPassError(false)
				}
				else{
				upPassHelp('Password lenght must be greater than or equal to 8')
				upPassError(true)}
			}
		}

		if(e.target.name=="email"){
			if(validator.isEmail(e.target.value)){
				upMailError(false)
				upMailHelperText('')
			}
			else{
				if(e.target.value.length==0){
					upMailError(false)
					upMailHelperText('')
				}
				else{
				upMailError(true)
				upMailHelperText('Invalid Email')}
			}
		}
		
		updateFormData({
			...formData,
			// Trimming any whitespace
			[e.target.name]: e.target.value.trim(),
		});
	};
	const valPassword=(e)=>{
		e.preventDefault();
		if (formData.password===e.target.value){
			upError(false)
			UphelperText('')
			upEnable(false)

		}
		else{
			upError(true)
			UphelperText('Passwords do not match')
			upEnable(true)
		}
	
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);

	

		axiosInstance
			.post(`signup`, {
				email: formData.email,
				user_name: formData.username,
				password: formData.password,
			})
			.then((res) => {
				console.log(res.data)
				if (Object.keys(res.data)=='error'){
					UpValError(true)
					UpShowError(res.data)
				}
				else{
					history.push('/login')
				}
			})
			.catch(error=>{
				console.log(error)
			})
	};

	const classes = useStyles();
	const handleClose=()=>{
		UpValError(false)
	}

	return (
		<div>
		<Nav/>
		<Container component="main" maxWidth="xs">
		
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}></Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								onChange={handleChange}
								error={mailerror}
								helperText={mailhelpertext}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="username"
								label="Username"
								name="username"
								autoComplete="username"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
								onChange={handleChange}
								error={passerror}
								helperText={passhelp}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="conpassword"
								label="Confirm Password"
								type="password"
								id="conpassword"
								autoComplete="current-password"
								onChange={valPassword}
								helperText={helpertext}
								error={error}
							/>
						</Grid>
						
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
						disabled={enable}
					>
						Sign Up
					</Button>
					<Grid container justify="flex-end">
						<Grid item>
							<Link href="#" variant="body2">
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</form>
				<div className="container">
				<Snackbar open={valerror} autoHideDuration={8000} onClose={handleClose} anchorOrigin={{ vertical:'top',horizontal:'center' }}>
  <Alert onClose={handleClose} severity="error">
    {showerror.error}
  </Alert>
</Snackbar>
</div>
			</div>
		</Container>
		</div>
	);
}