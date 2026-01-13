#!/bin/bash

# =============================================================================
# Ever Here Prints - Vercel Deployment Script
# =============================================================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}"
echo "=============================================="
echo "   Ever Here Prints - Deployment Script"
echo "=============================================="
echo -e "${NC}"

# -----------------------------------------------------------------------------
# Pre-flight Checks
# -----------------------------------------------------------------------------

echo -e "${YELLOW}Running pre-deployment checks...${NC}"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}Error: Node.js is not installed${NC}"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi
echo -e "${GREEN}[OK]${NC} Node.js $(node -v)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}Error: npm is not installed${NC}"
    exit 1
fi
echo -e "${GREEN}[OK]${NC} npm $(npm -v)"

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}Vercel CLI not found. Installing...${NC}"
    npm install -g vercel
fi
echo -e "${GREEN}[OK]${NC} Vercel CLI installed"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}Error: package.json not found${NC}"
    echo "Please run this script from the project root directory"
    exit 1
fi
echo -e "${GREEN}[OK]${NC} package.json found"

# Check if .env.example exists
if [ ! -f ".env.example" ]; then
    echo -e "${RED}Error: .env.example not found${NC}"
    exit 1
fi
echo -e "${GREEN}[OK]${NC} .env.example exists"

# Check for uncommitted changes
if [ -d ".git" ]; then
    if [[ -n $(git status -s) ]]; then
        echo -e "${YELLOW}[WARN]${NC} Uncommitted changes detected"
        read -p "Continue anyway? (y/N) " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    else
        echo -e "${GREEN}[OK]${NC} Git working directory clean"
    fi
fi

echo ""

# -----------------------------------------------------------------------------
# Environment Variables Check
# -----------------------------------------------------------------------------

echo -e "${YELLOW}Checking environment variable configuration...${NC}"
echo ""

# List of required environment variables
REQUIRED_VARS=(
    "ADMIN_USERNAME"
    "ADMIN_PASSWORD"
    "JWT_SECRET"
    "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
    "STRIPE_SECRET_KEY"
    "NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN"
)

echo "Required environment variables:"
for var in "${REQUIRED_VARS[@]}"; do
    echo "  - $var"
done

echo ""
echo -e "${YELLOW}These variables must be set in the Vercel dashboard.${NC}"
echo ""

# -----------------------------------------------------------------------------
# Build Test
# -----------------------------------------------------------------------------

echo -e "${YELLOW}Testing build locally...${NC}"
echo ""

read -p "Run local build test before deploying? (Y/n) " -n 1 -r
echo

if [[ $REPLY =~ ^[Nn]$ ]]; then
    echo "Skipping local build test"
else
    echo "Running build..."
    if npm run build; then
        echo -e "${GREEN}[OK]${NC} Build successful"
    else
        echo -e "${RED}Build failed! Fix errors before deploying.${NC}"
        exit 1
    fi
fi

echo ""

# -----------------------------------------------------------------------------
# JWT Secret Generation (Optional)
# -----------------------------------------------------------------------------

echo -e "${YELLOW}Need to generate a JWT secret?${NC}"
read -p "Generate a secure JWT secret? (y/N) " -n 1 -r
echo

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo -e "${GREEN}Generated JWT Secret:${NC}"
    echo ""
    node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
    echo ""
    echo -e "${YELLOW}Copy this value and add it to Vercel as JWT_SECRET${NC}"
    echo ""
fi

# -----------------------------------------------------------------------------
# Deployment
# -----------------------------------------------------------------------------

echo -e "${BLUE}Ready to deploy!${NC}"
echo ""

echo "Deployment options:"
echo "  1) Preview deployment (default)"
echo "  2) Production deployment"
echo "  3) Cancel"
echo ""

read -p "Select option (1/2/3): " -n 1 -r
echo ""

case $REPLY in
    2)
        echo -e "${YELLOW}Deploying to production...${NC}"
        echo ""
        vercel --prod
        echo ""
        echo -e "${GREEN}Production deployment complete!${NC}"
        ;;
    3)
        echo "Deployment cancelled"
        exit 0
        ;;
    *)
        echo -e "${YELLOW}Creating preview deployment...${NC}"
        echo ""
        vercel
        echo ""
        echo -e "${GREEN}Preview deployment complete!${NC}"
        ;;
esac

# -----------------------------------------------------------------------------
# Post-Deployment Reminders
# -----------------------------------------------------------------------------

echo ""
echo -e "${BLUE}=============================================="
echo "   Post-Deployment Checklist"
echo "==============================================${NC}"
echo ""
echo "1. Verify the site loads correctly"
echo "2. Test admin login at /admin"
echo "3. Test the star map creator"
echo "4. Test Stripe checkout flow"
echo "5. Configure Stripe webhooks (if production)"
echo "6. Set up custom domain (if needed)"
echo ""
echo -e "${GREEN}Deployment script finished!${NC}"
