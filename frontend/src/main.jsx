import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import GridBackground from './components/ui/GridBackground .jsx'
import {
  
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast'
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <BrowserRouter>
  <GridBackground>
 
  <QueryClientProvider client={queryClient}>
  <App />
  <Toaster />

  <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </GridBackground>
 
  </BrowserRouter>
    
  </React.StrictMode>,
)
