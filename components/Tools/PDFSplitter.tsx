'use client';

import { useState, useRef } from 'react';
import { PDFDocument } from 'pdf-lib';

export default function PDFSplitter() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pageInput, setPageInput] = useState<string>('');
  const [resultUrls, setResultUrls] = useState<Array<{ name: string; url: string }>>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected && selected.type === 'application/pdf') {
       setFile(selected);
       setResultUrls([]);
       setPageInput('');
    }
  };

  const parseRanges = (input: string, maxPages: number): number[] => {
    const pages = new Set<number>();
    const parts = input.split(',').map(p => p.trim()).filter(Boolean);
    
    for (const part of parts) {
      if (part.includes('-')) {
        const [start, end] = part.split('-').map(Number);
        if (start && end && start <= end) {
          for (let i = start; i <= end; i++) {
            if (i <= maxPages) pages.add(i - 1); // pdf-lib uses 0-indexed pages
          }
        }
      } else {
        const num = Number(part);
        if (num && num <= maxPages) pages.add(num - 1);
      }
    }
    
    return Array.from(pages).sort((a, b) => a - b);
  };

  const splitPDF = async () => {
    if (!file || !pageInput.trim()) return;
    setIsProcessing(true);
    
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const totalPages = pdfDoc.getPageCount();
      
      const indicesToKeep = parseRanges(pageInput, totalPages);
      
      if (indicesToKeep.length === 0) {
        alert("No valid pages found in range. Please enter valid page numbers.");
        setIsProcessing(false);
        return;
      }
      
      const newPdf = await PDFDocument.create();
      const copiedPages = await newPdf.copyPages(pdfDoc, indicesToKeep);
      copiedPages.forEach((page) => newPdf.addPage(page));
      
      const mergedPdfBytes = await newPdf.save();
      const blob = new Blob([mergedPdfBytes as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      setTimeout(() => {
        setResultUrls([{
          name: `Extracted_Pages_${file.name}`,
          url
        }]);
        setIsProcessing(false);
      }, 1500);
      
    } catch (err) {
      console.error(err);
      alert("Error processing PDF. The file may be corrupted or encrypted.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="pdf-tool-container">
      {resultUrls.length === 0 ? (
        <div className="tool-ux">
          <div className="upload-zone" onClick={() => !file && fileInputRef.current?.click()}>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleUpload} 
              accept=".pdf" 
              hidden 
            />
            {file ? (
              <div className="file-box">
                <span className="file-icon">📄</span>
                <span className="name">{file.name}</span>
                <button className="remove-btn" onClick={(e) => { e.stopPropagation(); setFile(null); }}>✕ Remove</button>
              </div>
            ) : (
              <div className="empty-zone">
                <span className="upload-icon">✂️</span>
                <p>Add your PDF file or <strong>click to browse</strong></p>
                <p className="hint">We will extract only the pages you want.</p>
              </div>
            )}
          </div>
          
          {file && (
            <div className="split-options fade-in">
               <label htmlFor="page-range">Pages to Extract</label>
               <input 
                 id="page-range" 
                 type="text" 
                 placeholder="e.g. 1-5, 8, 11-13" 
                 value={pageInput}
                 onChange={(e) => setPageInput(e.target.value)}
                 className="form-input"
               />
               <p className="helper-text">Enter comma-separated page numbers or ranges.</p>
               
               <div className="plain-english-helper">Type the page numbers you want to save. For example, "1-3" saves the first three pages.</div>
               
               {!isProcessing && (
                 <button 
                   className="btn btn-primary action-btn" 
                   onClick={splitPDF} 
                   disabled={!pageInput.trim()}
                 >
                   Extract Pages Now
                 </button>
               )}
            </div>
          )}

          {isProcessing && (
            <div className="processing-state">
              <div className="spinner"></div>
              <p>Extracting your pages...</p>
              <div className="progress-bar-container">
                <div className="progress-bar-fill"></div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="success-state fade-in">
          <div className="success-icon">✨</div>
          <h3>Pages Extracted Successfully!</h3>
          <p className="desc">Your selected pages have been saved into a new PDF document.</p>
          
          <div className="plain-english-helper">All done! Click the download button below to save your new PDF.</div>
          
          {resultUrls.map((res, idx) => (
             <a key={idx} href={res.url} download={res.name} className="btn btn-primary download-btn">
                Download {res.name}
             </a>
          ))}
          
          <button className="btn btn-secondary start-over" onClick={() => { setFile(null); setResultUrls([]); }}>
            Extract pages from another file
          </button>
        </div>
      )}

      <style jsx>{`
        .pdf-tool-container { max-width: 600px; margin: 0 auto; }
        .upload-zone { border: 3px dashed var(--border); border-radius: var(--radius-lg); padding: 3rem 2rem; text-align: center; cursor: pointer; transition: all 0.3s; background: var(--background); margin-bottom: 2rem; position: relative; }
        .upload-zone:hover { border-color: var(--primary); background: var(--primary-light); }
        .empty-zone { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; }
        .upload-icon { font-size: 3.5rem; }
        .hint { font-size: 0.85rem; color: var(--text-dim); }
        
        .file-box { display: flex; flex-direction: column; align-items: center; gap: 0.75rem; }
        .file-icon { font-size: 4rem; }
        .name { font-weight: 600; font-size: 1.1rem; }
        .remove-btn { margin-top: 0.5rem; background: transparent; border: 1px solid var(--border); color: var(--text-main); padding: 0.4rem 1rem; border-radius: var(--radius-full); font-size: 0.85rem; cursor: pointer; z-index: 10; position: relative; transition: background 0.2s; }
        .remove-btn:hover { background: var(--bg-card); border-color: var(--error); color: var(--error); }
        
        .split-options { display: flex; flex-direction: column; gap: 0.5rem; margin-top: 1.5rem; }
        .split-options label { font-weight: 500; color: var(--text-main); }
        .form-input { padding: 1rem; font-size: 1.1rem; border-radius: var(--radius-md); border: 1px solid var(--border); background: var(--bg-card); color: var(--text-main); }
        .form-input:focus { border-color: var(--primary); outline: none; }
        .helper-text { font-size: 0.85rem; color: var(--text-dim); margin-bottom: 1rem; }
        
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
