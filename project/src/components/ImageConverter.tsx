import React, { useState, useCallback } from 'react';
import DropZone from './DropZone';
import ImagePreview from './ImagePreview';
import ConvertButton from './ConvertButton';
import { formatFileSize } from '../utils/formatFileSize';
import { convertImage, convertToPDF, compressImage } from '../utils/conversion';

interface FileInfo {
  file: File;
  size: string;
  preview: string;
}

interface ConversionResult {
  blob: Blob;
  size: string;
}

const ImageConverter: React.FC = () => {
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const [convertedFile, setConvertedFile] = useState<ConversionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [conversionType, setConversionType] = useState('JPG_TO_PNG');
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setFileInfo({
      file,
      size: formatFileSize(file.size),
      preview: URL.createObjectURL(file)
    });
    setConvertedFile(null);
    setError(null);
  }, []);

  const handleConversion = async () => {
    if (!fileInfo) return;
    setLoading(true);
    setError(null);

    try {
      let result: Blob;
      const { file } = fileInfo;

      switch (conversionType) {
        case 'JPG_TO_PNG':
          result = await convertImage(file, 'image/png');
          break;
        case 'PNG_TO_JPG':
          result = await convertImage(file, 'image/jpeg');
          break;
        case 'TO_PDF':
          result = await convertToPDF(file);
          break;
        case 'COMPRESS':
          result = await compressImage(file);
          break;
        default:
          throw new Error('Invalid conversion type');
      }

      setConvertedFile({
        blob: result,
        size: formatFileSize(result.size)
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Conversion failed');
      console.error('Conversion error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!convertedFile || !fileInfo) return;

    const extension = conversionType.split('_')[2]?.toLowerCase() || 'jpg';
    const fileName = `converted_${fileInfo.file.name.split('.')[0]}.${extension}`;
    
    const url = URL.createObjectURL(convertedFile.blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Super Image Converter 1.0</h1>
          <p className="text-gray-600">Convert, compress, and transform your images easily</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <DropZone onDrop={onDrop} />
            {error && (
              <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg">
                {error}
              </div>
            )}
            <ConvertButton
              onConvert={handleConversion}
              onDownload={handleDownload}
              disabled={!fileInfo}
              loading={loading}
              converted={!!convertedFile}
            />
          </div>
          <ImagePreview preview={fileInfo?.preview || ''} />
        </div>
      </div>
    </div>
  );
};

export default ImageConverter;