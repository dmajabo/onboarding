# Public-web!

Deploy CDN (Cloudfront) with S3 bucket to store assets
## Configuration
This project uses npm config.  Please place a config file under the config dir.

e.g. config/distro-dev.json

To run:
```
NODE_ENV=distro-dev <command>
```

## Build stack
```
NODE_ENV=distro-dev npm run build
```

## Deploy Stack
```
NODE_ENV=distro-dev cdk deploy --profile <sso profile>
```

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template
