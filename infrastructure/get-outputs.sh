#!/bin/bash

# Script to get CloudFormation stack outputs
# Usage: ./get-outputs.sh

STACK_NAME="mrandall-portfolio"
REGION="us-east-1"

echo "🔍 Fetching CloudFormation outputs for stack: $STACK_NAME"
echo ""

# Check if stack exists
if ! aws cloudformation describe-stacks --stack-name $STACK_NAME --region $REGION > /dev/null 2>&1; then
    echo "❌ Stack '$STACK_NAME' not found in region $REGION"
    echo ""
    echo "💡 Available stacks:"
    aws cloudformation list-stacks --region $REGION --query 'StackSummaries[?StackStatus!=`DELETE_COMPLETE`].StackName' --output table
    exit 1
fi

# Get stack status
STACK_STATUS=$(aws cloudformation describe-stacks \
    --stack-name $STACK_NAME \
    --region $REGION \
    --query 'Stacks[0].StackStatus' \
    --output text)

echo "📊 Stack Status: $STACK_STATUS"
echo ""

if [[ $STACK_STATUS == *"IN_PROGRESS"* ]]; then
    echo "⏳ Stack is currently being updated. Please wait for it to complete."
    exit 0
fi

# Get outputs
echo "📤 Stack Outputs:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Get all outputs
OUTPUTS=$(aws cloudformation describe-stacks \
    --stack-name $STACK_NAME \
    --region $REGION \
    --query 'Stacks[0].Outputs[*].[OutputKey,OutputValue,Description]' \
    --output text)

if [ -z "$OUTPUTS" ]; then
    echo "⚠️  No outputs found for this stack"
    exit 0
fi

# Parse and display outputs
echo "$OUTPUTS" | while IFS=$'\t' read -r key value description; do
    echo "🔹 $key"
    echo "   $value"
    if [ -n "$description" ]; then
        echo "   💬 $description"
    fi
    echo ""
done

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Get specific important values
CLOUDFRONT_DOMAIN=$(aws cloudformation describe-stacks \
    --stack-name $STACK_NAME \
    --region $REGION \
    --query 'Stacks[0].Outputs[?OutputKey==`CloudFrontDomainName`].OutputValue' \
    --output text)

API_ENDPOINT=$(aws cloudformation describe-stacks \
    --stack-name $STACK_NAME \
    --region $REGION \
    --query 'Stacks[0].Outputs[?OutputKey==`ContactFormApiEndpoint`].OutputValue' \
    --output text)

BUCKET_NAME=$(aws cloudformation describe-stacks \
    --stack-name $STACK_NAME \
    --region $REGION \
    --query 'Stacks[0].Outputs[?OutputKey==`WebsiteBucketName`].OutputValue' \
    --output text)

# Quick actions
echo "🚀 Quick Actions:"
echo ""

if [ -n "$CLOUDFRONT_DOMAIN" ]; then
    echo "Visit your site:"
    echo "  https://$CLOUDFRONT_DOMAIN"
    echo ""
    echo "Add this CNAME to Namecheap:"
    echo "  Host: @"
    echo "  Value: $CLOUDFRONT_DOMAIN"
    echo ""
fi

if [ -n "$API_ENDPOINT" ]; then
    echo "Add to .env.local:"
    echo "  VITE_API_ENDPOINT=$API_ENDPOINT"
    echo ""
fi

if [ -n "$BUCKET_NAME" ]; then
    echo "Sync files to S3:"
    echo "  aws s3 sync dist/ s3://$BUCKET_NAME --delete"
    echo ""
fi

echo "View Lambda logs:"
echo "  aws logs tail /aws/lambda/mrandall-me-contact-form --follow"
echo ""

echo "Check certificate status:"
echo "  aws acm list-certificates --region $REGION --output table"
echo ""

