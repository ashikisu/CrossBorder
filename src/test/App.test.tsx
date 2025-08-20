import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('App Component', () => {
  it('should render header with title', () => {
    render(<App />);
    expect(screen.getByText('CrossPay Trust')).toBeInTheDocument();
    expect(screen.getByText('Secure Cross-Border Payment Platform')).toBeInTheDocument();
  });

  it('should render navigation tabs', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: /send payment/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /admin/i })).toBeInTheDocument();
  });

  it('should switch between tabs', () => {
    render(<App />);
    
    // Should start on Send tab
    expect(screen.getByText('Send Payment')).toHaveClass('text-blue-600');
    
    // Switch to Admin tab
    fireEvent.click(screen.getByRole('button', { name: /admin/i }));
    expect(screen.getByText('Trust Score Administration')).toBeInTheDocument();
    
    // Switch back to Send tab
    fireEvent.click(screen.getByRole('button', { name: /send payment/i }));
    expect(screen.getByText('Send Payment')).toHaveClass('text-blue-600');
  });

  it('should display demo mode indicator', () => {
    render(<App />);
    expect(screen.getByText('Demo Mode')).toBeInTheDocument();
  });
});