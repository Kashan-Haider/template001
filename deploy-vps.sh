#!/bin/bash

# VPS Deployment Script for Template001
# This script optimizes and deploys the Next.js application

set -e

echo "🚀 Starting VPS deployment optimization..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Clean up previous builds
print_status "Cleaning up previous builds..."
docker-compose down --remove-orphans 2>/dev/null || true
docker system prune -f --volumes 2>/dev/null || true

# Build optimized production image
print_status "Building optimized production image..."
docker-compose build --no-cache

# Get image size
IMAGE_SIZE=$(docker images template001:latest --format "table {{.Size}}" | tail -n 1)
print_status "Final image size: $IMAGE_SIZE"

# Start the application
print_status "Starting the application..."
docker-compose up -d

# Wait for health check
print_status "Waiting for application to be healthy..."
sleep 10

# Check if application is running
if docker-compose ps | grep -q "Up"; then
    print_status "✅ Application deployed successfully!"
    print_status "🌐 Application is running at: http://localhost:3000"
    print_status "📊 Health check: http://localhost:3000/api/health"
    
    # Show resource usage
    print_status "📈 Container resource usage:"
    docker stats --no-stream template001-web
else
    print_error "❌ Deployment failed. Check logs with: docker-compose logs"
    exit 1
fi

echo ""
print_status "🎉 Deployment complete!"
print_warning "Remember to:"
print_warning "  1. Set up your .env.local file with production database credentials"
print_warning "  2. Configure your reverse proxy (nginx/apache) if needed"
print_warning "  3. Set up SSL certificates for HTTPS"
print_warning "  4. Configure firewall rules for port 3000"
