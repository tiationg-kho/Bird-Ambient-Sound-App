import { Button, Typography } from '@mui/material'
import React, {useState} from 'react'
import { useSelector } from 'react-redux'

import { selectRecording } from '../redux/recordingSlice'

const Wiki = () => {
  const [info, setInfo] = useState('')
  const [en, setEn] = useState('')

  const states = useSelector(selectRecording)
	const recording = states.recording
  
  if (Object.keys(recording).length !== 0 && info){
    if (en !== recording.en){
      setEn(recording.en)
      setInfo('')
    }
  }
  

	const handleSummary = async (summary) => {
    if(info){
      setInfo('')
      return
    }


		const res = await fetch(`${process.env.REACT_APP_WIKI}/summary/${summary}`)
    if (res.status !== 200){
      setInfo('sorry cannot find further info')
      return null
    }else{
      const data = await res.json()
      setInfo(data)
      return data
    }
	}

	return (
		<div>
      <Button onClick={() => handleSummary(recording.en + '_bird')}>click for further info</Button>
      {info && <Typography>{info}</Typography>}
		</div>
	)
}

export default Wiki
