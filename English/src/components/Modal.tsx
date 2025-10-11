import React, { ReactNode } from 'react'
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
          <button className="close-modal-btn" onClick={onClose}>
            ✕
          </button>
        )}
        {children}
      </div>
    </div>
  )
}

export default Modal

