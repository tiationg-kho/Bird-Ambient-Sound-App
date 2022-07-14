import React from 'react'
import { useSelector } from 'react-redux'
import ReactAudioPlayer from 'react-audio-player'
import { Typography } from '@mui/material'

import { selectRecording } from '../redux/recordingSlice'
import { selectPhotoUrl } from '../redux/photoUrlSlice'

const Display = () => {
	const states = useSelector(selectRecording)
	const recording = states.recording
	const states2 = useSelector(selectPhotoUrl)
	const photoUrl = states2.photoUrl

	return (
		<div className="">
			{Object.keys(recording).length === 0 && (
				<div className='mt-2 py-8 text-xl'>Can't wait to hear bird sounds!</div>
			)}
			{Object.keys(recording).length !== 0 && (
				<div>
					<img
						src={photoUrl}
						alt=''
						className='mx-auto mt-2 rounded-md w-4/5 h-auto'
					/>
					<Typography variant='h5' color='primary' sx={{ marginTop: '10px' }}>
						{recording.en}
					</Typography>
					<Typography variant='caption' sx={{ marginTop: '10px' }}>
						Recordist: {recording.rec} |{' '}
					</Typography>
					<Typography variant='caption' sx={{ marginTop: '10px' }}>
						Location: {recording.loc} / {recording.cnt}
					</Typography>
					<br />
					<Typography variant='caption' sx={{ marginTop: '10px' }}>
						Audio: xeno-canto.org |{' '}
					</Typography>
					<Typography variant='caption' sx={{ marginTop: '10px' }}>
						Photo: Google Search
					</Typography>
					<br />
					<Typography variant='caption' sx={{ marginTop: '10px' }}>
						Id: {recording.id}
					</Typography>
					<ReactAudioPlayer
						src={recording.file}
						autoPlay
						controls
						loop
						className='mx-auto mt-2'
					/>
				</div>
			)}
		</div>
	)
}

export default Display
