import React, { useState } from 'react'
import { Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import Collapse from '@mui/material/Collapse'
import CloseIcon from '@mui/icons-material/Close'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

import { setUser } from '../redux/userSlice'
import { setRecording } from '../redux/recordingSlice'
import { setPhotoUrl } from '../redux/photoUrlSlice'
import { selectUser } from '../redux/userSlice'

const Header = () => {
	const [open, setOpen] = useState(true)

	let states = useSelector(selectUser)
	const user = states.user

	const dispatch = useDispatch()

	const navi = useNavigate()
	const handleMain = () => {
		navi('/')
	}
	const handleSignin = () => {
		dispatch(setUser({}))
		dispatch(setRecording({}))
		dispatch(setPhotoUrl(''))
		setOpen(false)
		navi('/signin')
	}
	const handleRegister = () => {
		dispatch(setUser({}))
		dispatch(setRecording({}))
		dispatch(setPhotoUrl(''))
		setOpen(false)
		navi('/register')
	}
	const handleLogout = () => {
		dispatch(setUser({}))
		dispatch(setRecording({}))
		dispatch(setPhotoUrl(''))
		setOpen(true)
		window.location.reload(false)
		navi('/')
	}
	return (
		<div className='flex justify-end bg-white border-l-gray-400 border-b-4 sticky top-0 z-20 py-1'>
			<div
				className='absolute left-3 top-2 cursor-pointer h-8'
				onClick={handleMain}
			>
				<Typography variant='h4' color='primary'>Bird Ambient Sound App</Typography>
			</div>
			{Object.keys(user).length === 0 && (
				<>
					<div className='my-2'>
						<Button
							variant='outlined'
							color='inherit'
							size='small'
							onClick={handleSignin}
						>
							Signin
						</Button>
					</div>
					<div className='mx-2 my-2'>
						<Button
							variant='outlined'
							color='inherit'
							size='small'
							onClick={handleRegister}
						>
							Register
						</Button>
					</div>
				</>
			)}
			{Object.keys(user).length !== 0 && (
				<>
					<div className='mx-2 my-2'>
						<Typography variant='text'>Hi, {user.email}</Typography>
					</div>
					<div className='mx-2 my-2'>
						<Button
							variant='outlined'
							color='inherit'
							size='small'
							onClick={handleLogout}
						>
							Logout
						</Button>
					</div>
				</>
			)}
			<div className='absolute top-14 right-2'>
				<Collapse in={open}>
					<Alert
						action={
							<IconButton
								color='inherit'
								size='small'
								onClick={() => {
									setOpen(false)
								}}
							>
								<CloseIcon fontSize='inherit' />
							</IconButton>
						}
					>
						Log in for more features
					</Alert>
				</Collapse>
			</div>
		</div>
	)
}

export default Header
