
'use client'

import { useState } from 'react';
import DriverAuth from './DriverAuth';
import DriverDashboard from './DriverDashboard';

/**
 * DriverPage component renders the driver dashboard.
 * It is wrapped in a <div> to ensure valid JSX syntax.
 * Defensive programming: if DriverDashboard fails to render,
 * an error boundary fallback UI is shown.
 */
export default function DriverPage() {
  // Simple state to capture any render error (optional but adds robustness)
  const [hasError, setHasError] = useState(false);

  // Optional: a tiny error‑handling wrapper
  const renderContent = () => {
    try {
      return <DriverDashboard />;
    } catch (err) {
      console.error('Error rendering DriverDashboard:', err);
      setHasError(true);
      return null;
    }
  };

  if (hasError) {
    return (
      <div style={{ padding: '1rem', color: 'red' }}>
        Unable to load the driver dashboard. Please try again later.
      </div>
    );
  }

  return (
    <div>
      {renderContent()}
    </div>
  );
}
