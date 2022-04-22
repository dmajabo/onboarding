import React, {useState} from 'react';
import { Box } from '@mui/material';
import Mutation from './Form';
import Collapse from "@mui/material/Collapse";

export default function SimpleModal({
    visible,
    hide,
    selectedAccount,
    refetch,
}) {

    const [admin, setAdmin] = useState(false);

    return <Collapse in={visible} timeout="auto" unmountOnExit>
        <Box margin={1}>
            <Mutation refetch={refetch} hide={hide} admin={admin} setAdmin={setAdmin} selectedAccount={selectedAccount} />
        </Box>
    </Collapse>

}
