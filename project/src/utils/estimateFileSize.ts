export function estimateOutputSize(
  inputSize: number,
  conversionType: string,
  mimeType: string
): string {
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `~${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  let estimatedSize = inputSize;

  switch (conversionType) {
    case 'JPG_TO_PNG':
      estimatedSize = Math.round(inputSize * 1.02);
      break;
    case 'PNG_TO_JPG':
      estimatedSize = Math.round(inputSize * 0.95);
      break;
    case 'JPG_TO_WEBP':
    case 'PNG_TO_WEBP':
      // WebP typically provides better compression
      estimatedSize = Math.round(inputSize * 0.8);
      break;
    case 'WEBP_TO_JPG':
      estimatedSize = Math.round(inputSize * 1.1);
      break;
    case 'WEBP_TO_PNG':
      estimatedSize = Math.round(inputSize * 1.15);
      break;
    case 'HEIC_TO_JPG':
      estimatedSize = Math.round(inputSize * 1.2);
      break;
    case 'HEIC_TO_PNG':
      estimatedSize = Math.round(inputSize * 1.3);
      break;
    case 'REDUCE_SIZE':
      if (inputSize > 5 * 1024 * 1024) { // > 5MB
        estimatedSize = Math.round(inputSize * 0.5);
      } else if (inputSize > 1024 * 1024) { // > 1MB
        estimatedSize = Math.round(inputSize * 0.6);
      } else {
        estimatedSize = Math.round(inputSize * 0.7);
      }
      break;
    case 'TO_PDF':
      estimatedSize = Math.round(inputSize * 1.01);
      break;
  }

  return formatBytes(estimatedSize);
}