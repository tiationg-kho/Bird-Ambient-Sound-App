export const delFromList = async (id, email, en) => {
	const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/delFromList`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			id,
      email,
      en,
		}),
	})
	const data = await res.json()
	if (res.status === 200) {
		return data
	} else {
		return null
	}
}
