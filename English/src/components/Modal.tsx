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
    // Save original overflow styles for both html and body
    const originalBodyOverflow = document.body.style.overflow
    const originalHtmlOverflow = document.documentElement.style.overflow
    
    // Disable scroll on both html and body (different browsers use different elements)
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    
    // Cleanup: restore original overflow when modal closes
    return () => {
      document.body.style.overflow = originalBodyOverflow
      document.documentElement.style.overflow = originalHtmlOverflow
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

