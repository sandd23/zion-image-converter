# Image Converter

A powerful, secure, and user-friendly web application for converting and compressing images. Built with React, TypeScript, and modern web technologies.

## Features

### Image Conversion
- **Multiple Format Support**
  - Convert JPG to PNG, WebP, HEIC
  - Convert PNG to JPG, WebP, HEIC
  - Convert WebP to JPG, PNG
  - Convert HEIC to JPG, PNG
  - Convert PDF to JPG/PNG
  - Convert Images to PDF

### Image Compression
- Smart compression algorithm maintaining quality
- Adjustable compression settings
- Real-time size estimation
- Batch compression support

### Batch Processing
- Convert multiple files simultaneously
- Consistent output format
- Progress tracking
- Error handling for each file

### Security Features
- Client-side processing (no server uploads)
- AES-GCM encryption for sensitive images
- No external API dependencies
- Secure file handling

### User Interface
- Clean, modern design
- Intuitive tab-based navigation
- Drag and drop support
- File preview
- Real-time conversion status
- Conversion statistics tracking
- Responsive layout for all devices

## Technical Details

### Built With
- React 18.3.1
- TypeScript
- Tailwind CSS
- Vite
- PDF-lib (for PDF operations)
- browser-image-compression
- JSZip (for batch processing)
- Lucide React (for icons)

### Key Components
- `ImageConverter`: Main conversion logic and UI
- `BatchConversion`: Handles multiple file processing
- `ConversionTypeSelect`: Format selection interface
- `DropZone`: File input handling
- `ErrorBoundary`: Graceful error handling
- `StatisticsBar`: Conversion metrics display

## Getting Started

### Prerequisites
- Node.js 16.0 or higher
- npm or yarn

### Installation
```bash
# Clone the repository
git clone [repository-url]

# Navigate to project directory
cd image-converter

# Install dependencies
npm install

# Start development server
npm run dev
```

### Building for Production
```bash
# Create optimized build
npm run build

# Preview production build
npm run preview
```

## Usage

1. **Select Conversion Type**
   - Choose from available conversion tabs
   - Select specific format conversion
   - View estimated output size

2. **Add Files**
   - Drag and drop files into the upload area
   - Click to browse files
   - Preview selected images

3. **Convert**
   - Click "Convert" to process files
   - Download converted files
   - View conversion statistics

4. **Batch Processing**
   - Select multiple files
   - Choose common output format
   - Process all files at once

## Performance

- Client-side processing for instant conversions
- Optimized for large files
- Efficient memory management
- Progressive loading for batch operations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [PDF-lib](https://github.com/Hopding/pdf-lib) for PDF manipulation
- [browser-image-compression](https://github.com/Donaldcwl/browser-image-compression) for image compression
- [JSZip](https://stuk.github.io/jszip/) for batch file handling
- [Lucide](https://lucide.dev/) for icons
- [Tailwind CSS](https://tailwindcss.com/) for styling