# Infrastructure

This directory contains AWS infrastructure configuration for deploying mrandall.me.

## Files

### CloudFormation Templates

- **`cloudformation-template.yaml`** - Full AWS infrastructure with Route 53 DNS
  - Includes hosted zone for DNS management
  - Automatic SSL certificate validation
  - Costs: ~$0.50-$2/month

- **`cloudformation-template-namecheap-dns.yaml`** - Infrastructure using Namecheap DNS (Recommended)
  - No Route 53 hosted zone
  - Manual DNS configuration in Namecheap
  - Costs: ~$0.50-$1.50/month

### Lambda Function

- **`lambda/contact-form.js`** - Contact form email handler
  - Processes form submissions
  - Sends emails via AWS SES
  - Includes HTML email template

### Helper Scripts

- **`get-outputs.sh`** - Get CloudFormation stack outputs
  ```bash
  ./infrastructure/get-outputs.sh
  ```

### Documentation

- **`SETUP_GUIDE.md`** - Quick start guide for deployment
- **`../DEPLOYMENT.md`** - Comprehensive deployment documentation

## Quick Commands

### Deploy Stack

```bash
aws cloudformation create-stack \
  --stack-name mrandall-portfolio \
  --template-body file://infrastructure/cloudformation-template-namecheap-dns.yaml \
  --capabilities CAPABILITY_IAM \
  --parameters \
    ParameterKey=DomainName,ParameterValue=mrandall.me \
    ParameterKey=ContactEmail,ParameterValue=me@mrandall.me \
  --region us-east-1
```

### Update Stack

```bash
aws cloudformation update-stack \
  --stack-name mrandall-portfolio \
  --template-body file://infrastructure/cloudformation-template-namecheap-dns.yaml \
  --capabilities CAPABILITY_IAM \
  --parameters \
    ParameterKey=DomainName,ParameterValue=mrandall.me \
    ParameterKey=ContactEmail,ParameterValue=me@mrandall.me \
  --region us-east-1
```

### Get Outputs

```bash
./infrastructure/get-outputs.sh
```

### Update Lambda Function

```bash
cd infrastructure/lambda
zip -r function.zip contact-form.js
aws lambda update-function-code \
  --function-name mrandall.me-contact-form \
  --zip-file fileb://function.zip \
  --region us-east-1
```

### View Lambda Logs

```bash
aws logs tail /aws/lambda/mrandall.me-contact-form --follow --region us-east-1
```

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Internet                             │
└─────────────────────────────────────────────────────────────┘
                              │
                    ┌─────────┴──────────┐
                    │                    │
              ┌─────▼─────┐      ┌──────▼──────┐
              │ Namecheap │      │  CloudFront │
              │    DNS    │      │     CDN     │
              └───────────┘      └──────┬──────┘
                                        │
                          ┌─────────────┼─────────────┐
                          │             │             │
                    ┌─────▼─────┐ ┌────▼────┐ ┌──────▼──────┐
                    │    ACM    │ │   S3    │ │ API Gateway │
                    │   (SSL)   │ │ Bucket  │ │             │
                    └───────────┘ └─────────┘ └──────┬──────┘
                                                      │
                                               ┌──────▼──────┐
                                               │   Lambda    │
                                               │  Function   │
                                               └──────┬──────┘
                                                      │
                                               ┌──────▼──────┐
                                               │     SES     │
                                               │   (Email)   │
                                               └─────────────┘
                                                      │
                                                      ▼
                                              me@mrandall.me
```

## Resources Created

1. **S3 Bucket** - Static website files
2. **CloudFront Distribution** - CDN for global delivery
3. **ACM Certificate** - SSL/TLS for HTTPS
4. **API Gateway** - REST API endpoint
5. **Lambda Function** - Contact form handler
6. **IAM Roles** - Lambda execution permissions
7. **CloudWatch Logs** - Lambda function logs

## Cost Breakdown

| Service | Cost | Notes |
|---------|------|-------|
| S3 | ~$0.50/month | Storage + requests |
| CloudFront | Free | Under 1TB/month |
| API Gateway | Free | Under 1M requests/month |
| Lambda | Free | Under 1M invocations/month |
| SES | Free | Under 62k emails/month |
| ACM | Free | SSL certificates |
| **Total** | **~$0.50-$1.50/month** | For typical traffic |

## Security

- S3 bucket is private (CloudFront OAC access only)
- HTTPS enforced via CloudFront
- API Gateway has CORS configured
- Lambda has minimal IAM permissions
- SES requires email verification

## Monitoring

### CloudWatch Metrics

- Lambda invocations and errors
- API Gateway requests and latency
- CloudFront cache hit ratio

### Logs

```bash
# Lambda logs
aws logs tail /aws/lambda/mrandall.me-contact-form --follow

# CloudFormation events
aws cloudformation describe-stack-events --stack-name mrandall-portfolio
```

## Troubleshooting

See [DEPLOYMENT.md](../DEPLOYMENT.md#troubleshooting) for detailed troubleshooting steps.

## Support

For issues or questions, check:
1. CloudFormation events
2. Lambda CloudWatch logs
3. API Gateway execution logs
4. SES sending statistics

