#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { PublicWebStack } from '../lib/public-web-stack';
import { Tags } from '@aws-cdk/core';

const config = require('config');

const stackName = config.prefix + config.delimeter + config.instance + config.delimeter + "public-web";

const innoTags: { [index: string]: any; } = {
    'Owner': config.owner,
    'Environment': config.instance
};

const app = new cdk.App();
new PublicWebStack(app, stackName, {
    env: config.envEuWest1,
    instance: config.instance,
    prefix: config.prefix,
    delimeter: config.delimeter,
    assetBucket: config.assetBucket,
    hostedZoneId: config.hostedZoneId,
    hostedZoneName: config.hostedZoneName,
    certificateArn: config.certificateArn,
    s3ServerAccessLogsBucket: config.s3ServerAccessLogsBucket
});

// Apply tags
for (let key in innoTags) {
    let value = innoTags[key];
    Tags.of(app).add(key, value);
}
  
app.synth();