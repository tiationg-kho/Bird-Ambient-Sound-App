import { createSlice } from '@reduxjs/toolkit'
export const recordingSlice = createSlice({
	name: 'recording',
	initialState: {
		recording: {},
	},
	reducers: {
		setRecording: (state, action) => {
			state.recording = action.payload
		},
	},
})

export const selectRecording = (state) => state.recording
export const { setRecording } = recordingSlice.actions
export default recordingSlice.reducer