import React, { useState } from 'react'
import Button from '@mui/material/Button'
import { ReactCountrySelectComponent } from 'react-country-select-component'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import { useDispatch } from 'react-redux'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useSelector } from 'react-redux'

import { setRecording } from '../redux/recordingSlice'
import { setPhotoUrl } from '../redux/photoUrlSlice'
import { setUser } from '../redux/userSlice'
import { getBirdData } from '../apis/getBirdData'
import { getPhotoData } from '../apis/getPhotoData'
import { Typography } from '@mui/material'
import { addToList } from '../apis/addToList'
import { selectUser } from '../redux/userSlice'
import { selectRecording } from '../redux/recordingSlice'
import { delFromList } from '../apis/delFromList'

const Query = () => {
	const [country, setCountry] = useState(null)
	const [error, setError] = useState(false)

	let states = useSelector(selectUser)
	const user = states.user
	const { email, list } = user
	let states2 = useSelector(selectRecording)
	const recording = states2.recording
	const { id, en } = recording

	const dispatch = useDispatch()

	const handleChange = (e) => {
		setError(false)
		setCountry(e)
	}
	const handleClick = async () => {
		setError(false)
		dispatch(setPhotoUrl(''))
		const data = await getBirdData(country)
		if (data === null) {
			setError(true)
			dispatch(setRecording({}))
		} else {
			dispatch(setRecording(data))
			const getBirdPhoto = async (query) => {
				await getPhotoData(query).then((p) => {
					if (p) {
						dispatch(setPhotoUrl(p.url))
					}
				})
			}
			getBirdPhoto(data.en || data.gen)
		}
	}

	const handleLike = async () => {
    if (list.find((element) => element[0] === id)){
      const data = await delFromList(id, email, en)
      dispatch(setUser(data))
    }else{
      const data = await addToList(id, email, en)
      dispatch(setUser(data))
    }

	}

	return (
		<div className='mx-auto text-center w-2/4 mt-2 z-20'>
			<div className='mt-2 z-30'>
				<ReactCountrySelectComponent
					isClearable={true}
					error={false}
					placeholder={'pick or type a place to find bird sounds'}
					borderRadius={6}
					defaultvalue={null}
					onChange={handleChange}
				/>
			</div>
      <div className='bg-white rounded-md py-4 px-4 opacity-95 my-2 w-full'>
			<div className='mt-2'>
				<Button
					variant='outlined'
					onClick={handleClick}
					disabled={country === null ? true : false}
				>
					Find
				</Button>
				{Object.keys(recording).length !== 0 && Object.keys(user).length !== 0 && (
					<Button onClick={handleLike}>
						{list.find((element) => element[0] === id) ? (
							<FavoriteIcon />
						) : (
							<FavoriteBorderIcon />
						)}
					</Button>
				)}
			</div>
			{!error && (
				<div>
					<Typography variant='caption'>each click get a new sound</Typography>
				</div>
			)}
			{error && Object.keys(recording).length === 0 && (
				<div className='mt-2'>
					<Alert severity='error'>
						<AlertTitle />
						Failed to find bird sounds — <strong>change a place!</strong>
					</Alert>
				</div>
			)}
      </div>
		</div>
	)
}

export default Query
