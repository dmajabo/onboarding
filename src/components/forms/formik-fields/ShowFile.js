import React from 'react'
import DescriptionIcon from "@mui/icons-material/Description";
import Chip from "@mui/material/Chip";

export default ({showButtons, uploading, label}) => <Chip
                                                          color="primary"
                                                          disabled={uploading}
                                                          icon={<DescriptionIcon />}
                                                          label={label} />
