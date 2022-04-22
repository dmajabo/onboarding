cd frontend; yarn build; aws s3 sync build s3://${AWS_BUCKET}
