import React from 'react';
import ReactMarkdown from 'react-markdown';
import { X } from 'lucide-react';

const PolicyModal = ({ title, markdownContent, onClose }) => {
  return (
    <div className="modal-overlay policy-modal-overlay" onClick={onClose}>
      <div className="modal-content policy-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="policy-modal-header">
          <h2 className="chalk-text">{title}</h2>
          <button className="close-button" onClick={onClose}>
            <X size={28} />
          </button>
        </div>
        
        <div className="policy-modal-body">
          <ReactMarkdown>{markdownContent}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default PolicyModal;
