import React from "react";
import PropTypes from 'prop-types';
import { visuallyHidden } from '@mui/utils';
import { TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { Box } from '@mui/system';
import { useTheme } from "@mui/system";


export default function MemberTableHead({ order, orderBy, handleRequestSort }) {
  
  const headCells = [
        {
          id: 'fullName',
          label: 'Name',
          sx:{
            width: '200px',
            textAlign: 'center',
            verticalAlign: 'middle',
            fontSize: '20px'
          }
        },
        {
          id: 'position',
          label: 'Position',
          sx:{
            width: '120px',
            textAlign: 'center',
            verticalAlign: 'middle',
            fontSize: '20px'
          }

        },
        {
          id: 'email',
          label: 'Email',
          sx:{
            width: '200px',
            textAlign: 'center',
            verticalAlign: 'middle',
            fontSize: '20px'
          }
        },
        {
            id: 'contact',
            label: 'Contact',
            sx:{
                width: '200px',
                textAlign: 'center',
                verticalAlign: 'middle',
                fontSize: '20px',

    
              }
            },
        {
          id: 'isAdmin',
          label: 'Admin',
          sx:{
            width: '200px',
            textAlign: 'center',
            verticalAlign: 'middle',
            fontSize: '20px'

          }
        },
        {
          id: 'isApproved',
          label: 'Approved',
          sx:{
              width: '200px',
              textAlign: 'center',
              verticalAlign: 'middle',
              fontSize: '20px',
  
            }
        },
      ];
      
    const theme = useTheme()
    // const header = theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.
    const handleSort = (property) => (event) => {
      handleRequestSort(event, property);
    };
  
    return (
      <TableHead sx={{background: theme.palette.secondary.light}} >
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align='center'
              padding='normal'
              sortDirection={orderBy === headCell.id ? order : false}
              sx={headCell.sx}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={handleSort(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
  
  MemberTableHead.propTypes = {
    
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
  
  };
  