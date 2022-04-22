import * as cdk from "@aws-cdk/core";
import * as cloudfront from "@aws-cdk/aws-cloudfront";
import * as origins from "@aws-cdk/aws-cloudfront-origins";
import * as s3 from "@aws-cdk/aws-s3";
import * as acm from "@aws-cdk/aws-certificatemanager";
import * as route53 from "@aws-cdk/aws-route53";
import * as targets from "@aws-cdk/aws-route53-targets";
import iam = require('@aws-cdk/aws-iam');

export interface PublicWebStackProps extends cdk.StackProps {
  assetBucket: string;
  instance: string;
  prefix: string;
  delimeter: string;
  hostedZoneId: string;
  hostedZoneName: string;
  certificateArn: string;
  s3ServerAccessLogsBucket: boolean;
}

export class PublicWebStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: PublicWebStackProps) {
    super(scope, id, props);

    let assetsBucket: s3.Bucket;

    if (props.s3ServerAccessLogsBucket) {
      assetsBucket = new s3.Bucket(this, "distro-cdk-assets-bucket", {
      bucketName: props.prefix + props.delimeter + props.instance + props.delimeter + props.assetBucket,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      publicReadAccess: false,
      encryption: s3.BucketEncryption.S3_MANAGED,
      enforceSSL: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      serverAccessLogsBucket: s3.Bucket.fromBucketName(this, "loggingBucket", props.prefix + props.delimeter + props.instance + props.delimeter + cdk.Stack.of(this).region)
      });
    }
    else {
      assetsBucket = new s3.Bucket(this, "distro-cdk-assets-bucket", {
      bucketName: props.prefix + props.delimeter + props.instance + props.delimeter + props.assetBucket,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      publicReadAccess: false,
      encryption: s3.BucketEncryption.S3_MANAGED,
      enforceSSL: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      });
      }

      const certificate = acm.Certificate.fromCertificateArn(
        this,
        "Certificate",
        // found using aws acm list-certificates --region us-east-1
        props.certificateArn
      );

      const errorResponse: cloudfront.ErrorResponse = {
        httpStatus: 403,
        responseHttpStatus: 200,
        responsePagePath: '/index.html',
        ttl: cdk.Duration.seconds(300),
      };
      
      const cf = new cloudfront.Distribution(this, "cdnDistribution", {
        defaultBehavior: { origin: new origins.S3Origin(assetsBucket) },
        domainNames: [props.hostedZoneName],
        certificate,
        defaultRootObject: 'index.html',
        errorResponses: [errorResponse],
      });

      const zone = route53.HostedZone.fromHostedZoneAttributes(
        this,
        "distro-zone",
        {
          zoneName: props.hostedZoneName,
          hostedZoneId: props.hostedZoneId,
        }
      );
  
      new route53.ARecord(this, "CDNARecord", {
        zone,
        target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(cf)),
      });
  
      new route53.AaaaRecord(this, "AliasRecord", {
        zone,
        target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(cf)),
      });

       // Iam user for deployment
      const user = new iam.User(this, 'User', {
        userName: this.stackName + props.delimeter + "deploy",
      });

      // Onboarding deployment policy
      const onbaordingDeployPolicyDocument = {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Action": [
                  "s3:PutObject",
                  "s3:GetObject",
                  "s3:DeleteObject",
                  "s3:ListBucket"
                ],
                "Resource": [
                  "arn:aws:s3:::" + assetsBucket.bucketName,
                  "arn:aws:s3:::" + assetsBucket.bucketName + "/*"
                ]
            },
            {
              "Action": [
                  "cloudfront:CreateInvalidation",
                  "cloudfront:GetDistribution",
                  "cloudfront:GetStreamingDistribution",
                  "cloudfront:GetDistributionConfig",
                  "cloudfront:GetInvalidation",
                  "cloudfront:ListInvalidations",
                  "cloudfront:ListStreamingDistributions",
                  "cloudfront:ListDistributions"
              ],
              "Effect": "Allow",
              "Resource": "arn:aws:cloudfront::" + cdk.Stack.of(this).account + ":distribution/" + cf.distributionId
          }
        ]
      }

      const onboardingDeployManagedPolicy = new iam.ManagedPolicy(this, 'onboardingDeployPolicy', {
        document: iam.PolicyDocument.fromJson(onbaordingDeployPolicyDocument)
      });
  
      // Apply Onboarding deploy policy to IAM deployment user
      user.addManagedPolicy(onboardingDeployManagedPolicy)

  }
}
