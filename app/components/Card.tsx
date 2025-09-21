import React from 'react';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  shadow?: 'sm' | 'md' | 'lg';
}

export default function Card({ 
  title, 
  children, 
  className = '', 
  padding = 'md',
  shadow = 'md'
}: CardProps) {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const shadowClasses = {
    sm: 'shadow-sm',
    md: 'shadow',
    lg: 'shadow-lg'
  };

  return (
    <div className={`bg-white ${shadowClasses[shadow]} rounded-lg ${paddingClasses[padding]} ${className}`}>
      {title && (
        <h2 className="text-lg font-medium text-gray-900 mb-4">{title}</h2>
      )}
      {children}
    </div>
  );
}

// Sub-components for common patterns
Card.Section = function CardSection({ 
  title, 
  children, 
  className = '' 
}: { 
  title?: string; 
  children: React.ReactNode; 
  className?: string; 
}) {
  return (
    <div className={`space-y-4 ${className}`}>
      {title && (
        <h3 className="text-sm font-medium text-gray-700">{title}</h3>
      )}
      {children}
    </div>
  );
};

Card.Stat = function CardStat({ 
  label, 
  value, 
  className = '' 
}: { 
  label: string; 
  value: string | number; 
  className?: string; 
}) {
  return (
    <div className={`flex justify-between ${className}`}>
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-900">{value}</span>
    </div>
  );
};

Card.Button = function CardButton({ 
  children, 
  onClick, 
  variant = 'primary',
  className = '',
  disabled = false
}: { 
  children: React.ReactNode; 
  onClick?: () => void; 
  variant?: 'primary' | 'secondary';
  className?: string;
  disabled?: boolean;
}) {
  const baseClasses = "w-full inline-flex justify-center items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200";
  const variants = {
    primary: "border border-transparent text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400",
    secondary: "border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100"
  };

  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${className} cursor-pointer disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  );
};