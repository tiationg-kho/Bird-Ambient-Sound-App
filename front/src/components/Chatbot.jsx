import { IconButton, Typography, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import ChatIcon from '@mui/icons-material/Chat'

const Chatbot = () => {
	const [open, setOpen] = useState(false)
	const [msgs, setMsgs] = useState([])
	const [ask, setAsk] = useState({ user: 'user', text: '' })

	const handleClick = () => {
		setOpen(!open)
	}

	const handleAsk = async () => {
		if (ask.text === '') {
			return
		}
		let new_msgs = [...msgs]
		const user_question = { user: 'user', text: ask.text }
		new_msgs = [user_question, ...new_msgs]
		setAsk({ ...ask, text: '' })
		const res = await fetch(`${process.env.REACT_APP_CHATBOT_URL}/predict`, {
			method: 'POST',
            mode: 'cors',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				message: user_question.text,
			}),
		})
		const data = await res.json()

		const ans = { user: 'chatbot', text: data.answer }
		new_msgs = [ans, ...new_msgs]
		setMsgs(new_msgs)
	}

	return (
		<>
			{open && (
				<div
					style={{
						borderRadius: '5px',
						backgroundColor: 'white',
						width: '250px',
						height: '450px',
						position: 'fixed',
						bottom: '90px',
						right: '30px',
						padding: '10px',
					}}
				>
					<div>
						<div
							style={{
								padding: '5px',
								textAlign: 'center',
								borderBottom: '2px gray solid',
							}}
						>
							<Typography color='primary'>Cound I help you?</Typography>
						</div>
						<div
							style={{
								display: 'flex',
								flexDirection: 'column-reverse',
								height: '280px',
								overflowY: 'auto',
							}}
						>
							{msgs.map((msg, i) => {
								if (msg.user === 'user') {
									return (
										<div
											key={i}
											style={{
												width: 'fit-content',
												maxWidth: '80%',
												overflowWrap: 'break-word',
												backgroundColor: '#eeecee',
												padding: '5px',
												borderRadius: '5px',
												marginBottom: '5px',
												marginLeft: 'auto',
											}}
										>
											{msg.text}
										</div>
									)
								} else {
									return (
										<div
											key={i}
											style={{
												width: 'fit-content',
												maxWidth: '80%',
												overflowWrap: 'break-word',
												backgroundColor: '#e4ecee',
												padding: '5px',
												borderRadius: '5px',
												marginBottom: '5px',
												marginRight: 'auto',
											}}
										>
											{msg.text}
										</div>
									)
								}
							})}
						</div>
						<div className='text-center absolute bottom-2 ml-4'>
							<div className='mt-2'>
								<TextField
									name='ask'
									type='ask'
									placeholder='ask me anything'
									label='ask me anything'
									helperText='Please enter your question'
									value={ask.text}
									onChange={(e) => setAsk({ ...ask, text: e.target.value })}
									size='small'
									onKeyUp={(e) => {
										if (e.key === 'Enter') {
											return handleAsk()
										}
									}}
								/>
							</div>
							<div className='mt-2'>
								<Button variant='outlined' size='small' onClick={handleAsk}>
									Submit
								</Button>
							</div>
						</div>
					</div>
				</div>
			)}
			<IconButton
				onClick={handleClick}
				style={{ position: 'fixed', bottom: '30px', right: '30px' }}
			>
				<ChatIcon style={{ fontSize: 40, color: 'white' }} />
			</IconButton>
		</>
	)
}

export default Chatbot
