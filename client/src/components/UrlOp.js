import React from 'react'
import { Button } from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/Delete'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);
  
const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})

const buttonStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));


const UrlOp = ({refresh, urls, del}) =>{
  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={useStyles().table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Long Url</StyledTableCell>
              <StyledTableCell>Short Url</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {urls.map((url, i) => 
              <StyledTableRow key={i}>
                <StyledTableCell>
                  <a href={url.longurl}>{url.longurl}</a>
                </StyledTableCell>
                <StyledTableCell>
                  <a href={`http://localhost:3001/s/${url.shorturl}`}>
                      {url.shorturl}</a>
                </StyledTableCell>
                <StyledTableCell>
                  <Button
                  onClick={() => del(url.id)}
                  variant="contained"
                  color="secondary"
                  className={buttonStyles.button}
                  startIcon={<DeleteIcon />}
                  >
                  Delete
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <div><br></br></div>
      <Button variant="outlined" color="secondary"
        onClick={refresh} size="small">Refresh list</Button>
    </div>
  )
}

export default UrlOp