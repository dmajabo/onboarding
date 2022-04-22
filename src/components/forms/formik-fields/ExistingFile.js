import React, { Fragment, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import makeStyles from '@mui/styles/makeStyles';
import { Button} from '@mui/material';
import { Storage } from "aws-amplify"
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import DescriptionIcon from "@mui/icons-material/Description";
import Chip from "@mui/material/Chip";

import { Box } from '@mui/material';

import { Document, Page, pdfjs } from "react-pdf";
import './pdfViewer.css'
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const DELETE_FILE = gql`
      mutation MyMutation($id : String!) {
          delete_account_file_table_by_pk(id: $id) {
            id
          }
      }
`;


export default function FileChip({ showButtons, refetch, file, label }) {

    const [showFile, setShowFile] = useState(false);

    const useStyles = makeStyles({
        list: {
            width: '33%',
        }
    });

    const classes = useStyles();
    const [fileUrl, setFileUrl] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [numPages, setNumPages] = useState(null)

    const DownloadFile = async (e) => {
        Storage.get(e, { level: 'private', download: true }).then((res) => {
            setFileUrl(URL.createObjectURL(res.Body));
        })
    }

    const handleOpenDrawer = () => {

        DownloadFile(file.id);

        setTimeout(() => {
            setShowFile(true);
        }, 10);
    }
    function onDocumentLoadSuccess({ numPages, event }) {
        setNumPages(numPages);
        setCurrentPage(1);
    }

    return (
        <Mutation
            mutation={DELETE_FILE}
            variables={{ id: file.id }}
            onCompleted={(e) => {
                refetch && refetch();
            }}
            onError={(e) => {
                alert(e);
            }}
        >
            {(MyMutation, { loading, error }) => {

                return (
                    <Fragment>

                        <Drawer anchor={'right'} open={showFile} onClose={() => setShowFile(false)}>

                            {/*preview handled here*/}
                            {/*<FileViewer file={file}/>*/}
                            <Box width="450px">

                                {fileUrl !== null &&


                                    <Document
                                        file={fileUrl}
                                        onLoadError={console.error}
                                        onLoadSuccess={onDocumentLoadSuccess}
                                    >
                                        <Page
                                            pageNumber={currentPage}
                                            width={400}
                                            renderMode="canvas"
                                        />
                                    </Document>}

                                {currentPage > 1 && <Button onClick={() => setCurrentPage(currentPage - 1)}>prev</Button>
                                }                                <strong>{currentPage}</strong>
                                {numPages > currentPage && <Button onClick={() => setCurrentPage(currentPage + 1)}>next</Button>
                                }



                            </Box>
                        </Drawer>

                        <Chip
                            color="primary"
                            icon={<DescriptionIcon />}
                            label={label}
                            onClick={() => {
                                handleOpenDrawer()

                            }}
                            onDelete={() => MyMutation()}

                        />

                    </Fragment>
                );
            }}
        </Mutation>
    );
}
