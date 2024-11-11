import React from 'react';

interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({ value, onValueChange, children }) => {
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { value, onValueChange });
    }
    return child;
  });

  return <div>{childrenWithProps}</div>;
};

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

export const TabsList: React.FC<TabsListProps> = ({ children, className = '' }) => {
  return (
    <div className={`flex space-x-2 ${className}`}>
      {children}
    </div>
  );
};

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export const TabsTrigger: React.FC<TabsTriggerProps & { onValueChange?: (value: string) => void }> = ({ 
  value, 
  children, 
  onValueChange 
}) => {
  return (
    <button
      onClick={() => onValueChange?.(value)}
      className={`px-4 py-2 rounded-lg font-medium transition-colors
        ${onValueChange && value === value
          ? 'bg-blue-100 text-blue-700'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
    >
      {children}
    </button>
  );
};

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
}

export const TabsContent: React.FC<TabsContentProps & { value: string }> = ({ value, children }) => {
  return <div className="mt-4">{children}</div>;
};