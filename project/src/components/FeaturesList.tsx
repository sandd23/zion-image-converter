import React from 'react';
import { FileImage, File } from 'lucide-react';

const FeaturesList: React.FC = () => {
  return (
    <div className="mt-8 p-4 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-medium text-gray-800 mb-2">Features</h3>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
        <li className="flex items-center">
          <FileImage className="w-4 h-4 mr-2 text-blue-500" />
          JPG to PNG conversion
        </li>
        <li className="flex items-center">
          <FileImage className="w-4 h-4 mr-2 text-blue-500" />
          PNG to JPG conversion
        </li>
        <li className="flex items-center">
          <File className="w-4 h-4 mr-2 text-blue-500" />
          Image to PDF conversion
        </li>
        <li className="flex items-center">
          <FileImage className="w-4 h-4 mr-2 text-blue-500" />
          Image size reduction
        </li>
      </ul>
    </div>
  );
};

export default FeaturesList;