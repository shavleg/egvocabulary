import React, { ReactNode } from 'react'
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

