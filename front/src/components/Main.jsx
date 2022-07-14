import React from 'react'
import { Typography } from '@mui/material'

import Display from './Display'
import Playlist from './Playlist'
import Query from './Query'
import Birdmap from './Birdmap'

const Main = () => {
	return (
		<div className='container sm:mx-auto text-center w-3/6 mt-12 content-center align-middle'>
			<div className='bg-white rounded-md py-4 px-4 opacity-95 z-20'>
				<div className='text-2xl mb-12'>
					<Typography variant='h4' color='primary'>
						Life is hard.
					</Typography>
					<Typography variant='text'>
						Let's relax with some awesome bird sounds
					</Typography>
				</div>
				<Display />
			</div>
			<Query />
			<Birdmap />
			<Playlist />
		</div>
	)
}

export default Main
