export const getBirdDataById = async (id) => {
	const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/id`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			id,
		}),
	})
	const data = await res.json()
	if (res.status === 200) {
		return data
	} else {
		return null
	}
}
