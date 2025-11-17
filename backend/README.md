# HackiBits Backend API

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Start server:
```bash
npm run dev
```

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product

### Newsletter
- `POST /api/newsletter/subscribe` - Subscribe to newsletter

### Contact
- `POST /api/contact` - Send contact message

### Visitors
- `GET /api/visitors/count` - Get visitor count
- `POST /api/visitors/increment` - Increment visitor count

### Health Check
- `GET /api/health` - Check API status
