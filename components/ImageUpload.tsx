'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Card, CardBody, Button } from '@nextui-org/react';
import { FaCloudUploadAlt, FaEye, FaCheck, FaTimes } from 'react-icons/fa';

interface ImageUploadProps {
  onImageUpload: (image: string) => void;
}

export default function ImageUpload({ onImageUpload }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setIsValid(false);
      return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setIsValid(false);
      return;
    }
    
    setIsValid(true);
    
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreview(result);
      onImageUpload(result);
    };
    reader.readAsDataURL(file);
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({ 
    onDrop, 
    accept: { 'image/*': [] },
    maxFiles: 1,
    multiple: false
  });

  const handleRemove = () => {
    setPreview(null);
    setIsValid(null);
  };

  return (
    <div className="w-full">
      {!preview ? (
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
            isDragActive 
              ? 'border-primary bg-primary/10' 
              : isDragReject 
                ? 'border-error bg-error/10' 
                : 'border-gray-400 hover:border-primary'
          }`}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center gap-4">
            <motion.div
              animate={{ y: isDragActive ? -5 : 0 }}
              transition={{ repeat: isDragActive ? Infinity : 0, repeatType: 'reverse', duration: 0.5 }}
              className="text-5xl text-primary"
            >
              <FaCloudUploadAlt />
            </motion.div>
            <div className="space-y-2">
              <p className="text-xl font-medium">
                {isDragActive ? 'Drop your image here' : 'Upload an eye image'}
              </p>
              <p className="text-sm text-gray-400">
                Drag & drop or click to select (max 5MB)
              </p>
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <Card className="overflow-hidden">
            <CardBody className="p-0">
              <div className="relative">
                <img 
                  src={preview} 
                  alt="Preview" 
                  className="w-full h-auto max-h-[300px] object-contain"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <Button
                    isIconOnly
                    color="primary"
                    variant="flat"
                    className="bg-white/20 backdrop-blur-md"
                    onClick={() => window.open(preview, '_blank')}
                  >
                    <FaEye />
                  </Button>
                  <Button
                    isIconOnly
                    color="danger"
                    variant="flat"
                    className="bg-white/20 backdrop-blur-md"
                    onClick={handleRemove}
                  >
                    <FaTimes />
                  </Button>
                </div>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {isValid ? (
                    <>
                      <FaCheck className="text-success" />
                      <span className="text-success">Image uploaded successfully</span>
                    </>
                  ) : (
                    <>
                      <FaTimes className="text-error" />
                      <span className="text-error">Invalid image format or size</span>
                    </>
                  )}
                </div>
                <Button
                  color="primary"
                  variant="flat"
                  onClick={handleRemove}
                >
                  Change Image
                </Button>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      )}
    </div>
  );
}