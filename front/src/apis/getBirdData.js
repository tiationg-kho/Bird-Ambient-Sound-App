export const getBirdData = async (query) => {
	const country = query.label.replace(' ', '_')
	const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/country`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			country,
		}),
	})
	const data = await res.json()
	if (res.status === 200) {
		return data
	} else {
		return null
	}
}
