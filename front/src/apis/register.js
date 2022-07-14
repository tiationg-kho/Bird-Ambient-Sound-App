export const register = async (email, password) => {
	const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/register`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			email,
      password,
		}),
	})
	const data = await res.json()
	if (res.status === 200) {
		return data
	} else {
		return null
	}
}
