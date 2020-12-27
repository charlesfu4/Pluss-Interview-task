import React from 'react'

const UrlOp = ({refresh, urls, del}) =>{
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
              {urls.map((url, i) => 
              <tbody key={i}>
                    <tr>
                        <td>{url.longurl}</td>
                        <td>{`http://localhost:3001/pluss.app/${url.shorturl}`}</td>
                        <td><button onClick={() => del(url.id)}>Delete</button></td>
                    </tr>
              </tbody>
              )}
          </table>
      </div>
  )
}

export default UrlOp