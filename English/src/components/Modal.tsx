import React, { ReactNode, useEffect } from 'react'
import Button from './Button'
import './Modal.css'

interface ModalProps {
  onClose: () => void
  children: ReactNode
  className?: string
  showCloseButton?: boolean
}

const Modal: React.FC<ModalProps> = ({ 
  onClose, 
  children, 
  className = '', 
  showCloseButton = true 
}) => {
  // Disable body scroll when modal is open
  useEffect(() => {
    // Save original overflow style
    const originalOverflow = document.body.style.overflow
    
    // Disable scroll
    document.body.style.overflow = 'hidden'
    
    // Cleanup: restore original overflow when modal closes
    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [])

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal ${className}`} onClick={(e) => e.stopPropagation()}>
        {showCloseButton && (
          <div className="close-modal-btn-wrapper">
            <Button variant="danger" icon size="small" onClick={onClose}>
              ✕
            </Button>
          </div>
        )}
        {children}
      </div>
    </div>
  )
}

export default Modal

