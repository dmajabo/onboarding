import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Table from '@mui/material/Table';

const WindTurbineList = ({ data }) => {
    return (
        <Table aria-label="collapsible table">
            <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>No. of Turbines</TableCell>
                    <TableCell>Capacity Per Turbine</TableCell>
                    <TableCell>Meter</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map(row => (
                    <TableRow>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.number}</TableCell>
                        <TableCell>{row.capacity}</TableCell>
                        <TableCell>{row.meter.description}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default WindTurbineList;
