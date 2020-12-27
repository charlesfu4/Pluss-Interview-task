const express = require('express')
const cors = require('cors')
const {nanoid} = require('nanoid')
const app = express()

app.use(express.json())
app.use(cors())

let urls = []

// get all urls
app.get('/api/urls', (request, response) =>{
  response.json(urls)
})

// get specfic url with id
app.get('/api/urls/:id', (request, response) =>{
  const id = number(request.params.id)
  const url = urls.find(url => url.id === id)
  if(url) return response.json(url)
  else return response.status(404).end()
})

// redirect to longurl with specific shorturl 
app.get('/pluss.app/:shorturl', (request, response) =>{
  const shorturl = request.params.shorturl
  const url = urls.find(url => url.shorturl === shorturl)
  console.log('redirect',url)
  if(url.longurl) return response.status(301).redirect(url.longurl)
  else return response.status(404).end()
})

// delete specific url with id
app.delete('/api/urls/:id', (request, response) => {
  const id = Number(request.params.id)
  urls = urls.filter(url => url.id !== id)
  
  response.status(204).end()
})

// create new url
const generateId = () => {
  const maxId = urls.length > 0
    ? Math.max(...urls.map(url => url.id))
    : 0
  return maxId + 1
}
  
app.post('/api/urls', (request, response) => {
  const body = request.body

  if (!body.longurl) {
    return response.status(400).json({ 
    error: 'longurl missing' 
    })
  }
  const url = {
    longurl: body.longurl,
    shorturl: nanoid(10),
    id: generateId(),
  }

  urls = urls.concat(url)
  console.log(urls)

  response.json(urls)
})

const PORT = 3001 
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})