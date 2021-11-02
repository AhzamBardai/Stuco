import React, { useState, useEffect } from 'react';
import { Box } from '@mui/system';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Typography, Stack, TextField, IconButton } from '@mui/material';
import axios from 'axios'
import useUserContext from '../custom/contexts/useUserContext'
import MemberTableHead from './MemberTableHead';
import MemberModal from './MemberModal';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useMediaQuery } from '@mui/material';
import FilterModal from './FilterModal'
import SideBar from '../main/SideBar';
import { useTheme } from '@mui/material/styles';

const sortComparator = (a, b, orderBy) => (b[orderBy] < a[orderBy]) ?  -1 : (b[orderBy] > a[orderBy]) ?  1 :  0;

const getComparator = (order, orderBy) => order === 'desc' ? (a, b) => sortComparator(a, b, orderBy) : (a, b) => -sortComparator(a, b, orderBy);


export default function MemberList() {

  const theme = useTheme()
  const [open, setOpen] = useState(false);
  const [filterModal, setFilterModal] = useState(false)
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [rows, setRows] = useState()
  const [member, setMember] = useState()
  const [filter, setFilter] = useState('')
  const { user, url, setUsers } = useUserContext()

  useEffect(() => {
    if(user){
      axios.get(url + `users/${user._id}`)
        .then(res => {
            setUsers(res.data)
            const rowData = res.data.map((item, ind) => {
              return {...item , id: ind + 1, memberId: item._id }
            })
            setRows(rowData)
        })
    }
  }, [setUsers, url, user])
        
        
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  
  
  const handleOpen = (id) => {
    setOpen(true)
    axios.get(url +`users/one/${id}`)
      .then(res => {
        setMember(res.data)
      })
  }
  const handleClose = () => setOpen(false)

  const filterModalClose = () => setFilterModal(false)

  const checkFilter = (item) => item.fullName.toLowerCase().includes(filter) || item.position.toLowerCase().includes(filter) || item.email.toLowerCase().includes(filter) //|| item.contact.toLowerCase().includes(filter)
  
  
  return (

    <div style={{ display: 'flex', flexDirection: 'row' , justifyContent: 'space-around', alignItems: 'center', height: '100vh', backgroundColor: theme.palette.background.default }} >
 
    <SideBar />

    <Paper sx={{width: '65%', ml: 5}} elevation={5}>
      <Stack direction='row' sx={{ flex: '1 1 100%', justifyContent: 'space-evenly', alignItems: 'baseline' }} >

          <Typography
          
            sx={{ fontSize: '30px' , p:3 , pl: { sm: 2 }, pr: { xs: 1, sm: 1 },}}
            variant="h6"
            id="tableTitle"
            component="div"
          >
              Stuco 2021 - 2022
          </Typography>

          { useMediaQuery('(min-width: 600px)') 
            ? <TextField value={filter} onChange={(e) => setFilter(e.target.value)} helperText='Filter through list here.' /> 
            : <IconButton onClick={() => setFilterModal(true)} > <FilterListIcon /> </IconButton>
          }
      </Stack>
      <TableContainer >
        <Table size='medium'  >

          <MemberTableHead
            order={order}
            orderBy={orderBy}
            handleRequestSort={handleRequestSort}
            rowCount={rows?.length}
          />
          <TableBody>
            { rows && rows.filter(item => filter === '' ? true : checkFilter(item)).sort(getComparator(order, orderBy))
              .map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={() => handleOpen(row.memberId) }
                    role="checkbox"
                    tabIndex={-1}
                    key={row.name}
                    sx={{cursor: 'pointer'}}
                  >
                    
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      align='center'
                    >
                      {row.fullName}
                    </TableCell>
                    <TableCell align='center'>{row.position}</TableCell>
                    <TableCell align='center'>{row.email}</TableCell>
                    <TableCell align='center'>{row.contact ? row.contact : 'None' }</TableCell>
                    <TableCell align='center'>{row.isAdmin ? 'Yes' : 'No'}</TableCell>
                    <TableCell align='center'>{row.isApproved ? 'Yes' : 'No'}</TableCell>
                  </TableRow>
                );
              })}
            
          </TableBody>
        </Table>
      </TableContainer>
      
              <MemberModal open={open} member={member} handleClose={handleClose} />
              <FilterModal open={filterModal} filter={filter} setFilter={setFilter} handleClose={filterModalClose} />
    </Paper>
  </div>
  );
  }