import React from 'react'

const UrlForm = ({addUrl, handleUrlChange, newUrl}) => {
  return(
      <form onSubmit={addUrl}>
          <div>
              <input placeholder="Url to shorten" value={newUrl} 
              onChange={handleUrlChange}></input>
              <button type="submit">Shorten url</button>
          </div>
          
      </form>
  )

}

export default UrlForm