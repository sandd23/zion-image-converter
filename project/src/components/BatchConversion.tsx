import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Files, Loader2 } from 'lucide-react';
import { formatFileSize } from '../utils/formatFileSize';

interface BatchConversionProps {
  conversionType: string;
  onConvert: (files: File[]) => Promise<void>;
  maxFiles: number;
}

interface BatchFile {
  file: File;
  size: string;
  id: string;
}

const BatchConversion: React.FC<BatchConversionProps> = ({
  conversionType,
  onConvert,
  maxFiles
}) => {
  const [files, setFiles] = useState<BatchFile[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      file,
      size: formatFileSize(file.size),
      id: Math.random().toString(36).substring(7)
    }));
    
    setFiles(prev => {
      const combined = [...prev, ...newFiles];
      return combined.slice(0, maxFiles);
    });
    setError(null);
  }, [maxFiles]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp']
    },
    maxFiles
  });

  const handleConvert = async () => {
    if (files.length === 0) {
      setError('Please add at least one file');
      return;
    }

    setIsConverting(true);
    setError(null);

    try {
      await onConvert(files.map(f => f.file));
    } catch (err) {
      setError('Conversion failed. Please try again.');
      console.error('Batch conversion failed:', err);
    } finally {
      setIsConverting(false);
    }
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
      >
        <input {...getInputProps()} />
        <Files className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <p className="text-gray-600">
          {isDragActive
            ? 'Drop your files here'
            : `Drag & drop up to ${maxFiles} files here, or click to select`}
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      {files.length > 0 && (
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-700 mb-3">Selected Files ({files.length})</h3>
            <div className="space-y-2">
              {files.map(({ file, size, id }) => (
                <div key={id} className="flex items-center justify-between bg-white p-3 rounded-lg">
                  <div className="truncate">
                    <p className="text-sm font-medium text-gray-700 truncate">{file.name}</p>
                    <p className="text-sm text-gray-500">{size}</p>
                  </div>
                  <button
                    onClick={() => removeFile(id)}
                    className="text-red-500 hover:text-red-600 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleConvert}
            disabled={isConverting || files.length === 0}
            className={`w-full px-6 py-3 rounded-lg text-white font-medium flex items-center justify-center
              ${isConverting || files.length === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {isConverting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Converting...
              </>
            ) : (
              'Convert All Files'
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default BatchConversion;