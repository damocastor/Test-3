const express = require('express')
const hbs = require('hbs')
const pug = require('pug')
const fs = require('fs')

const port = process.env.PORT || 8080; 
var app = express(); 

app.set('view engine', 'pug')

app.use((req, res, next) => {
	const now = new Date().toString()
	const log = `${now}: ${req.method} ${req.url}`

	console.log(log)
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log('Unable to append to server.log')
		}
	})
	next()
})

// app.use((req, res, next) => {
// 	res.render('404.pug', {
// 		pageTitle: 'Maintainence'
// 	})
// })

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
 res.render('home.pug', {
	 pageTitle: 'Home Page'
 })
})

app.get('/about', (req, res) => {
    res.render('about.pug', {
			pageTitle: 'About Page'
		})
})

app.get('/bad', (req,res) => {
  res.send(
    {
    	errorMessage: 'Unable to handle request'
    }
	)
})

app.listen(port, () => {
	console.log(`Server is up on port ${port}`)
})