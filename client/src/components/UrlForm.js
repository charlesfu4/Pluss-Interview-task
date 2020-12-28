import React from 'react'
import { TextField, Button } from '@material-ui/core'
const UrlForm = ({addUrl, handleUrlChange, newUrl}) => {
  return(
    <form onSubmit={addUrl}>
          <div>
              <TextField placeholder="Url to shorten" value={newUrl} 
              onChange={handleUrlChange}></TextField>
              <Button variant="contained" color="primary"
               type="submit" size="small">Shorten url</Button>
              <div><br></br></div>
          </div>
      </form>
  )

}

export default UrlForm