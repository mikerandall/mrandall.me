# AWS Deployment Summary

Your portfolio site is now configured for automated AWS deployment with CloudFront, S3, API Gateway, Lambda, and SES.

## 🎯 What Was Set Up

### Infrastructure Files Created

```
.github/workflows/deploy.yml           → GitHub Actions workflow
infrastructure/
  ├── cloudformation-template.yaml      → Full AWS stack (with Route 53)
  ├── cloudformation-template-namecheap-dns.yaml  → Simplified (Namecheap DNS)
  ├── lambda/
  │   ├── contact-form.js              → Email handler
  │   └── package.json                 → Lambda dependencies
  ├── get-outputs.sh                   → Helper script
  ├── SETUP_GUIDE.md                   → Quick start
  └── README.md                        → Infrastructure docs
```

### Code Changes

- ✅ Updated `Contact.jsx` with API integration
- ✅ Added form submission states (loading, success, error)
- ✅ Added CSS for form status messages
- ✅ Environment variable support (`.env.example`)
- ✅ Updated `.gitignore` for secrets

## 🚀 Quick Start

### 1. Add GitHub Secrets

Go to: **GitHub → Settings → Secrets and variables → Actions**

Add:
```
AWS_ACCESS_KEY_ID=<your-key>
AWS_SECRET_ACCESS_KEY=<your-secret>
```

### 2. Verify SES Email

```bash
# AWS Console → SES → Verified identities
# Create identity: me@mrandall.me
# Click verification link in email
```

### 3. Deploy

```bash
git add .
git commit -m "Setup AWS deployment"
git push origin main
```

### 4. Configure DNS

After deployment, get CloudFront domain:

```bash
./infrastructure/get-outputs.sh
```

Add to Namecheap DNS:
- **Host**: `@` → **Value**: `<cloudfront-domain>.cloudfront.net`
- **Host**: `www` → **Value**: `<cloudfront-domain>.cloudfront.net`

Add certificate validation CNAME records from AWS Certificate Manager

## 📋 What You Need to Do

### Before First Deploy

- [ ] Create AWS IAM user with proper permissions
- [ ] Add AWS credentials to GitHub Secrets
- [ ] Verify email address in SES (me@mrandall.me)
- [ ] Request SES production access (to send to any email)

### After First Deploy

- [ ] Get certificate validation CNAME from ACM
- [ ] Add validation CNAME to Namecheap DNS
- [ ] Wait for certificate validation (5-30 minutes)
- [ ] Add website CNAME records to Namecheap
- [ ] Update CloudFormation template to enable custom domain
- [ ] Push again to redeploy with custom domain

### Testing

- [ ] Visit https://mrandall.me
- [ ] Test contact form
- [ ] Verify email arrives at me@mrandall.me
- [ ] Check all pages load correctly

## 🏗️ Architecture

```
User → Namecheap DNS → CloudFront (CDN) → S3 (Static Files)
                                       ↘
                                    API Gateway → Lambda → SES → Email
```

## 💰 Monthly Cost

**~$0.50 - $2.00/month** for typical traffic

- S3: ~$0.50
- CloudFront: Free (under 1TB)
- Lambda: Free (under 1M requests)
- API Gateway: Free (under 1M requests)
- SES: Free (under 62k emails)
- ACM: Free

## 📚 Documentation

- **Quick Start**: `infrastructure/SETUP_GUIDE.md`
- **Detailed Guide**: `DEPLOYMENT.md`
- **Infrastructure**: `infrastructure/README.md`

## 🔧 Useful Commands

```bash
# Get stack outputs
./infrastructure/get-outputs.sh

# View Lambda logs
aws logs tail /aws/lambda/mrandall-me-contact-form --follow

# Manual deploy
npm run build
aws s3 sync dist/ s3://mrandall.me-website --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id <dist-id> \
  --paths "/*"
```

## ⚠️ Important Notes

### SSL Certificate

The SSL certificate requires DNS validation. You must:
1. Create certificate in ACM (done by CloudFormation)
2. Add validation CNAME records to Namecheap
3. Wait for validation (5-30 minutes)
4. Update CloudFormation to use custom domain

### SES Sandbox Mode

By default, SES is in sandbox mode:
- Can only send to verified email addresses
- Limited to 200 emails/day

To send to any email:
- Request production access in SES console
- Usually approved within 24 hours

### First Deploy

The first deployment takes 15-20 minutes because:
- CloudFormation creates all resources
- CloudFront distribution propagates globally
- Certificate validation (if DNS is configured)

Subsequent deployments take 3-5 minutes.

## 🐛 Troubleshooting

### Certificate validation stuck
```bash
# Check ACM certificate status
aws acm list-certificates --region us-east-1

# Verify DNS records in Namecheap match ACM requirements
```

### Contact form returns error
```bash
# Check Lambda logs
aws logs tail /aws/lambda/mrandall-me-contact-form --follow

# Verify SES email is verified
aws ses get-identity-verification-attributes \
  --identities me@mrandall.me \
  --region us-east-1
```

### Site not loading
```bash
# Check CloudFront distribution status
aws cloudfront list-distributions

# Check S3 bucket contents
aws s3 ls s3://mrandall.me-website/

# Test DNS
dig mrandall.me
```

## 🔄 Automated Deployments

Once set up, every push to `main` triggers:

1. ✅ Build React app
2. ✅ Update CloudFormation stack
3. ✅ Update Lambda function
4. ✅ Sync files to S3
5. ✅ Invalidate CloudFront cache

You can monitor progress in GitHub Actions tab.

## 🎉 Success Criteria

Your deployment is successful when:

- ✅ https://mrandall.me loads your site
- ✅ Contact form submits successfully
- ✅ Emails arrive at me@mrandall.me
- ✅ All pages have green padlock (HTTPS)
- ✅ GitHub Actions shows successful deployment

## 📧 Support

For issues:
1. Check `DEPLOYMENT.md` troubleshooting section
2. Review CloudWatch logs
3. Verify all AWS resources in console
4. Check GitHub Actions workflow logs

---

**Next**: Read `infrastructure/SETUP_GUIDE.md` and start your deployment! 🚀

