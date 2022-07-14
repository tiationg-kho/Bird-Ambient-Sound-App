const dotenv = require('dotenv').config()
const express = require('express')
const cors = require('cors')
const axios = require('axios')
const gis = require('g-i-s')
const bcrypt = require('bcrypt')
const { MongoClient, ServerApiVersion } = require('mongodb')

const saltRounds = 10

const app = express()
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@text-editor.dogkql5.mongodb.net/?retryWrites=true&w=majority`
let collection = null

const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
})

client.connect((err) => {
	collection = client.db('bird').collection('bird')
})

app.post('/delFromList', async (req, res) => {
	const { id, email, en } = req.body
	try {
		let find_res = await collection.findOne({ email })
		let { list } = find_res
		let new_list = list.filter((element) => element[0] !== id)
		const update_res = await collection.updateOne(
			{ email },
			{ $set: { list: new_list } }
		)
		const find_res_after = await collection.findOne({ email })
		const list_after = find_res_after.list
		return res.status(200).json({ email, list: list_after })
	} catch (error) {
		return res.status(500).json('error deling from list')
	}
})

app.post('/addToList', async (req, res) => {
	const { id, email, en } = req.body
	try {
		let find_res = await collection.findOne({ email })
		let { list } = find_res
		const update_res = await collection.updateOne(
			{ email },
			{ $set: { list: [...list, [id, en]] } }
		)
		const find_res_after = await collection.findOne({ email })
		const list_after = find_res_after.list
		return res.status(200).json({ email, list: list_after })
	} catch (error) {
		return res.status(500).json('error adding to list')
	}
})

app.post('/signin', async (req, res) => {
	const { email, password } = req.body
	const find_res = await collection.findOne({ email })
	if (find_res === null) {
		return res.status(500).json('wrong email')
	}
	const { hash, list } = find_res
	bcrypt.compare(req.body.password, hash, async function (err, result) {
		if (result === true) {
			res.status(200).json({ email, list })
		} else {
			res.status(500).json('error signing in')
		}
	})
})

app.post('/register', async (req, res) => {
	const { email, password } = req.body
	const find_res = await collection.findOne({ email })
	if (find_res !== null) {
		return res.status(500).json('email used')
	}
	bcrypt.hash(password, saltRounds, async function (err, hash) {
		const insert_res = await collection.insertOne({ email, hash, list: [] })
		const { list } = await collection.findOne({ email })
		return res.status(200).json({ email, list })
	})
})

app.post('/country', async (req, res) => {
	const { country } = req.body
	try {
		const recordings_res = await axios.get(
			`https://www.xeno-canto.org/api/2/recordings?query=cnt:${country}`,
			{
				method: 'GET',
			}
		)
		const recordings_data = await recordings_res.data

		if (recordings_data.numRecordings === '0') {
			return res.status(500).json('cannot get bird sounds')
		} else {
			const num = Number(recordings_data.numRecordings)
			const upper_bound = Math.min(num, 99)
			const idx = Math.floor(Math.random() * upper_bound)
			console.log(num, idx)
			return res.status(200).json(recordings_data.recordings[idx])
		}
	} catch (error) {
		return res.status(500).json('cannot get bird sounds')
	}
})

app.post('/id', async (req, res) => {
	const { id } = req.body
	try {
		const recordings_res = await axios.get(
			`https://www.xeno-canto.org/api/2/recordings?query=nr:${id}`,
			{
				method: 'GET',
			}
		)
		const recordings_data = await recordings_res.data
		return res.status(200).json(recordings_data.recordings[0])
	} catch (error) {
		return res.status(500).json('cannot get bird sounds')
	}
})

app.post('/photo', async (req, res) => {
	const { photo } = req.body
	try {
		await gis(photo, (e, results) => {
			return res.status(200).json(results[0])
		})
	} catch (error) {
		return res.status(500).json('cannot get bird photos')
	}
})

app.listen(process.env.PORT || 5001, () => {
	console.log(`app is listening ${process.env.PORT || 5001}`)
})

client.close()
