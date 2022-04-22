import React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import './styles.scss'
import {useHistory} from "react-router-dom";

const options = [
    'None',
    'Atria',
];

const ITEM_HEIGHT = 48;

const Circle = () => <svg viewBox="0 0 170 177" width="170" height="177" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="none">
    <defs>

        <linearGradient y2="0.75294" x2="0.78235" y1="-0.31177" x1="-0.21765" id="paint0_linear">
            <stop stopColor="#FAD961"/>
            <stop stopColor="#F76B1C" offset="1"/>
        </linearGradient>
        <linearGradient y2="0.93506" x2="0.96753" y1="-0.24026" x1="-0.13636" id="paint1_linear">
            <stop stopColor="#FAD961"/>
            <stop stopColor="#F76B1C" offset="1"/>
        </linearGradient>
    </defs>
    <g>
        <path id="svg_5" fill="url(#paint0_linear)" d="m77.68254,0.31748c0,11.16238 -2.1986,22.21538 -6.4702,32.52808c-4.2717,10.3127 -10.5327,19.683 -18.4257,27.576c-7.893,7.893 -17.2633,14.154 -27.576,18.4257c-10.3127,4.2716 -21.36575,6.4702 -32.52811,6.4702l0,-8.5c10.04612,0 19.99391,-1.9787 29.27531,-5.8232c9.2814,-3.8445 17.7147,-9.4794 24.8184,-16.5831c7.1036,-7.1037 12.7386,-15.537 16.5831,-24.8184c3.8445,-9.2814 5.8232,-19.2292 5.8232,-29.27528l8.5,0z"/>
        <path id="svg_6" fill="url(#paint1_linear)" d="m61.68254,-7.68253c0,10.11179 -1.9916,20.12459 -5.8613,29.46659c-3.8696,9.3421 -9.5414,17.8305 -16.6915,24.9806c-7.1501,7.1501 -15.6385,12.8219 -24.9806,16.6915c-9.34204,3.8696 -19.35482,5.8613 -29.4666,5.8613l0,-77l77,0.00001z"/>
    </g>
</svg>

export default function ({user, account, signOut}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const history = useHistory();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

   let role =  '';

    switch(user.role.user_role) {
        case "account-admin":
            role = 'Admin';
            break;
        case "admin":
           role = 'Super Admin'
            break;
        default:
            role = "User";
    }

    return (
        <div className={'UserIcon'}>

            <div className={'circleHolder'}>
                <Circle/>
            </div>

            <div className={'menuHolder'}>
                <IconButton
                    className={'Menu'}
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    id={'testUserMenu'}
                    onClick={handleClick}
                    size="large">
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        style: {
                            width: '20ch',
                        },
                    }}
                >

                    <MenuItem key={'faq'} onClick={() => {
                        handleClose();
                        history.push('/faq');
                    }}>
                       FAQ
                    </MenuItem>

                    <MenuItem key={'help'} onClick={() => {
                        handleClose();
                        history.push('/help');
                    }}>
                        Help
                    </MenuItem>

                    <MenuItem id='testSignOut' key={'logout'} onClick={() => {
                        handleClose();
                        signOut();
                    }}>
                      Sign Out
                    </MenuItem>

                </Menu>

            </div>

            <div className={'contents'}>

                <div className={'circle'}>
                    <span className={'initials'}>
                        {user.Name[0]}
                        {user.FamilyName[0]}
                    </span>

                    <div className={'role ' + role }>
                        {role}
                    </div>

                </div>

                <footer>
                    {user.UserName}

                    <div>{account.name}</div>
                </footer>

            </div>

        </div>
    );
}
