import { Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import { selectUser } from '../redux/userSlice'
import { getBirdDataById } from '../apis/getBirdDataById'
import { setPhotoUrl } from '../redux/photoUrlSlice'
import { setRecording } from '../redux/recordingSlice'
import { getPhotoData } from '../apis/getPhotoData'

const Playlist = () => {
	let states = useSelector(selectUser)
	const user = states.user

	const dispatch = useDispatch()

	const handleClick = async (string) => {
		let id = ''
		for (let i = string.length - 1; i >= 0; i--) {
			if (string[i] !== ' ') {
				id = string[i] + id
			} else {
				break
			}
		}
		dispatch(setPhotoUrl(''))
		const data = await getBirdDataById(id)
		if (data === null) {
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

	return (
		<>
			{Object.keys(user).length !== 0 && (
				<div className='mt-8 mb-8 bg-white rounded-md py-4 px-4 opacity-95'>
					<Typography variant='h6' color='primary'>
						Favorite Sounds
					</Typography>
					<div className='max-h-40 overflow-auto mt-2 border-gray-100 border-2'>
						{user.list.length === 0 && (
							<Typography color='secondary'>
								haven't store any great bird sounds yet
							</Typography>
						)}
						{user.list.map((element, idx) => (
							<div
								onClick={(e) => handleClick(e.target.innerHTML)}
								className={
									idx % 2 === 0
										? 'bg-slate-100 pt-1 cursor-pointer'
										: 'pt-1 cursor-pointer'
								}
								key={idx}
							>
								<Typography>
									{idx + 1}. {element[1]} - {element[0]}
								</Typography>
							</div>
						))}
					</div>
					<div>
						<Typography variant='caption'>
							listen to your favorite sounds again by click them
						</Typography>
					</div>
				</div>
			)}
		</>
	)
}

export default Playlist
