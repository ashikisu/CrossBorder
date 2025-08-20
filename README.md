# CrossPay Trust - Cross-Border Payment Trust Score Simulator

A production-quality single-page React application that simulates a cross-border payment system with trust score management. Built with React, TypeScript, and Tailwind CSS, this application demonstrates secure payment workflows with risk assessment and user confirmation for suspicious transactions.

## Features

### 🔐 Trust Score Management (Admin)
- **Secure Admin Access**: Login required with username/password authentication
- Add, edit, and delete trusted addresses with categories A-D
- Visual trust indicators with color-coded badges
- Comprehensive address database with notes and timestamps
- Session management with 24-hour expiration
- Demo data initialization for testing

### 💸 Secure Payment Interface (Send)
- Real-time address lookup with trust score analysis
- Security warnings and confirmation modals for risky transactions
- Transaction history with detailed records
- Responsive design for mobile and desktop

### 🎯 Security Categories
- **A - Trustworthy (80-100)**: Green indicator, safe to proceed
- **B - Good (60-80)**: Light green, generally safe
- **C - Suspicious (40-60)**: Orange warning, requires confirmation
- **D - Not Safe (0-40)**: Red alert, requires explicit confirmation
- **Unknown addresses**: Treated as Category D with warnings

### 💾 Data Persistence
- Client-side localStorage persistence for all data
- Secure session management for admin access
- No external APIs or network calls
- Transaction history limited to 200 records
- Clear data functionality for demo reset

### 🔑 Admin Authentication
- **Demo Credentials**:
  - Username: `admin`
  - Password: `demo123`
- Session expires after 24 hours
- Secure logout functionality
- Auto-fill demo credentials for easy testing

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Testing**: Vitest + React Testing Library
- **Icons**: Lucide React
- **Utilities**: clsx for conditional styling

## Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation & Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

### Testing

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

### Build for Production

```bash
# Build the application
npm run build

# Preview production build
npm run preview
```

## Admin Access

To access the admin panel:

1. Click the "Admin Login" tab
2. Use the demo credentials:
   - **Username**: `admin`
   - **Password**: `demo123`
3. Click "Sign In" or use the auto-fill button
4. Session remains active for 24 hours

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AddressForm.tsx     # Form for adding/editing addresses
│   ├── AddressList.tsx     # Display list of managed addresses
│   ├── AdminLogin.tsx      # Admin authentication form
│   ├── CategoryBadge.tsx   # Trust category visual indicator
│   ├── ConfirmModal.tsx    # Security warning modal
│   ├── SendForm.tsx        # Payment form with trust lookup
│   ├── Snackbar.tsx        # Toast notifications
│   └── TxHistory.tsx       # Transaction history display
├── routes/              # Main page components
│   ├── AdminPage.tsx       # Trust score administration
│   └── SendPage.tsx        # Payment interface
├── services/            # Data layer
│   ├── dataService.ts      # High-level data operations
│   └── storage.ts          # localStorage wrapper
├── types/               # TypeScript definitions
│   └── index.ts            # Core type definitions
├── test/                # Test files
│   ├── App.test.tsx        # App component tests
│   ├── category.test.ts    # Category mapping tests
│   ├── dataService.test.ts # Data service tests
│   └── setup.ts            # Test configuration
├── App.tsx              # Main application component
└── main.tsx            # Application entry point
```

## Key Components

### Data Models

```typescript
interface AddressEntry {
  address: string;
  category: 'A' | 'B' | 'C' | 'D';
  note?: string;
  createdAt: number;
}

interface TxRecord {
  txId: string;
  toAddress: string;
  amount: number;
  timestamp: number;
}

interface AdminSession {
  isAuthenticated: boolean;
  loginTime: number;
  expiresAt: number;
}
```

### Security Workflow

1. **Address Input**: User enters recipient address
2. **Trust Lookup**: System checks against local database
3. **Risk Assessment**: 
   - Categories A & B: Allow immediate proceed
   - Categories C & D: Show security warning modal
   - Unknown addresses: Treated as Category D
4. **Confirmation**: User must explicitly confirm risky transactions
5. **Execution**: Transaction recorded with unique ID

### LocalStorage Keys

- `trust_demo_addresses_v1`: Stored address entries
- `trust_demo_txs_v1`: Transaction history
- `trust_demo_admin_session_v1`: Admin authentication session

## Design System

### Color Scheme
- **Primary**: Blue (#3B82F6)
- **Success/Safe**: Green (#10B981)
- **Warning**: Orange (#F97316)
- **Danger**: Red (#EF4444)
- **Neutral**: Gray scale

### Typography
- Clean, readable fonts with proper hierarchy
- 150% line spacing for body text
- 120% line spacing for headings

### Responsive Design
- Mobile-first approach
- Breakpoints: 768px (tablet), 1024px (desktop)
- Touch-friendly interface elements

## Security Features

### Trust Score System
- Visual indicators for all risk levels
- Explicit warnings for suspicious addresses
- Required confirmation for high-risk transactions
- Clear categorization with advice

### Admin Security
- Username/password authentication required
- Session management with automatic expiration
- Secure logout functionality
- Demo credentials clearly displayed for testing

### User Experience
- Progressive disclosure of complex features
- Clear visual feedback for all actions
- Contextual help and explanations
- Error handling with user-friendly messages

## Testing Strategy

### Test Coverage
- **Unit Tests**: Data services and utility functions
- **Component Tests**: React component rendering and interactions
- **Integration Tests**: User workflows and data persistence

### Test Files
- `dataService.test.ts`: Address and transaction management
- `category.test.ts`: Trust category mappings and validation
- `App.test.tsx`: Main application component and navigation
- Includes admin authentication testing

## Development Guidelines

### Code Organization
- Modular architecture with clear separation of concerns
- TypeScript for type safety and developer experience
- Clean component interfaces with proper prop types
- Consistent error handling and user feedback

### Performance Considerations
- Efficient localStorage operations
- Optimized re-renders with proper React patterns
- Lazy loading of heavy components
- Transaction history pagination (200 record limit)

## Demo Data

The application initializes with sample addresses across all trust categories:
- Trustworthy exchange wallet (Category A)
- Verified merchant (Category B)  
- Mixed transaction history (Category C)
- Flagged suspicious address (Category D)

**Admin Demo Account**:
- Username: `admin`
- Password: `demo123`
- Session duration: 24 hours

## Browser Support

- Modern browsers with ES2020+ support
- Chrome 88+, Firefox 85+, Safari 14+, Edge 88+
- No IE support (uses modern JavaScript features)

## License

MIT License - Built for demonstration and educational purposes.

---

**Note**: This is a demo application for showcasing secure payment UI patterns. It does not connect to real payment networks or handle actual cryptocurrency transactions. The admin authentication is for demo purposes only and should not be used in production without proper security measures.