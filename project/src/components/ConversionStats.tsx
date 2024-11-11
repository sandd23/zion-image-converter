import React from 'react';
import { FileImage, Save } from 'lucide-react';

interface ConversionStatsProps {
  totalConverted: number;
  totalSaved: number;
}

const ConversionStats: React.FC<ConversionStatsProps> = ({ totalConverted, totalSaved }) => {
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  return (
    <div className="mt-8 border-t pt-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center justify-center space-x-2 text-gray-600">
          <FileImage className="w-5 h-5" />
          <span>{totalConverted} images converted</span>
        </div>
        <div className="flex items-center justify-center space-x-2 text-gray-600">
          <Save className="w-5 h-5" />
          <span>{formatBytes(totalSaved)} saved</span>
        </div>
      </div>
    </div>
  );
};

export default ConversionStats;