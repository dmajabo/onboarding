import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AuditInsert from './Rows/Insert'
import AuditUpdate from './Rows/Update'

export default function AuditList({audits}) {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table" size={'small'}>
                <TableHead>
                    <TableRow>
                        <TableCell>Operation</TableCell>
                        <TableCell align="left">Table </TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {audits.map((row, i) => {
                        if (row.operation === 'INSERT') return <AuditInsert row={row}/>
                        if (row.operation === 'UPDATE') return <AuditUpdate row={row}/>
                        return null;
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
