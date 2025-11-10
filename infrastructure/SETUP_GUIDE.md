# Quick Setup Guide

This is a simplified guide to get your site deployed quickly. For detailed instructions, see [DEPLOYMENT.md](../DEPLOYMENT.md).

## Prerequisites

✅ AWS Account  
✅ GitHub Account  
✅ Domain: mrandall.me (registered with Namecheap)

## Quick Start (5 Steps)

### 1️⃣ Configure GitHub Secrets

Add to your GitHub repository (Settings → Secrets and variables → Actions):

```
AWS_ACCESS_KEY_ID=<your-key>
AWS_SECRET_ACCESS_KEY=<your-secret>
```

### 2️⃣ Verify SES Email

```bash
# Go to AWS Console → SES → Verified identities
# Create identity for: me@mrandall.me
# Click the verification link in your email
```

### 3️⃣ Choose Your DNS Setup

**Option A: Use Namecheap DNS** (Simpler - Recommended)
- Use: `cloudformation-template-namecheap-dns.yaml`
- You'll manually add DNS records in Namecheap

**Option B: Use Route 53**
- Use: `cloudformation-template.yaml`
- AWS manages DNS completely
- Costs: $0.50/month for hosted zone

### 4️⃣ Update GitHub Actions Workflow

If using Namecheap DNS, update `.github/workflows/deploy.yml`:

```yaml
# Change this line:
--template-body file://infrastructure/cloudformation-template.yaml \
# To:
--template-body file://infrastructure/cloudformation-template-namecheap-dns.yaml \
```

### 5️⃣ Push to GitHub

```bash
git add .
git commit -m "Setup AWS deployment"
git push origin main
```

## Post-Deployment Steps

### Get CloudFront Domain

After deployment completes:

```bash
aws cloudformation describe-stacks \
  --stack-name mrandall-portfolio \
  --region us-east-1 \
  --query 'Stacks[0].Outputs[?OutputKey==`CloudFrontDomainName`].OutputValue' \
  --output text
```

### Add DNS Records in Namecheap

1. Log in to Namecheap
2. Go to Domain List → mrandall.me → Manage → Advanced DNS
3. Add records:

**Certificate Validation CNAME:**
- Get from AWS Certificate Manager → Certificates → mrandall.me
- Add the CNAME records shown

**Wait 5-30 minutes for certificate validation**

**Website CNAME Records:**
```
Type: CNAME Record
Host: @
Value: <cloudfront-domain-from-above>.cloudfront.net
TTL: Automatic

Type: CNAME Record
Host: www
Value: <cloudfront-domain-from-above>.cloudfront.net
TTL: Automatic
```

### Update CloudFormation for Custom Domain

After certificate is validated, you need to update the CloudFormation template to use your custom domain:

1. Edit `infrastructure/cloudformation-template-namecheap-dns.yaml`
2. In the `CloudFrontDistribution` section, uncomment these lines:
```yaml
Aliases:
  - !Ref DomainName
  - !Sub 'www.${DomainName}'
ViewerCertificate:
  AcmCertificateArn: !Ref Certificate
  SslSupportMethod: sni-only
  MinimumProtocolVersion: TLSv1.2_2021
```
3. Comment out:
```yaml
# ViewerCertificate:
#   CloudFrontDefaultCertificate: true
```
4. Commit and push to trigger redeployment

## Verify Deployment

```bash
# Check DNS
dig mrandall.me

# Visit site
open https://mrandall.me

# Test contact form
# Fill out and submit - check me@mrandall.me for email
```

## Get API Endpoint for Local Development

```bash
aws cloudformation describe-stacks \
  --stack-name mrandall-portfolio \
  --region us-east-1 \
  --query 'Stacks[0].Outputs[?OutputKey==`ContactFormApiEndpoint`].OutputValue' \
  --output text
```

Copy this to `.env.local`:
```
VITE_API_ENDPOINT=<api-endpoint-from-above>
```

## Troubleshooting

### Certificate stuck on "Pending validation"
- Check DNS records in Namecheap are correct
- Wait 30 minutes
- Check AWS Certificate Manager for validation status

### Contact form not working
```bash
# Check Lambda logs
aws logs tail /aws/lambda/mrandall-me-contact-form --follow

# Verify email
# AWS Console → SES → Verified identities → me@mrandall.me (should be green)
```

### Site not loading
- Check DNS propagation: `dig mrandall.me`
- Verify CloudFront distribution status in AWS Console
- Check S3 bucket has files

## Costs

Expected monthly cost: **$0.50-$2.00**

- S3: ~$0.50
- CloudFront: Free tier (1TB/month)
- Lambda: Free tier (1M requests/month)
- API Gateway: Free tier
- SES: Free (62k emails/month)
- ACM: Free
- Route 53: $0.50/month (if using Option B)

## Next Deployment

Just push to main:
```bash
git add .
git commit -m "Update content"
git push origin main
```

GitHub Actions handles the rest! 🚀

