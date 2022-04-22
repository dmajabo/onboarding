import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Storage } from 'aws-amplify';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import ExistingFile from './ExistingFile';
import Upload from './ShowFile';

const UPDATE_FORM_DOCUMENT = gql`
    mutation MyMutation($account_id: uuid!, $id: String!, $field: String!) {
        insert_account_file_table(
            objects: { account_id: $account_id, id: $id, field: $field }
            on_conflict: { update_columns: id, constraint: account_file_table_field_account_id_key }
        ) {
            returning {
                id
            }
        }
    }
`;

const UploadComponent = ({
    refetch,
    handleMutation,
    field,
    account,
    level,
    title,
    header,
    footer,
    buttonLabel,
    uploadKey,
    size,
    fileType,
    showButtons
}) => {
    //const [fileName, setFileName] = useState('');
    const [uploading, setUploading] = useState(false);
   // const [uploadFinished, setUploadFinished] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [errorMessage, setErrorMessage] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [previewUrl, setPreviewUrl] = useState(null);

    const onDrop = useCallback((acceptedFiles) => {
        setErrorMessage('');

       // alert('put')
       // Storage.put("test.txt", "Hello");
        console.log(acceptedFiles);

        acceptedFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onabort = () => console.log('file reading was aborted');
            reader.onerror = () => {
                setErrorMessage('Upload failed. Try again.');
                setUploading(false);
                //setUploadFinished(false);
               // setFileName('');
               // setUploadFile(null);
                setPreviewUrl(null);

                alert('error')
            };
            reader.onload = () => {
                // Do whatever you want with the file contents
              // const binaryStr = reader.result;
               // setUploading(true);
                //setUploadFile(binaryStr);
                //setFileName(file.name);
               // setPreviewUrl(URL.createObjectURL(file));

                //console.log('put')
               // alert('put')
               // alert(makeKeyName(file.name))
               // Storage.put("test.txt", "Hello");


                Storage.put(makeKeyName(file.name), file, {
                    contentType: '*/*',
                    level: 'private',
                }).then((res) => {
                    console.log(res)
                   // setUploadFinished(true);
                    setUploading(false);
                    handleMutation && handleMutation({ variables: { field, account_id: account.id, id: res.key } });
                });
            };
            reader.readAsArrayBuffer(file);
        });
    }, []);

    const makeKeyName = (str) => {
        return `${Date.now()}${str.replace(/[^a-zA-Z0-9.]/g, '')}`;
    };

    const maxSize = size;

    const { getRootProps, getInputProps, fileRejections } = useDropzone({
        onDrop,
        accept: fileType,
        minSize: 0,
        maxSize: maxSize,
    });

    //we look for a file in the account file table
    const matchedInDB = account.files.find((f) => f.field === field);

    return (
        <div>
            {!uploading && <span className="text-gray-700 text-sm">{header}</span>}

            <div {...getRootProps()}>

                <input {...getInputProps()} />
                {!matchedInDB && (
                    <Upload uploading={uploading} label={'Upload ' + title} />
                )}
            </div>

            {/*{alert(matchedInDB)}*/}

            {matchedInDB && <ExistingFile showButtons={showButtons} file={matchedInDB} refetch={refetch} label={title + ' : ' + matchedInDB.id.slice(13)} />}
        </div>
    );
};

const UploadComponentWrapper = ({
    refetch,
    field,
    account,
    level,
    title,
    size,
    fileType,
    showButtons
}) => (
    <Mutation
        mutation={UPDATE_FORM_DOCUMENT}
        onCompleted={() => {
            refetch();
        }}
        onError={() => alert('nope')}
    >
        {(handleMutation, { loading, error }) => (
            <UploadComponent
                refetch={refetch}
                field={field}
                account={account}
                level={level}
                title={title}
                size={size}
                fileType={fileType}
                handleMutation={handleMutation}
                showButtons={showButtons}
            />
        )}
    </Mutation>
);

export default UploadComponentWrapper;
