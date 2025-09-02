# GITDM React Client

A modern healthcare management system client built with React, TypeScript, and Tailwind CSS. This application provides a comprehensive interface for managing medical records, AI-powered summaries, patient data, and clinical information.

## 🚀 Features

### Core Functionality
- **AI-Powered Medical Summaries**: Generate and manage AI summaries for medical records
- **Patient Management**: Complete patient record system with detailed profiles
- **Clinical Encounters**: Track and document patient visits with SOAP notes
- **Lab Results**: Manage laboratory test results with LOINC codes
- **Medication Orders**: Track prescriptions and medication schedules
- **Clinical References**: Access and manage medical literature references

### Technical Features
- **Type-Safe API Client**: Auto-generated from OpenAPI specification using Orval
- **Authentication**: JWT-based authentication with automatic token refresh
- **Real-time Data**: React Query for efficient data fetching and caching
- **Error Handling**: Comprehensive error boundaries and toast notifications
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Modern UI**: Clean, accessible components with consistent design

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **State Management**: React Query v5
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **API Client**: Axios with Orval code generation
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Date Handling**: date-fns

## 📋 Prerequisites

- Node.js 18.18.0 or higher
- npm or yarn
- Backend API server running (default: http://localhost:3000)

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   cd react-client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your API URL:
   ```env
   VITE_API_BASE_URL=http://localhost:3000
   VITE_API_WITH_CREDENTIALS=false
   ```

4. **Generate API client** (if needed)
   ```bash
   npm run api:generate
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

   The application will be available at http://localhost:5173

## 📁 Project Structure

```
src/
├── api/
│   ├── generated/        # Auto-generated API client
│   ├── http/            # Axios configuration
│   └── queryKeys.ts     # React Query key management
├── components/
│   ├── layout/          # Layout components
│   ├── ui/              # Reusable UI components
│   ├── ErrorBoundary.tsx
│   └── ProtectedRoute.tsx
├── contexts/
│   └── AuthContext.tsx  # Authentication context
├── hooks/
│   └── useToast.tsx     # Toast notification hook
├── lib/
│   └── utils.ts         # Utility functions
├── pages/
│   ├── ai-summaries/    # AI summary pages
│   ├── patients/        # Patient management pages
│   ├── encounters/      # Encounter pages
│   ├── lab-results/     # Lab result pages
│   ├── medications/     # Medication pages
│   ├── clinical-references/ # Reference pages
│   ├── Dashboard.tsx    # Main dashboard
│   └── Login.tsx        # Authentication page
├── App.tsx              # Main app component
└── main.tsx            # Application entry point
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run api:generate` - Generate API client from OpenAPI spec
- `npm run api:watch` - Watch and regenerate API client on changes

## 🎯 Key Features Explained

### Authentication Flow
- JWT-based authentication with access and refresh tokens
- Automatic token refresh on 401 responses
- Protected routes with authentication checks
- Persistent login state using localStorage

### Data Management
- React Query for server state management
- Optimistic updates for better UX
- Automatic cache invalidation
- Background refetching for fresh data

### UI/UX Design
- Consistent design system with reusable components
- Responsive layout that works on all devices
- Loading states and error handling
- Toast notifications for user feedback
- Accessible components following WCAG guidelines

### Code Generation
- API client automatically generated from OpenAPI spec
- Type-safe API calls with full TypeScript support
- Consistent API interface across the application

## 🔐 Authentication

The application uses JWT authentication. To login:
1. Navigate to `/login`
2. Enter your credentials
3. The app will store tokens and redirect to dashboard

Demo credentials (if available):
- Email: admin@example.com
- Password: password

## 🧪 Development Tips

1. **API Client Generation**: After any OpenAPI spec changes, regenerate the client:
   ```bash
   npm run api:generate
   ```

2. **Type Safety**: The project uses strict TypeScript. All API responses are fully typed.

3. **Component Development**: UI components are in `src/components/ui/` and follow a consistent pattern.

4. **State Management**: Use React Query for server state and React Context for client state.

5. **Styling**: Use Tailwind CSS classes. Custom styles should be minimal.

## 🚢 Production Build

To build for production:

```bash
npm run build
```

The build output will be in the `dist` directory. You can preview it locally:

```bash
npm run preview
```

## 📝 Environment Variables

- `VITE_API_BASE_URL`: Backend API base URL
- `VITE_API_WITH_CREDENTIALS`: Enable credentials for CORS (true/false)

## 🤝 Contributing

1. Follow the existing code style
2. Use TypeScript strictly
3. Write meaningful commit messages
4. Test your changes thoroughly
5. Update documentation as needed

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Failed**
   - Check if backend is running
   - Verify `VITE_API_BASE_URL` in `.env`
   - Check CORS settings

2. **Type Errors After API Changes**
   - Regenerate API client: `npm run api:generate`
   - Restart TypeScript server in your IDE

3. **Authentication Issues**
   - Clear localStorage and try logging in again
   - Check if tokens are being sent in requests
   - Verify backend authentication endpoints

## 📄 License

This project is licensed under the MIT License.