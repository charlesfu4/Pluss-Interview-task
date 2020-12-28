import React, {useState, useEffect} from 'react'
import UrlForm from './components/UrlForm'
import UrlOp from './components/UrlOp'
import urlservice from './services/urls'

const App = () => {
  const [urls, setUrls] = useState([])
  const [newUrl, setNewUrl] = useState('')
  const [refreshClick, setRefreshClick] = useState(0)
  
  /** retrieve data from server whenever
    the refreshClick is updated */ 
  useEffect(() => {
    console.log('refresh')
    urlservice
    .getAll()
    .then(allUrls =>{
      setUrls(allUrls)
    })
  },[refreshClick]) 

  // validURL checker
  const validURL = (str) => {
    let pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }

  // Add new long url and create shorten version
  const addUrl = (event) =>{
    event.preventDefault()

    // Not a legal url
    if(!validURL(newUrl)){
      console.log('Input url is illegal.')
      return
    }
    
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
        setUrls(returnedUrl)
        console.log(returnedUrl)
        setNewUrl('')
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
  const handleRefreshClick = () =>
    setRefreshClick(refreshClick+1)

  return(
    <div>
      <h1>
        <center>Tiny Url Creator</center>
      </h1>
        <center>
          <UrlForm addUrl={addUrl} handleUrlChange={handleUrlChange}
          newUrl={newUrl} />
        </center>
        <center>
          <UrlOp refresh={handleRefreshClick} 
          urls={urls} del={deleteUrl} />
        </center>
    </div>
  )
}

export default App