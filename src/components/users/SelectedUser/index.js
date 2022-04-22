import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function SimpleModal({ setSelectedUser, selectedUser }) {
    const [tab, setTab] = useState(0);

    return (
        <Drawer
            width={'800'}
            anchor={'right'}
            open={!!selectedUser}
            onClose={() => {
                setSelectedUser(null);
            }}
        >
            {selectedUser && (
                <div style={{ width: '500px' }}>
                    <h1>{selectedUser.UserName}</h1>
                    <div>
                        <Tabs
                            value={tab}
                            onChange={(i, newValue) => setTab(newValue)}
                            indicatorColor="primary"
                            textColor="primary"
                            scrollButtons
                            aria-label="scrollable auto tabs example"
                            allowScrollButtonsMobile>
                            {selectedUser.forms.map((ft, i) => (
                                <Tab label={ft.type} />
                            ))}
                        </Tabs>


                    </div>
                </div>
            )}
        </Drawer>
    );
}
