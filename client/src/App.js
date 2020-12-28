import React, {useState, useEffect} from 'react'
import UrlForm from './components/UrlForm'
import UrlOp from './components/UrlOp'
import urlservice from './services/urls'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const App = () => {
  const [urls, setUrls] = useState([])
  const [newUrl, setNewUrl] = useState('')
  const [refreshClick, setRefreshClick] = useState(0)
  const [err, setErr] = useState({
    trigger : false,
    message : ''
  })
  
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
      const errObj = {
        trigger: true,
        message: 'Input url is illegal'
      }
      setErr(errObj)
      setNewUrl('')
      return
    }
    // add http:// if the url does not
    const appendUrl = (longurl) => {
      let modifiedUrl = ''
      if (!/^https?:\/\//i.test(longurl)) 
        modifiedUrl = 'http://' + longurl;
      else
        modifiedUrl = longurl
      return modifiedUrl
    }

    // Long url already existed
    const repeatedUrl = urls.find(url => appendUrl(newUrl)===url.longurl)
    if(repeatedUrl !== undefined){
      const errObj = {
        trigger: true,
        message: 'The long url has already existed.'
      }
      setErr(errObj)
      console.log('The long url has already existed.')
      setNewUrl('')
    }
    // Long url not yet exists
    else{
      console.log('submit',appendUrl(newUrl))
      const urlObject = {
        longurl: appendUrl(newUrl),
        shorturl: '' 
      }
      urlservice
      .create(urlObject)
      .then(returnedUrl => {
        setUrls(returnedUrl)
        console.log(returnedUrl)
        setNewUrl('')
      })
      .catch(error => {
        const errObj = {
          trigger: true,
          message: 'Url has already been added to the server.' 
        }
        setErr(errObj)
        
        // automatically refresh the list
        urlservice
        .getAll()
        .then(allUrls =>{
          setUrls(allUrls)
        })
      })
    }
  }

  // Delete existing urls according to the table
  const deleteUrl = (id) => {
    console.log(urls)
    const delUrl = urls.find(url => url.id === id)
    const filterUrl = urls.filter(url => url.id !== id)
    console.log(delUrl)

    urlservice
    .del(id)
    .then(() => {
      console.log(filterUrl)
      return setUrls(filterUrl)
    })
    .catch(error => {
      const errObj = {
        trigger: true,
        message: 'Url has already beeen delete from the server.' 
      }
      setErr(errObj)
      setUrls(urls.filter(url => url !== delUrl))
    })
  } 

  // handle url change
  const handleUrlChange = (event) => 
    setNewUrl(event.target.value)

  // handle refresh button clicked
  const handleRefreshClick = () =>
    setRefreshClick(refreshClick+1)
  
  // handler for alert snackbar
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    const errObj = {
      trigger: false,
      message: '' 
    }
    setErr(errObj);
  }; 

  return(
    <div>
      <h1>
        <center>Tiny Url Creator</center>
      </h1>
        <center>
          <UrlForm addUrl={addUrl} handleUrlChange={handleUrlChange}
          newUrl={newUrl} />
        </center>
        <Snackbar open={err.trigger} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="warning">
            {err.message}
          </Alert>
        </Snackbar>
        <center>
          <UrlOp refresh={handleRefreshClick} 
          urls={urls} del={deleteUrl} />
        </center>
    </div>
  )
}

export default App