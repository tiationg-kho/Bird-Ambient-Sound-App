import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet'
import { Typography } from '@mui/material'
import { useSelector } from 'react-redux'

import { selectRecording } from '../redux/recordingSlice'
import { selectUser } from '../redux/userSlice'
import birdicon from '../imgs/birdicon.png'

const Birdmap = () => {
	const center_lat = 30
	const center_lng = 30
	let states = useSelector(selectUser)
	const user = states.user

	let states2 = useSelector(selectRecording)
	const recording = states2.recording

	if (Object.keys(user).length === 0) {
		return <div></div>
	}

	const { en, lat, lng, rec } = recording

	const icon = new Icon({
		iconUrl: birdicon,
		iconSize: [40, 40],
	})

	const pin = (lat, lng) => {
		if (
			lat === undefined ||
			lng === undefined ||
			lat === null ||
			lng === null
		) {
			return (
				<Marker icon={icon} position={[30, 30]}>
					<Popup>
						<div className='text-center'>
							<div>
								<Typography color='primary' variant='h6'>
									{en}
								</Typography>
							</div>
							<div>
								<Typography>Recordist: {rec}</Typography>
							</div>
							<div>
								<Typography>no latitude and longitude data</Typography>
							</div>
						</div>
					</Popup>
				</Marker>
			)
		}
		return (
			<Marker icon={icon} position={[lat, lng]}>
				<Popup>
					<div className='text-center'>
						<div>
							<Typography color='primary' variant='h6'>
								{en}
							</Typography>
						</div>
						<div>
							<Typography>Recordist: {rec}</Typography>
						</div>
						<div>
							<Typography>
								Latitude: {lat} | Longitude: {lng}
							</Typography>
						</div>
					</div>
				</Popup>
			</Marker>
		)
	}

	return (
		<div style={{ height: '400px' }} className='mb-10 mt-10 bg-white rounded-md py-4 px-4 opacity-95 z-0'>
			<MapContainer
				center={[center_lat, center_lng]}
				zoom={1}
				scrollWheelZoom={true}
			>
				<TileLayer
					attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
					url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
				/>
				{Object.keys(recording).length !== 0 && pin(lat, lng)}
			</MapContainer>
		</div>
	)
}

export default Birdmap
