import { createPortal } from 'react-dom';

interface ProjectModalProps {
  title: string;
  description: string;
  imageUrl?: string;
  onClose: () => void;
}

export default function ProjectModal({
  title,
  description,
  imageUrl,
  onClose,
}: ProjectModalProps) {
  return createPortal(
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: 'white',
          padding: '20px',
          borderRadius: '10px',
          maxWidth: '500px',
          color: 'black',
          position: 'relative',
        }}
      >
        <h2>{title}</h2>
        {imageUrl && <img src={imageUrl} alt={title} style={{ maxWidth: '100%', marginTop: '10px' }} />}
        <p>{description}</p>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
          }}
        >
          &times;
        </button>
      </div>
    </div>,
    document.body
  );
}
