import React, { useState } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Viewer from '../../oldform/Viewer';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const FORM_TEMPLATES = gql`
    query ($role: String) {
        form_template_table(where: { role: { _eq: $role } }) {
            model
            role
            type
        }
    }
`;

const FormPreview = ({ admin, setFormsForUser, hideForm }) => {
    const [tab, setTab] = useState(0);

    return (
        <Query
            query={FORM_TEMPLATES}
            variables={{ role: admin ? 'site-admin' : 'site-user' }}
            onError={() => alert('nope')}
            onCompleted={(data) => setFormsForUser(data.form_template_table)} /*set the forms to be sent to the user*/
        >
            {({ data, loading, refetch }) => {
                if (loading) return <span>loading</span>;
                return (
                    <div>
                        <Tabs
                            value={tab}
                            onChange={(i, newValue) => setTab(newValue)}
                            indicatorColor="primary"
                            textColor="primary"
                            scrollButtons="auto"
                            aria-label="scrollable auto tabs example"
                        >
                            {data.form_template_table.map((ft, i) => (
                                <Tab label={ft.type} />
                            ))}
                        </Tabs>

                        {!hideForm &&
                            data.form_template_table.map((ft, i) => (
                                <TabPanel value={tab} index={i}>
                                    <
                                        Viewer forms={[ft]} />
                                </TabPanel>
                            ))}
                    </div>
                );
            }}
        </Query>
    );
};

export default FormPreview;
