import React from 'react';
import { getFormattedStatistics } from '../utils/statistics';
import { FileImage, Save } from 'lucide-react';

const StatisticsBar: React.FC = () => {
  const stats = getFormattedStatistics();

  return (
    <div className="mt-8 border-t pt-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center justify-center space-x-2 text-gray-600">
          <FileImage className="w-5 h-5" />
          <span>{stats.imagesConverted} images converted</span>
        </div>
        <div className="flex items-center justify-center space-x-2 text-gray-600">
          <Save className="w-5 h-5" />
          <span>{stats.dataSaved} saved</span>
        </div>
      </div>
    </div>
  );
};

export default StatisticsBar;