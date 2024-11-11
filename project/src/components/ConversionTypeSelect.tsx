import React, { useRef } from 'react';
import { FileImage, Image, ImagePlus, FileText } from 'lucide-react';
import { estimateOutputSize } from '../utils/estimateFileSize';

export type ConversionType = 
  | 'JPG_TO_PNG' 
  | 'JPG_TO_WEBP' 
  | 'JPG_TO_HEIC' 
  | 'PNG_TO_JPG' 
  | 'PNG_TO_WEBP' 
  | 'PNG_TO_HEIC' 
  | 'WEBP_TO_JPG' 
  | 'WEBP_TO_PNG' 
  | 'HEIC_TO_JPG' 
  | 'HEIC_TO_PNG' 
  | 'PDF_TO_JPG'
  | 'PDF_TO_PNG'
  | 'TO_PDF' 
  | 'REDUCE_SIZE';

type ConversionTab = 'jpg' | 'png' | 'webp' | 'heic' | 'pdf' | 'other';

interface ConversionOption {
  type: ConversionType;
  icon: React.ElementType;
  label: string;
  description: string;
}

interface TabConfig {
  label: string;
  options: ConversionOption[];
}

interface ConversionTypeSelectProps {
  value: ConversionType;
  onChange: (value: ConversionType) => void;
  inputFile: File | null;
}

const conversionTabs: Record<ConversionTab, TabConfig> = {
  jpg: {
    label: 'Convert from JPG',
    options: [
      {
        type: 'JPG_TO_PNG',
        icon: FileImage,
        label: 'JPG to PNG',
        description: 'Convert JPG images to PNG format for better quality'
      },
      {
        type: 'JPG_TO_WEBP',
        icon: Image,
        label: 'JPG to WebP',
        description: 'Convert to WebP for better compression'
      },
      {
        type: 'JPG_TO_HEIC',
        icon: ImagePlus,
        label: 'JPG to HEIC',
        description: 'Convert to HEIC for iOS compatibility'
      }
    ]
  },
  png: {
    label: 'Convert from PNG',
    options: [
      {
        type: 'PNG_TO_JPG',
        icon: FileImage,
        label: 'PNG to JPG',
        description: 'Convert PNG images to JPG format'
      },
      {
        type: 'PNG_TO_WEBP',
        icon: Image,
        label: 'PNG to WebP',
        description: 'Convert to WebP for better compression'
      },
      {
        type: 'PNG_TO_HEIC',
        icon: ImagePlus,
        label: 'PNG to HEIC',
        description: 'Convert to HEIC for iOS compatibility'
      }
    ]
  },
  webp: {
    label: 'Convert from WebP',
    options: [
      {
        type: 'WEBP_TO_JPG',
        icon: FileImage,
        label: 'WebP to JPG',
        description: 'Convert WebP images to JPG format'
      },
      {
        type: 'WEBP_TO_PNG',
        icon: Image,
        label: 'WebP to PNG',
        description: 'Convert WebP images to PNG format'
      }
    ]
  },
  heic: {
    label: 'Convert from HEIC',
    options: [
      {
        type: 'HEIC_TO_JPG',
        icon: FileImage,
        label: 'HEIC to JPG',
        description: 'Convert HEIC images to JPG format'
      },
      {
        type: 'HEIC_TO_PNG',
        icon: Image,
        label: 'HEIC to PNG',
        description: 'Convert HEIC images to PNG format'
      }
    ]
  },
  pdf: {
    label: 'Convert from PDF',
    options: [
      {
        type: 'PDF_TO_JPG',
        icon: FileImage,
        label: 'PDF to JPG',
        description: 'Convert PDF pages to JPG images'
      },
      {
        type: 'PDF_TO_PNG',
        icon: Image,
        label: 'PDF to PNG',
        description: 'Convert PDF pages to PNG images'
      }
    ]
  },
  other: {
    label: 'Other Options',
    options: [
      {
        type: 'TO_PDF',
        icon: FileText,
        label: 'Convert to PDF',
        description: 'Convert your image to PDF format'
      },
      {
        type: 'REDUCE_SIZE',
        icon: ImagePlus,
        label: 'Reduce Size',
        description: 'Compress image while maintaining quality'
      }
    ]
  }
};

const ConversionTypeSelect: React.FC<ConversionTypeSelectProps> = ({ 
  value, 
  onChange,
  inputFile 
}) => {
  const [activeTab, setActiveTab] = React.useState<ConversionTab>('jpg');
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!inputFile) return;

    const fileType = inputFile.type.toLowerCase();
    if (fileType === 'image/jpeg') {
      setActiveTab('jpg');
    } else if (fileType === 'image/png') {
      setActiveTab('png');
    } else if (fileType === 'image/webp') {
      setActiveTab('webp');
    } else if (fileType === 'image/heic') {
      setActiveTab('heic');
    } else if (fileType === 'application/pdf') {
      setActiveTab('pdf');
    }
  }, [inputFile]);

  const scrollTabs = (direction: 'left' | 'right') => {
    if (tabsContainerRef.current) {
      const scrollAmount = 200;
      const newScrollLeft = direction === 'left' 
        ? tabsContainerRef.current.scrollLeft - scrollAmount
        : tabsContainerRef.current.scrollLeft + scrollAmount;
      
      tabsContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const isOptionDisabled = (type: ConversionType): boolean => {
    if (!inputFile) return false;
    
    const fileType = inputFile.type.toLowerCase();
    const isJPG = fileType === 'image/jpeg';
    const isPNG = fileType === 'image/png';
    const isWEBP = fileType === 'image/webp';
    const isHEIC = fileType === 'image/heic';
    const isPDF = fileType === 'application/pdf';

    switch (type) {
      case 'JPG_TO_PNG':
      case 'JPG_TO_WEBP':
      case 'JPG_TO_HEIC':
        return !isJPG;
      case 'PNG_TO_JPG':
      case 'PNG_TO_WEBP':
      case 'PNG_TO_HEIC':
        return !isPNG;
      case 'WEBP_TO_JPG':
      case 'WEBP_TO_PNG':
        return !isWEBP;
      case 'HEIC_TO_JPG':
      case 'HEIC_TO_PNG':
        return !isHEIC;
      case 'PDF_TO_JPG':
      case 'PDF_TO_PNG':
        return !isPDF;
      default:
        return false;
    }
  };

  return (
    <div className="mt-6">
      <div className="relative">
        <button
          onClick={() => scrollTabs('left')}
          className="absolute left-0 top-0 bottom-0 px-2 bg-white bg-opacity-90 hover:bg-opacity-100 z-10"
        >
          ←
        </button>
        <div
          ref={tabsContainerRef}
          className="flex space-x-2 overflow-x-auto scrollbar-hide relative"
          style={{ scrollBehavior: 'smooth' }}
        >
          {Object.entries(conversionTabs).map(([key, tab]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as ConversionTab)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                activeTab === key
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => scrollTabs('right')}
          className="absolute right-0 top-0 bottom-0 px-2 bg-white bg-opacity-90 hover:bg-opacity-100 z-10"
        >
          →
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {conversionTabs[activeTab].options.map((option) => {
          const Icon = option.icon;
          const disabled = isOptionDisabled(option.type);
          const isSelected = value === option.type;

          return (
            <button
              key={option.type}
              onClick={() => onChange(option.type)}
              disabled={disabled}
              className={`p-4 rounded-lg text-left transition-colors ${
                isSelected
                  ? 'bg-blue-50 border-2 border-blue-500'
                  : disabled
                  ? 'bg-gray-100 cursor-not-allowed opacity-50'
                  : 'bg-white border-2 border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-5 h-5 ${isSelected ? 'text-blue-500' : 'text-gray-500'}`} />
                <div>
                  <div className={`font-medium ${isSelected ? 'text-blue-700' : 'text-gray-700'}`}>
                    {option.label}
                  </div>
                  <div className="text-sm text-gray-500">{option.description}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ConversionTypeSelect;