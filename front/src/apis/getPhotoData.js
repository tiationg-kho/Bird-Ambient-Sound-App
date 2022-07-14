export const getPhotoData = async (query) => {
  const photo = query.replace(' ', '_') + '_bird'
	const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/photo`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			photo,
		}),
	})
	const data = await res.json()
	if (res.status === 200) {
		return data
	} else {
		return null
	}
}
