const path = require('path')
const express = require('express')
const cors = require('cors')
const { v4 } = require('uuid')
const app = express()

let CONTACTS = [
	{
		id: 1,
		name: 'Dan',
		value: '+77777777777',
		marked: false,
	},
	{
		id: 2,
		name: 'Niko',
		value: '+11111111111',
		marked: true,
	},
]

app.use(cors())
app.use(express.json())

// GET
app.get('/api/contacts', (req, res) => {
	res.status(200).json(CONTACTS)
})

// POST
app.post('/api/contacts', (req, res) => {
	const contact = { ...req.body, id: v4(), marked: false }
	CONTACTS.push(contact)
	res.status(201).json(contact)
})

// DELETE
app.delete('/api/contacts/:id', (req, res) => {
	CONTACTS = CONTACTS.filter((c) => c.id !== req.params.id)
	res.status(200).json({ message: 'Контакт удалён!' })
})

// PUT
app.put('/api/contacts/:id', (req, res) => {
	const idx = CONTACTS.findIndex((c) => c.id === req.params.id)
	CONTACTS[idx] = req.body
	res.json(CONTACTS[idx])
})

app.use(express.static(path.resolve(__dirname, 'client')))

app.listen(3000, () => console.log('Server has been started on port 3000...'))
