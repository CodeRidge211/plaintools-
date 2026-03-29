'use client';

import { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

interface TemplateEngineProps {
  fields: Array<{ 
    id: string; 
    label: string; 
    type: string; 
    placeholder: string; 
    helper?: string; 
    options?: string[] 
  }>;
  previewComponent: (data: Record<string, any>) => React.ReactNode;
  initialData: Record<string, any>;
  title: string;
}

export default function TemplateEngine({
  fields,
  previewComponent,
  initialData,
  title
}: TemplateEngineProps) {
  const [formData, setFormData] = useState(initialData);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (id: string, value: any) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleDownload = async () => {
    setIsGenerating(true);
    const element = document.getElementById('template-preview-canvas');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${title.replace(/\s+/g, '-').toLowerCase()}-${new Date().getTime()}.pdf`);
    } catch (err) {
      console.error(err);
    } finally {
       setIsGenerating(false);
    }
  };

  return (
    <div className="template-engine-wrapper">
      <div className="two-panel-layout">
        <aside className="fields-panel">
          <div className="panel-header">
            <h3>Fill Details</h3>
            <button className="btn-secondary" style={{ fontSize: '12px' }} onClick={() => setFormData(initialData)}>
              Clear All
            </button>
          </div>
          <div className="fields-grid">
             {fields.map(field => (
               <div key={field.id} className="field-group">
                 <label htmlFor={field.id}>{field.label}</label>
                 {field.type === 'textarea' ? (
                   <textarea
                     id={field.id}
                     placeholder={field.placeholder}
                     value={formData[field.id]}
                     onChange={(e) => handleInputChange(field.id, e.target.value)}
                   />
                 ) : (
                   <input
                     id={field.id}
                     type={field.type}
                     placeholder={field.placeholder}
                     value={formData[field.id]}
                     onChange={(e) => handleInputChange(field.id, e.target.value)}
                   />
                 )}
                 {field.helper && <div className="plain-english-helper">{field.helper}</div>}
               </div>
             ))}
          </div>
        </aside>

        <section className="preview-panel">
          <div className="preview-sticky-header">
            <h3>Live Preview</h3>
            <button className="btn btn-primary" onClick={handleDownload} disabled={isGenerating}>
              {isGenerating ? 'Generating...' : 'Download My Document'}
            </button>
          </div>
          <div className="preview-canvas-wrapper glass">
            <div id="template-preview-canvas" className="preview-paper">
              {previewComponent(formData)}
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        .template-engine-wrapper {
          width: 100%;
          min-height: 600px;
        }

        .two-panel-layout {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 2rem;
        }

        .fields-panel {
          background: var(--bg-subtle);
          border-radius: var(--radius-md);
          padding: 1.5rem;
          border: 1px solid var(--border);
          max-height: 80vh;
          overflow-y: auto;
        }

        .panel-header {
           display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;
        }

        .fields-grid {
          display: grid;
          gap: 1.5rem;
        }

        .field-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        label {
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--text-main);
        }

        input, textarea {
          padding: 0.75rem;
          background: var(--background);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          font-size: 0.95rem;
          color: var(--text-main);
        }

        .preview-panel {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .preview-sticky-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: var(--bg-subtle);
          padding: 1rem 1.5rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border);
          position: sticky;
          top: 0;
          z-index: 5;
        }

        .preview-canvas-wrapper {
          padding: 2rem;
          border-radius: var(--radius-lg);
          display: flex;
          justify-content: center;
        }

        .preview-paper {
          background: white;
          width: 100%;
          max-width: 210mm;
          min-height: 297mm;
          padding: 2.5rem;
          color: #111;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          transform-origin: top center;
          transition: transform 0.3s ease;
        }

        @media (max-width: 1000px) {
          .two-panel-layout {
            grid-template-columns: 1fr;
          }
           .fields-panel {
             max-height: none;
           }
        }
      `}</style>
    </div>
  );
}
