import React from 'react';
import { List } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ListItemText from '@mui/material/ListItemText';

const MeterList = ({ meters }) => (
    <div>
        <List component="nav" aria-label="main mailbox folders">
            {meters.map((m) => {
                return (
                    <ListItem button key={m.id}>
                        <ListItemIcon title={m.name}>
                            <VerifiedUserIcon style={{ color: 'green' }} />
                        </ListItemIcon>

                        <ListItemText>
                            {m.name} {m.id}
                        </ListItemText>
                    </ListItem>
                );
            })}
        </List>
    </div>
);
export default MeterList;
