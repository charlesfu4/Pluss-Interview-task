import React from 'react'

const UrlTable = ({refresh, urls, del}) =>{
  return (
      <div>
          <button onClick={refresh}>Refresh</button>
          <table>
              <thead>
                  <tr>
                      <th>Long Url</th>
                      <th>Short Url</th>
                      <th>Actions</th>
                  </tr>
              </thead>
              <tbody>
                  {urls.map((url, i) => 
                    <tr key={i}>
                        <td>{url.longurl}</td>
                        <td>{url.shorturl}</td>
                        <td><button onClick={() => del(url.id)}>Delete</button></td>
                    </tr>
                  )}
              </tbody>
          </table>
      </div>
  )
}

export default UrlTable