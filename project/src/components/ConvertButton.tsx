import React from 'react';
import { Download, Loader2, ArrowRight } from 'lucide-react';

interface ConvertButtonProps {
  onConvert: () => void;
  onDownload: () => void;
  disabled: boolean;
  loading: boolean;
  converted: boolean;
}

const ConvertButton: React.FC<ConvertButtonProps> = ({
  onConvert,
  onDownload,
  disabled,
  loading,
  converted
}) => {
  if (loading) {
    return (
      <button
        disabled
        className="w-full mt-6 px-6 py-3 rounded-lg bg-gray-400 text-white font-medium flex items-center justify-center"
      >
        <Loader2 className="w-5 h-5 animate-spin mr-2" />
        Converting...
      </button>
    );
  }

  if (converted) {
    return (
      <button
        onClick={onDownload}
        className="w-full mt-6 px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium flex items-center justify-center"
      >
        <Download className="w-5 h-5 mr-2" />
        Download
      </button>
    );
  }

  return (
    <button
      onClick={onConvert}
      disabled={disabled}
      className={`w-full mt-6 px-6 py-3 rounded-lg text-white font-medium flex items-center justify-center
        ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
    >
      <ArrowRight className="w-5 h-5 mr-2" />
      Convert
    </button>
  );
};

export default ConvertButton;