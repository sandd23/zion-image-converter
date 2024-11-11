import { PDFDocument } from 'pdf-lib';

const MAX_DIMENSION = 2048;

interface Dimensions {
  width: number;
  height: number;
}

export const calculateDimensions = (width: number, height: number): Dimensions => {
  if (width <= MAX_DIMENSION && height <= MAX_DIMENSION) {
    return { width, height };
  }

  const aspectRatio = width / height;
  if (width > height) {
    return {
      width: MAX_DIMENSION,
      height: Math.round(MAX_DIMENSION / aspectRatio),
    };
  } else {
    return {
      width: Math.round(MAX_DIMENSION * aspectRatio),
      height: MAX_DIMENSION,
    };
  }
};

export const compressImage = async (
  file: File,
  quality: number = 0.8
): Promise<Blob> => {
  try {
    const image = await createImageBitmap(file);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('Could not get canvas context');
    }

    const { width, height } = calculateDimensions(image.width, image.height);
    canvas.width = width;
    canvas.height = height;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(image, 0, 0, width, height);

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to compress image'));
          }
        },
        file.type,
        quality
      );
    });

    image.close();
    return blob;
  } catch (error) {
    console.error('Compression error:', error);
    throw new Error(`Failed to compress image: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const convertImage = async (
  file: File,
  outputFormat: string,
  quality: number = 0.92
): Promise<Blob> => {
  try {
    const image = await createImageBitmap(file);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('Could not get canvas context');
    }

    const { width, height } = calculateDimensions(image.width, image.height);
    canvas.width = width;
    canvas.height = height;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(image, 0, 0, width, height);

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to convert image'));
          }
        },
        outputFormat,
        quality
      );
    });

    image.close();
    return blob;
  } catch (error) {
    console.error('Conversion error:', error);
    throw new Error(`Failed to convert image: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const convertToPDF = async (file: File): Promise<Blob> => {
  try {
    const image = await createImageBitmap(file);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('Could not get canvas context');
    }

    const { width, height } = calculateDimensions(image.width, image.height);
    canvas.width = width;
    canvas.height = height;

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(image, 0, 0, width, height);

    const jpegBlob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to create JPEG'));
          }
        },
        'image/jpeg',
        0.92
      );
    });

    const pdfDoc = await PDFDocument.create();
    const jpegBytes = await jpegBlob.arrayBuffer();
    const jpegImage = await pdfDoc.embedJpg(jpegBytes);
    
    const page = pdfDoc.addPage([jpegImage.width, jpegImage.height]);
    page.drawImage(jpegImage, {
      x: 0,
      y: 0,
      width: jpegImage.width,
      height: jpegImage.height,
    });

    const pdfBytes = await pdfDoc.save();
    image.close();
    return new Blob([pdfBytes], { type: 'application/pdf' });
  } catch (error) {
    console.error('PDF conversion error:', error);
    throw new Error(`Failed to convert to PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const convertPDFToImage = async (file: File): Promise<Blob[]> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const pages = pdfDoc.getPages();
    const blobs: Blob[] = [];

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      const { width, height } = page.getSize();
      
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        throw new Error('Could not get canvas context');
      }

      const scale = 2;
      canvas.width = width * scale;
      canvas.height = height * scale;

      const pdfBytes = await pdfDoc.save();
      const img = new Image();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = url;
      });

      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const imageBlob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to convert PDF page to image'));
            }
          },
          'image/png',
          1.0
        );
      });

      blobs.push(imageBlob);
      URL.revokeObjectURL(url);
    }

    return blobs;
  } catch (error) {
    console.error('PDF conversion error:', error);
    throw new Error(`Failed to convert PDF to images: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};