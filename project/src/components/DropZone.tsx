import React from 'react';
import { useDropzone } from 'react-dropzone';
import { FileUp } from 'lucide-react';

interface DropZoneProps {
  onDrop: (acceptedFiles: File[]) => void;
  multiple?: boolean;
}

const DropZone: React.FC<DropZoneProps> = ({ onDrop, multiple = false }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
      'image/heic': ['.heic'],
      'application/pdf': ['.pdf']
    },
    maxFiles: multiple ? undefined : 1
  });

  return (
    <div 
      {...getRootProps()} 
      className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
    >
      <input {...getInputProps()} />
      <FileUp className="w-12 h-12 mx-auto mb-4 text-gray-400" />
      <p className="text-gray-600">
        {isDragActive 
          ? 'Drop your files here' 
          : multiple 
            ? 'Drag & drop multiple files here, or click to select files'
            : 'Drag & drop a file here, or click to select'
        }
      </p>
      <p className="text-sm text-gray-500 mt-2">
        Supports JPG, PNG, WebP, HEIC, and PDF files
      </p>
    </div>
  );
};

export default DropZone;