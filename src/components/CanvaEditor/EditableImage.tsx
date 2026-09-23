import React from 'react';
import { EditableMedia } from './EditableMedia';

interface EditableImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  onSave: (newSrc: string) => void;
  label?: string;
}

export const EditableImage: React.FC<EditableImageProps> = ({
  src,
  alt,
  className,
  containerClassName,
  onSave,
  label = 'Cambiar Imagen'
}) => {
  return (
    <EditableMedia
      type="image"
      src={src}
      alt={alt}
      className={className}
      containerClassName={containerClassName}
      onSave={(newSrc) => onSave(newSrc)}
      label={label}
    />
  );
};
