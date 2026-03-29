'use client';

import TemplateEngine from "@/components/Templates/TemplateEngine";
import ToolLayout from "@/components/Tools/ToolLayout";

const NDA_FIELDS = [
  { id: 'date', label: 'Agreement Date', placeholder: 'e.g. October 24, 2026', type: 'text', helper: 'The date this agreement becomes active.' },
  { id: 'disclosingParty', label: 'Your Business (Disclosing Party)', placeholder: 'Your Name or Company', type: 'text', helper: 'The person or entity sharing the secrets.' },
  { id: 'receivingParty', label: 'Recipient (Receiving Party)', placeholder: 'Their Name or Company', type: 'text', helper: 'The person or entity who must stay quiet.' },
  { id: 'purpose', label: 'Reason for Sharing', placeholder: 'e.g. Discussing a potential partnership', type: 'text', helper: 'Why are you sharing this information?' },
  { id: 'term', label: 'Duration (Years)', placeholder: 'e.g. 5', type: 'text', helper: 'How many years must they keep the secret?' },
];

const INITIAL_NDA_DATA = {
  date: 'March 29, 2026',
  disclosingParty: 'Sovereign Ridge Partners LLC',
  receivingParty: 'Potential Partner Inc.',
  purpose: 'exploring a strategic business relationship and software development collaboration',
  term: '3'
};

const NDAPreview = (data: Record<string, any>) => (
  <div className="nda-doc">
    <h1 className="title">MUTUAL NON-DISCLOSURE AGREEMENT</h1>
    <p>This Mutual Non-Disclosure Agreement (the "Agreement") is entered into on <strong>{data.date}</strong> by and between <strong>{data.disclosingParty}</strong> and <strong>{data.receivingParty}</strong>.</p>
    
    <h3>1. DEFINITION OF CONFIDENTIAL INFORMATION</h3>
    <p>Confidential Information means any and all information shared for the purpose of <strong>{data.purpose}</strong>, including but not limited to business plans, software code, and financial data.</p>
    
    <h3>2. OBLIGATIONS</h3>
    <p>The Receiving Party agrees to hold the Confidential Information in strict confidence and not to disclose such information to any third party for a period of <strong>{data.term}</strong> years from the date of this Agreement.</p>
    
    <h3>3. SIGNATURES</h3>
    <div className="sigs">
      <div className="sig-box">
        <p>_________________________</p>
        <p><strong>{data.disclosingParty}</strong></p>
      </div>
      <div className="sig-box">
        <p>_________________________</p>
        <p><strong>{data.receivingParty}</strong></p>
      </div>
    </div>

    <style jsx>{`
      .nda-doc { font-family: 'Times New Roman', serif; color: #111; line-height: 1.6; }
      .title { text-align: center; border-bottom: 2px solid #000; padding-bottom: 1rem; margin-bottom: 2rem; font-size: 1.5rem; }
      h3 { font-size: 1rem; text-transform: uppercase; margin: 1.5rem 0 0.5rem; border-bottom: 1px solid #eee; }
      p { margin-bottom: 1rem; font-size: 0.95rem; }
      .sigs { display: flex; justify-content: space-between; margin-top: 4rem; gap: 2rem; }
      .sig-box { flex: 1; }
    `}</style>
  </div>
);

export default function NDAPage() {
  const faqs = [
    { question: "Is this NDA legally binding?", answer: "When signed by both parties, this is a valid mutual non-disclosure agreement. However, we recommend having a lawyer review it for high-stakes business deals." },
    { question: "What if I share sensitive info before signing?", answer: "The NDA typically covers information shared *after* the effective date. Sign it *before* you open your big ideas!" },
    { question: "Do you save my data?", answer: "No. All fields are processed in your browser. Once you refresh the page, the data is gone forever." }
  ];

  return (
    <ToolLayout
      category="Templates"
      categoryUrl="/templates"
      toolName="NDA Template"
      headline="Protect Your Ideas with an NDA"
      trustLine="Private, legal-ready document generated in-browser."
      description={
        <div>
          <p>A Non-Disclosure Agreement (NDA) is a legal contract that protects your secrets when you share them during a business talk.</p>
          <br />
          <p>This template is designed to be lean, professional, and easy to understand—exactly what "The Plain Tools" promised.</p>
        </div>
      }
      howItWorks={[
        { icon: '✍️', title: 'Fill Info', desc: 'Enter the names of both parties and the reason for the agreement.' },
        { icon: '👁️', title: 'Preview', desc: 'Watch the document update in the preview panel instantly.' },
        { icon: '💾', title: 'Download', desc: 'Export the final PDF and send it to the other party for signing.' }
      ]}
      faqs={faqs}
    >
      <TemplateEngine 
        title="Non-Disclosure Agreement" 
        fields={NDA_FIELDS} 
        initialData={INITIAL_NDA_DATA}
        previewComponent={NDAPreview}
      />
    </ToolLayout>
  );
}
