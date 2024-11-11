interface Statistics {
  totalImagesConverted: number;
  totalBytesProcessed: number;
  totalBytesSaved: number;
}

const STORAGE_KEY = 'image_converter_stats';

function getStatistics(): Statistics {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return {
    totalImagesConverted: 0,
    totalBytesProcessed: 0,
    totalBytesSaved: 0,
  };
}

export function updateStatistics(originalSize: number, convertedSize: number): void {
  const stats = getStatistics();
  stats.totalImagesConverted += 1;
  stats.totalBytesProcessed += originalSize;
  stats.totalBytesSaved += Math.max(0, originalSize - convertedSize);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
}

export function getFormattedStatistics(): {
  imagesConverted: string;
  dataSaved: string;
} {
  const stats = getStatistics();
  const dataSaved = formatBytes(stats.totalBytesSaved);
  return {
    imagesConverted: stats.totalImagesConverted.toLocaleString(),
    dataSaved,
  };
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}