import React, { useState } from 'react'
import { TextField, Button, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { setUser } from '../redux/userSlice'

import { signin } from '../apis/signin'

const Signin = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState(false)

	const navi = useNavigate()

	const dispatch = useDispatch()

	const checkInput = () => {
		const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
		if (email.match(mailformat) && password.length >= 6) {
			setError(false)
			return true
		} else {
			setError(true)
			return false
		}
	}

	const handleRegister = async () => {
		const valid = checkInput()
		if (!valid) {
			return
		}
		const data = await signin(email, password)
		if (data !== null) {
			dispatch(setUser(data))
			navi('/')
		} else {
			setError(true)
		}
	}

	return (
		<div className='flex justify-center'>
			<div className='mt-28 bg-white rounded-md py-4 px-4 opacity-90 w-fit text-center'>
				<div className='mt-4'>
					<TextField
						name='email'
						type='email'
						placeholder='email'
						label='Email'
						helperText='Please enter your email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className='mt-4'>
					<TextField
						name='password'
						type='password'
						placeholder='password'
						label='Password'
						helperText='Please enter your password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div className='mt-4'>
					<Button variant='outlined' onClick={handleRegister}>
						Signin
					</Button>
				</div>
				{error && (
					<div className='mt-2'>
						<Typography variant='caption'>
							invalid email or invalid password
						</Typography>
					</div>
				)}
			</div>
		</div>
	)
}

export default Signin
