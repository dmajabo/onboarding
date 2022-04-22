import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import withStyles from '@mui/styles/withStyles';
import Avatar from "@mui/material/Avatar";
import {Chip, Badge} from "@mui/material";

export default function SmallChips({username, admin, superadmin}) {

    return (
        <div style={{padding : '5px'}}>

            {superadmin && <Badge badgeContent={'Distro Energy'} color="primary">
                <Chip label={username} color="info"   />
            </Badge> }

            {admin  && <Badge badgeContent={'Admin'} color="primary"  >
                <Chip label={username} color="info"  />
            </Badge> }

            {!admin && !superadmin && <Chip label={username} color="info"  />}
        </div>
    );
}
