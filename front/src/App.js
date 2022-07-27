import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'

import './App.css'
import Chatbot from './components/Chatbot'
import Header from './components/Header'
import MainPage from './Pages/MainPage'
import RegisterPage from './Pages/RegisterPage'
import SigninPage from './Pages/SigninPage'

function App() {
	return (
		<>
			<BrowserRouter>
				<div id='bg' />
				<Header />
				<div className='bird-container'>
					<div className='bird'></div>
				</div>
				<div className='bird-container-second'>
					<div className='bird-second'></div>
				</div>
				<div>
					<Chatbot />
				</div>
				<Routes>
					<Route exact path='/' element={<MainPage />} />
					<Route path='signin' element={<SigninPage />} />
					<Route path='register' element={<RegisterPage />} />
					<Route path='*' element={<Navigate to='/' />} />
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
