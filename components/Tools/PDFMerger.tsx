'use client';

import { useState, useRef } from 'react';
import { PDFDocument } from 'pdf-lib';

export default function PDFMerger() {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []).filter(f => f.type === 'application/pdf');
    if (selected.length > 0) {
       setFiles(prev => [...prev, ...selected]);
       setResultUrl(null);
    }
  };

  const removeFile = (idx: number) => {
    setFiles(prev => prev.filter((_, i) => i !== idx));
  };

  const mergePDFs = async () => {
    if (files.length < 2) return;
    setIsProcessing(true);
    
    try {
      const mergedPdf = await PDFDocument.create();
      
      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }
      
      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      setTimeout(() => {
        setResultUrl(url);
        setIsProcessing(false);
      }, 1500);
      
    } catch (err) {
      console.error(err);
      alert("Error merging PDFs. One or more files may be corrupted or encrypted.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="pdf-tool-container">
      {!resultUrl ? (
        <div className="tool-ux">
          <div className="upload-zone" onClick={() => fileInputRef.current?.click()}>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleUpload} 
              accept=".pdf" 
              multiple 
              hidden 
            />
            <div className="empty-zone">
              <span className="upload-icon">➕</span>
              <p>Add your PDF files or <strong>click to browse</strong></p>
              <p className="hint">Select 2 or more files to combine them into one.</p>
            </div>
          </div>
          
          {files.length > 0 && (
            <div className="file-list">
               <h4>Files to Merge ({files.length})</h4>
               {files.map((file, idx) => (
                 <div key={idx} className="file-item fade-in">
                   <div className="file-info">
                     <span className="idx">{idx + 1}</span>
                     <span className="name">{file.name}</span>
                   </div>
                   <button className="remove-btn" onClick={(e) => { e.stopPropagation(); removeFile(idx); }}>✕</button>
                 </div>
               ))}
               
               <div className="plain-english-helper">Wait until all your files are listed above, then click the blue button to join them together.</div>
               
               {!isProcessing && (
                 <button 
                   className="btn btn-primary action-btn fade-in" 
                   onClick={mergePDFs} 
                   disabled={files.length < 2}
                 >
                   {files.length < 2 ? 'Add one more file to merge' : 'Merge Files Now'}
                 </button>
               )}
            </div>
          )}

          {isProcessing && (
            <div className="processing-state">
              <div className="spinner"></div>
              <p>Gluing your PDFs together...</p>
              <div className="progress-bar-container">
                <div className="progress-bar-fill"></div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="success-state fade-in">
          <div className="success-icon">📚</div>
          <h3>PDFs Merged Successfully!</h3>
          <p className="desc">Your {files.length} documents are now combined into a single professional PDF.</p>
          
          <div className="plain-english-helper">Success! Your files are now one single document. Click the download button below.</div>
          
          <a href={resultUrl} download="merged-document.pdf" className="btn btn-primary download-btn">
             Download Merged PDF
          </a>
          <button className="btn btn-secondary start-over" onClick={() => { setFiles([]); setResultUrl(null); }}>
            Merge more files
          </button>
        </div>
      )}

      <style jsx>{`
        .pdf-tool-container { max-width: 600px; margin: 0 auto; }
        .upload-zone { border: 3px dashed var(--border); border-radius: var(--radius-lg); padding: 2rem; text-align: center; cursor: pointer; transition: all 0.3s; background: var(--background); margin-bottom: 2rem; }
        .upload-zone:hover { border-color: var(--primary); background: var(--primary-light); }
        .empty-zone { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; }
        .upload-icon { font-size: 2.5rem; }
        .hint { font-size: 0.8rem; color: var(--text-dim); }
        
        .file-list { display: flex; flex-direction: column; gap: 0.75rem; margin-top: 1rem; }
        .file-list h4 { font-size: 0.9rem; color: var(--text-dim); text-transform: uppercase; margin-bottom: 0.5rem; }
        .file-item { display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.25rem; background: var(--bg-subtle); border: 1px solid var(--border); border-radius: var(--radius-md); }
        .file-info { display: flex; align-items: center; gap: 1rem; }
        .idx { font-weight: 800; color: var(--primary); font-size: 0.8rem; background: var(--primary-light); width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; border-radius: 50%; }
        .name { font-weight: 500; font-size: 0.95rem; }
        .remove-btn { color: var(--error); font-size: 1.25rem; }
        
        .action-btn { width: 100%; padding: 1.25rem; font-size: 1.25rem; border-radius: var(--radius-full); box-shadow: 0 10px 20px -5px rgba(59, 130, 246, 0.4); margin-top: 1rem; }
        .action-btn:disabled { background: var(--border); box-shadow: none; cursor: not-allowed; opacity: 0.7; }
        
        .processing-state { text-align: center; padding: 2rem 0; }
        .spinner { width: 40px; height: 40px; border: 4px solid var(--border); border-top-color: var(--primary); border-radius: 50%; animation: spin 1s infinite linear; margin: 0 auto 1.5rem; }
        .progress-bar-container { height: 6px; background: var(--border); border-radius: 3px; width: 100%; margin-top: 1rem; overflow: hidden; }
        .progress-bar-fill { height: 100%; background: var(--primary); width: 70%; animation: loading 3s ease-in-out infinite; }
        
        .success-state { text-align: center; }
        .success-icon { font-size: 3.5rem; margin-bottom: 1rem; }
        .desc { color: var(--text-muted); margin-bottom: 2rem; }
        .download-btn { width: 100%; padding: 1.5rem; font-size: 1.25rem; border-radius: var(--radius-full); margin-bottom: 1rem; }
        .start-over { font-size: 0.9rem; color: var(--text-muted); }
        
        .fade-in { animation: fadeIn 0.4s ease; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes loading { 0% { width: 0%; } 50% { width: 70%; } 100% { width: 100%; } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
