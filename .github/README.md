# GitHub Actions Configuration

This directory contains GitHub Actions workflows for automated deployment.

## Workflows

### `deploy.yml` - AWS Deployment

Automatically deploys your portfolio site to AWS when you push to the `main` branch.

**Trigger**: Push to `main` branch or manual workflow dispatch

**Steps**:
1. Checkout code
2. Setup Node.js
3. Install dependencies
4. Build React app
5. Configure AWS credentials
6. Deploy/Update CloudFormation stack
7. Update Lambda function code
8. Sync files to S3
9. Invalidate CloudFront cache

**Duration**: 
- First deploy: ~15-20 minutes
- Subsequent deploys: ~3-5 minutes

## Required Secrets

Set these in: **Settings → Secrets and variables → Actions**

| Secret | Description | Where to Get |
|--------|-------------|--------------|
| `AWS_ACCESS_KEY_ID` | AWS access key | IAM user credentials |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key | IAM user credentials |

Optional (automatically fetched from CloudFormation):
- `API_ENDPOINT` - API Gateway endpoint (auto-populated)

## IAM Permissions Required

The GitHub Actions IAM user needs these policies:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "cloudformation:*",
        "s3:*",
        "cloudfront:*",
        "apigateway:*",
        "lambda:*",
        "iam:*",
        "ses:*",
        "acm:*",
        "route53:*",
        "logs:*"
      ],
      "Resource": "*"
    }
  ]
}
```

Or attach these managed policies:
- `AWSCloudFormationFullAccess`
- `AmazonS3FullAccess`
- `CloudFrontFullAccess`
- `AmazonAPIGatewayAdministrator`
- `AWSLambda_FullAccess`
- `IAMFullAccess`
- `AmazonSESFullAccess`
- `AWSCertificateManagerFullAccess`
- `AmazonRoute53FullAccess`

## Monitoring Deployments

View deployment status:
1. Go to **Actions** tab in GitHub
2. Click on the latest workflow run
3. Expand steps to see details

## Manual Trigger

You can manually trigger a deployment:

1. Go to **Actions** tab
2. Select "Deploy to AWS" workflow
3. Click "Run workflow"
4. Select `main` branch
5. Click "Run workflow"

## Workflow Outputs

After each deployment, the workflow displays:
- ✅ Stack name and status
- 📦 S3 bucket name
- 🌐 CloudFront distribution ID
- 🔌 API Gateway endpoint
- 🌍 Website URL

## Environment Variables

The workflow sets these environment variables during build:

```yaml
VITE_API_ENDPOINT: Injected from CloudFormation outputs
```

This ensures your React app always uses the correct API endpoint.

## Deployment Stages

```
┌─────────────────┐
│  Push to main   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Install deps   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Build React   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Update CloudFrm │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Update Lambda   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Upload to S3  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Invalidate CDN  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ ✅ Deployed!    │
└─────────────────┘
```

## Troubleshooting

### "Stack does not exist"

First deployment creates the stack. This is expected.

### "No updates to be performed"

No infrastructure changes detected. Files are still synced to S3.

### AWS credentials error

1. Verify secrets are set correctly
2. Check IAM user has required permissions
3. Ensure access keys are active

### Build fails

```bash
# Test locally first
npm install
npm run build
```

### Lambda update fails

Check Lambda function exists:
```bash
aws lambda get-function --function-name mrandall-me-contact-form
```

### CloudFront invalidation fails

Check distribution exists and is enabled:
```bash
aws cloudfront list-distributions
```

## Best Practices

1. **Never commit secrets** - Always use GitHub Secrets
2. **Test locally** - Run `npm run build` before pushing
3. **Monitor logs** - Check Actions tab for deployment status
4. **Use branches** - Develop in feature branches, merge to main
5. **Semantic commits** - Use clear commit messages

## Workflow Customization

### Change trigger branch

```yaml
on:
  push:
    branches:
      - production  # Change from 'main'
```

### Add staging environment

```yaml
on:
  push:
    branches:
      - main      # Production
      - staging   # Staging
```

### Add tests before deploy

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm test
  
  deploy:
    needs: test  # Run after tests pass
    # ... deploy steps
```

## Notifications

### Add Slack notifications

```yaml
- name: Notify Slack
  if: always()
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

### Add email notifications

GitHub sends email notifications for failed workflows by default.

## Cost Impact

GitHub Actions is free for public repositories:
- 2,000 minutes/month for private repos
- Unlimited for public repos

This workflow uses ~5 minutes per deployment.

## Security

- Secrets are encrypted in GitHub
- AWS credentials have scoped permissions
- No sensitive data in logs
- HTTPS-only communication

## Support

For workflow issues:
1. Check Actions tab logs
2. Review `deploy.yml` syntax
3. Verify AWS permissions
4. Test AWS CLI commands locally

---

**Note**: This workflow is configured for the `mrandall-portfolio` stack in `us-east-1`. Update in `deploy.yml` if using different settings.

