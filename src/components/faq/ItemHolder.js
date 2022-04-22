import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import React, {useState, Fragment} from "react";

export default ({title}) => {

    const [open, setOpen] = useState(false);

    return <Fragment>
        <Typography variant={'h6'}>

            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>

            {title}
        </Typography>

        <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1} style={{paddingLeft : '0px'}}>
                like this....

            </Box>
        </Collapse>
    </Fragment>

}
