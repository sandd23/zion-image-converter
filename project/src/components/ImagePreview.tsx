import React from 'react';
import { ImageIcon } from 'lucide-react';

interface ImagePreviewProps {
  preview: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ preview }) => {
  return (
    <div className="border rounded-xl p-4">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Preview</h3>
      {preview ? (
        <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-contain"
          />
        </div>
      ) : (
        <div className="aspect-square rounded-lg bg-gray-100 flex items-center justify-center">
          <ImageIcon className="w-16 h-16 text-gray-400" />
        </div>
      )}
    </div>
  );
};

export default ImagePreview;