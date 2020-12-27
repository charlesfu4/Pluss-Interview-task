import React, {useState, useEffect} from 'react'
import UrlForm from './components/UrlForm'
import UrlTable from './components/UrlTable'
import urlservice from './services/urls'

const App = () => {
  const [urls, setUrls] = useState([])
  const [newUrl, setNewUrl] = useState('')
  const [refreshClick, setRefreshClick] = useState(0)
  
  /** retrieve data from server wheneve
    the refreshClick is updated */ 
  useEffect(() => {
    console.log('refresh')
    urlservice
    .getAll()
    .then(allUrls =>{
      setUrls(allUrls)
    })
  },[refreshClick]) 

  // Add new long url and create shorten version
  const addUrl = (event) =>{
    event.preventDefault()
    // Long url already existed
    const repeatedUrl = urls.find(url => url.longurl === newUrl)
    if(repeatedUrl !== undefined){
      console.log(`id ${repeatedUrl.id}`)

    }
    // Long url not yet exists
    else{
      const urlObject = {
        longurl: newUrl,
        shorturl: newUrl
      }
      urlservice
      .create(urlObject)
      .then(returnedUrl => {
        setUrls(urls.concat(returnedUrl))
        console.log(returnedUrl)
      })
    }
  }

  // Delete existing urls according to the table
  const deleteUrl = (id) => {
    const delUrl = urls.find(url => url.id === id)
    const filterUrl = urls.filter(url => url.id !== id)

    urlservice
    .del(id)
    .then(() => setUrls(filterUrl))
    .catch(error => {
      console.log(error)
      setUrls(urls.filter(url => url !== delUrl))
    })
  } 

  // handle url change
  const handleUrlChange = (event) => 
    setNewUrl(event.target.value)

  // handle refresh button clicked
  const handleRefreshClick = (event) =>
    setRefreshClick(refreshClick+1)

  return(
    <div>
      <h1>
        <center>Tiny Url Creator</center>
      </h1>
      <div className="row">
        <div className="column">
          <center>
            <UrlForm addUrl={addUrl} handleUrlChange={handleUrlChange}
            newUrl={newUrl} />
          </center>
        </div>
        <div className="column">
          <center>
            <UrlTable refresh={handleRefreshClick} 
            urls={urls} del={deleteUrl} />
          </center>
        </div>
      </div>
    </div>
  )
}

export default App