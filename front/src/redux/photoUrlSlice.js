import { createSlice } from '@reduxjs/toolkit'
export const photoUrlSlice = createSlice({
	name: 'photoUrl',
	initialState: {
		photoUrl: '',
	},
	reducers: {
		setPhotoUrl: (state, action) => {
			state.photoUrl = action.payload
		},
	},
})

export const selectPhotoUrl = (state) => state.photoUrl
export const { setPhotoUrl } = photoUrlSlice.actions
export default photoUrlSlice.reducer