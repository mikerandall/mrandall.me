# AWS Deployment Guide

This guide walks you through deploying your portfolio site to AWS with automated deployments via GitHub Actions.

## Architecture Overview

- **Static Hosting**: S3 + CloudFront
- **Contact Form**: API Gateway + Lambda + SES
- **SSL Certificate**: AWS Certificate Manager (ACM)
- **DNS**: Route 53 (for certificate validation) + Namecheap (primary DNS)
- **CI/CD**: GitHub Actions

## Prerequisites

- AWS Account
- GitHub Account
- Domain registered with Namecheap (mrandall.me)
- AWS CLI installed (for initial setup verification)

## Initial Setup

### Step 1: Configure AWS Credentials

1. Log in to AWS Console
2. Navigate to IAM → Users → Create User
3. Create a user named `github-actions-deployer`
4. Attach the following policies:
   - `AWSCloudFormationFullAccess`
   - `AmazonS3FullAccess`
   - `CloudFrontFullAccess`
   - `AmazonAPIGatewayAdministrator`
   - `AWSLambda_FullAccess`
   - `IAMFullAccess`
   - `AmazonSESFullAccess`
   - `AWSCertificateManagerFullAccess`
   - `AmazonRoute53FullAccess`

5. Create access keys and save them securely

### Step 2: Configure GitHub Secrets

In your GitHub repository, go to Settings → Secrets and variables → Actions, and add these secrets:

```
AWS_ACCESS_KEY_ID=<your-access-key-id>
AWS_SECRET_ACCESS_KEY=<your-secret-access-key>
```

### Step 3: Verify SES Email

AWS SES requires email verification before you can send emails.

1. Go to AWS Console → SES → Verified identities
2. Click "Create identity"
3. Select "Email address"
4. Enter: `me@mrandall.me`
5. Click "Create identity"
6. Check your email and click the verification link

**Important**: SES starts in "Sandbox" mode. To send to any email address:
1. Go to SES → Account dashboard
2. Click "Request production access"
3. Fill out the form (usually approved within 24 hours)

While in sandbox mode, you can only send emails to verified addresses.

### Step 4: Initial CloudFormation Deployment

The first deployment will be triggered automatically when you push to the `main` branch. However, you need to complete DNS validation for the SSL certificate.

1. Push your code to GitHub (main branch)
2. GitHub Actions will start the deployment
3. The deployment will create a Route 53 hosted zone and request an ACM certificate
4. Go to AWS Console → Certificate Manager (us-east-1 region)
5. Find the certificate for `mrandall.me`
6. It will show "Pending validation" with CNAME records

### Step 5: Configure DNS in Namecheap

#### Option A: Use AWS Route 53 Nameservers (Recommended)

This is simpler and allows AWS to manage your DNS completely.

1. After the CloudFormation stack is created, go to:
   - AWS Console → CloudFormation → Stacks → mrandall-portfolio → Outputs
2. Find the `NameserversList` output
3. Log in to Namecheap
4. Go to Domain List → mrandall.me → Manage
5. Set "Nameservers" to "Custom DNS"
6. Add the 4 nameservers from the CloudFormation output
7. Save changes

**DNS propagation can take up to 48 hours** (usually 1-2 hours)

#### Option B: Use Namecheap DNS with CNAME Records

If you prefer to keep Namecheap as your DNS provider:

1. Go to AWS Certificate Manager → Certificates
2. Copy the CNAME validation records
3. In Namecheap:
   - Go to Advanced DNS
   - Add the CNAME records for certificate validation
   - Add a CNAME record:
     - Type: `CNAME Record`
     - Host: `@`
     - Value: `<your-cloudfront-distribution>.cloudfront.net`
     - TTL: Automatic
   - Add another CNAME record:
     - Type: `CNAME Record`
     - Host: `www`
     - Value: `<your-cloudfront-distribution>.cloudfront.net`
     - TTL: Automatic

4. Wait for certificate validation (5-30 minutes)

**Note**: If using this option, you should remove the Route 53 hosted zone from the CloudFormation template to avoid unnecessary charges.

### Step 6: Verify Deployment

After DNS propagation:

1. Visit `https://mrandall.me`
2. Test the contact form
3. Check that emails arrive at `me@mrandall.me`

## Manual Deployment (if needed)

If you need to deploy manually or troubleshoot:

```bash
# Install dependencies
npm install

# Build the site
npm run build

# Deploy CloudFormation stack
aws cloudformation create-stack \
  --stack-name mrandall-portfolio \
  --template-body file://infrastructure/cloudformation-template.yaml \
  --capabilities CAPABILITY_IAM \
  --parameters \
    ParameterKey=DomainName,ParameterValue=mrandall.me \
    ParameterKey=ContactEmail,ParameterValue=me@mrandall.me \
  --region us-east-1

# Wait for stack creation
aws cloudformation wait stack-create-complete \
  --stack-name mrandall-portfolio \
  --region us-east-1

# Get outputs
aws cloudformation describe-stacks \
  --stack-name mrandall-portfolio \
  --region us-east-1 \
  --query 'Stacks[0].Outputs'

# Upload to S3
BUCKET_NAME=$(aws cloudformation describe-stacks \
  --stack-name mrandall-portfolio \
  --query 'Stacks[0].Outputs[?OutputKey==`WebsiteBucketName`].OutputValue' \
  --output text \
  --region us-east-1)

aws s3 sync dist/ s3://${BUCKET_NAME} --delete

# Invalidate CloudFront cache
DISTRIBUTION_ID=$(aws cloudformation describe-stacks \
  --stack-name mrandall-portfolio \
  --query 'Stacks[0].Outputs[?OutputKey==`CloudFrontDistributionId`].OutputValue' \
  --output text \
  --region us-east-1)

aws cloudfront create-invalidation \
  --distribution-id ${DISTRIBUTION_ID} \
  --paths "/*"
```

## Automated Deployment

Once set up, deployments are automatic:

1. Push to `main` branch
2. GitHub Actions will:
   - Build the React app
   - Update CloudFormation stack
   - Update Lambda function
   - Sync files to S3
   - Invalidate CloudFront cache

Monitor deployment progress in GitHub Actions tab.

## Environment Variables

The contact form API endpoint is injected during build:

```bash
VITE_API_ENDPOINT=<api-gateway-url>
```

This is automatically set by GitHub Actions. For local development:

1. Copy `.env.example` to `.env.local`
2. Update with your actual API endpoint (from CloudFormation outputs)

## Costs

This setup should cost approximately **$0.50-$5/month** depending on traffic:

- **S3**: ~$0.50/month for storage + data transfer
- **CloudFront**: Free tier covers most personal sites (1TB/month)
- **Route 53**: $0.50/month per hosted zone (optional if using Namecheap DNS)
- **Lambda**: Free tier covers up to 1M requests/month
- **API Gateway**: Free tier covers up to 1M requests/month
- **SES**: $0 for 62,000 emails/month (outbound from EC2)
- **ACM**: Free

## Monitoring

### View Logs

**Lambda Logs:**
```bash
aws logs tail /aws/lambda/mrandall-me-contact-form --follow
```

**CloudFormation Events:**
```bash
aws cloudformation describe-stack-events --stack-name mrandall-portfolio
```

### Debugging Contact Form

If the contact form isn't working:

1. Check Lambda logs in CloudWatch
2. Verify SES email is verified
3. Check API Gateway CORS configuration
4. Test Lambda function directly in AWS Console

## Updating the Site

1. Make changes to your code
2. Commit and push to `main` branch
3. GitHub Actions automatically deploys

## Updating Lambda Function Only

If you only need to update the contact form handler:

```bash
cd infrastructure/lambda
zip -r function.zip contact-form.js

aws lambda update-function-code \
  --function-name mrandall-me-contact-form \
  --zip-file fileb://function.zip
```

## Rollback

To rollback to a previous version:

```bash
# List stack updates
aws cloudformation list-stack-resources --stack-name mrandall-portfolio

# Rollback
aws cloudformation rollback-stack --stack-name mrandall-portfolio
```

## Cleanup

To completely remove all AWS resources:

```bash
# Empty S3 bucket first
BUCKET_NAME=$(aws cloudformation describe-stacks \
  --stack-name mrandall-portfolio \
  --query 'Stacks[0].Outputs[?OutputKey==`WebsiteBucketName`].OutputValue' \
  --output text \
  --region us-east-1)

aws s3 rm s3://${BUCKET_NAME} --recursive

# Delete stack
aws cloudformation delete-stack --stack-name mrandall-portfolio --region us-east-1
```

## Troubleshooting

### Certificate Validation Stuck

- Check that DNS records are correctly added
- Wait 30 minutes for propagation
- Try deleting and recreating the certificate

### Contact Form Returns 500 Error

- Check Lambda CloudWatch logs
- Verify SES email is verified
- Ensure SES is out of sandbox mode (or recipient email is verified)

### Site Not Loading

- Check CloudFront distribution status
- Verify DNS propagation: `dig mrandall.me`
- Check S3 bucket has files
- Verify CloudFront origin is correctly configured

### GitHub Actions Fails

- Check AWS credentials are set correctly in GitHub Secrets
- Verify IAM user has required permissions
- Check CloudFormation events for detailed errors

## Security Notes

1. Never commit AWS credentials to git
2. Use least-privilege IAM policies
3. Rotate AWS access keys periodically
4. Enable CloudTrail for audit logging
5. Consider adding WAF for DDoS protection (additional cost)

## Next Steps

- Set up custom error pages
- Add CloudWatch alarms for monitoring
- Enable S3 versioning for backups
- Add CloudFront access logs
- Configure SPF/DKIM for email domain

## Support

For issues:
1. Check CloudWatch logs
2. Review CloudFormation events
3. Test components individually in AWS Console

