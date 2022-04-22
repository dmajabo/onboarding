import * as React from 'react';
import Table from '@mui/material/Table';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddStage from './AddStage'
import DeleteStage from './DeleteStage'
import TitleEditor from "./TitleEditor";

export default function BasicTable({refetch, stages, setStage, stage}) {
    return (
        <TableContainer component={Paper}>

            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell align="right">View State</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {stages.map((_stage, index) => (
                        <TableRow
                            key={_stage.id}
                            style={{backgroundColor : index === stage ? 'lightgrey' : 'transparent'}}

                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row" >
                                <DeleteStage stage={_stage} setStage={setStage} refetch={refetch}/>
                                <Button onClick={() => setStage(index)}>Preview</Button>
                            </TableCell>
                            <TableCell component="th" scope="row">
                                <TitleEditor stage={_stage}/>
                            </TableCell>
                            <TableCell>
                                <Chip label={_stage.viewstate?.latitude + '/' + _stage.viewstate?.longitude   } color="primary" />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <AddStage stage={stage} setStage={setStage} refetch={refetch}>Add Stage</AddStage>

        </TableContainer>
    );
}
