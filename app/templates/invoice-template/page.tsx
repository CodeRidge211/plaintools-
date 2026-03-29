'use client';

'use client';

import TemplateEngine from "@/components/Templates/TemplateEngine";
import ToolLayout from "@/components/Tools/ToolLayout";

const INVOICE_FIELDS = [
  { id: 'billerName', label: 'Your Name / Business', type: 'text', placeholder: 'e.g. John Smith Designs', helper: 'The person or company sending the bill.' },
  { id: 'billerAddress', label: 'Your Address', type: 'textarea', placeholder: 'e.g. 123 Main St, New York, NY 10001', helper: 'Street address, city, state and zip code.' },
  { id: 'clientName', label: 'Client Name / Business', type: 'text', placeholder: 'e.g. Acme Corp', helper: 'Who is paying you?' },
  { id: 'clientAddress', label: 'Client Address', type: 'textarea', placeholder: 'e.g. 456 Business Rd, New York, NY 10002', helper: 'Where they are located.' },
  { id: 'invoiceNumber', label: 'Invoice #', type: 'text', placeholder: 'e.g. INV-001', helper: 'A unique number to track this bill.' },
  { id: 'invoiceDate', label: 'Date', type: 'date', placeholder: '', helper: 'The day you are sending this.' },
  { id: 'dueDate', label: 'Due Date', type: 'date', placeholder: '', helper: 'When do you expect to be paid?' },
  { id: 'item1Description', label: 'Item 1 Description', type: 'text', placeholder: 'e.g. Logo Design', helper: 'What service or product did you provide?' },
  { id: 'item1Price', label: 'Item 1 Price ($)', type: 'number', placeholder: 'e.g. 500', helper: 'How much does this item cost?' },
  { id: 'notes', label: 'Notes / Payment Terms', type: 'textarea', placeholder: 'e.g. Please pay via Venmo @johnsmith', helper: 'Any extra information for the client.' }
];

const INITIAL_INVOICE_DATA = {
  billerName: 'John Smith Designs',
  billerAddress: '123 Main St\nNew York, NY 10001',
  clientName: 'Acme Corp',
  clientAddress: '456 Business Rd\nNew York, NY 10002',
  invoiceNumber: 'INV-2026-001',
  invoiceDate: '2026-03-29',
  dueDate: '2026-04-29',
  item1Description: 'Professional Logo Design Project',
  item1Price: 500,
  notes: 'Thank you for your business. Please pay within 30 days.'
};

const InvoicePreview = (data: Record<string, any>) => (
  <div className="invoice-doc">
    <div className="header">
      <div className="biller-info">
        <h2>{data.billerName}</h2>
        <p>{data.billerAddress}</p>
      </div>
      <div className="invoice-meta">
        <h1>INVOICE</h1>
        <p><strong>#{data.invoiceNumber}</strong></p>
        <p>Date: {data.invoiceDate}</p>
      </div>
    </div>

    <div className="bill-to">
      <h4>BILL TO:</h4>
      <p><strong>{data.clientName}</strong></p>
      <p>{data.clientAddress}</p>
    </div>

    <table className="items-table">
      <thead>
        <tr>
          <th>Description</th>
          <th align="right">Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{data.item1Description}</td>
          <td align="right">${(parseFloat(data.item1Price) || 0).toFixed(2)}</td>
        </tr>
      </tbody>
    </table>

    <div className="total-section">
      <div className="total-row">
        <span>Subtotal:</span>
        <span>${(parseFloat(data.item1Price) || 0).toFixed(2)}</span>
      </div>
      <div className="total-row grand-total">
        <span>Grand Total:</span>
        <span>${(parseFloat(data.item1Price) || 0).toFixed(2)}</span>
      </div>
    </div>

    <div className="notes-section">
      <p><strong>Payment Terms:</strong></p>
      <p>{data.notes}</p>
      <p>Due on: {data.dueDate}</p>
    </div>

    <style jsx>{`
      .invoice-doc { font-family: 'Inter', sans-serif; color: #111; display: flex; flex-direction: column; gap: 2rem; }
      .header { display: flex; justify-content: space-between; border-bottom: 2px solid #eee; padding-bottom: 1rem; }
      .biller-info h2 { font-size: 1.5rem; margin-bottom: 0.5rem; }
      .invoice-meta { text-align: right; }
      .invoice-meta h1 { font-size: 2.5rem; color: var(--primary); margin: 0; }
      .bill-to h4 { font-size: 0.8rem; color: #666; margin-bottom: 0.5rem; }
      .items-table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
      .items-table th { background: #f8f8f8; padding: 1rem; text-align: left; font-size: 0.9rem; }
      .items-table td { padding: 1rem; border-bottom: 1px solid #eee; }
      .total-section { display: flex; flex-direction: column; align-items: flex-end; margin-top: 2rem; gap: 0.5rem; }
      .total-row { display: flex; gap: 2rem; font-size: 1.1rem; }
      .grand-total { font-weight: 800; font-size: 1.5rem; color: var(--primary); border-top: 2px solid #eee; padding-top: 0.5rem; }
      .notes-section { margin-top: 3rem; font-size: 0.9rem; color: #444; }
    `}</style>
  </div>
);

export default function InvoicePage() {
  const steps = [
    { icon: '📝', title: 'Fill in Details', desc: 'Type your business name, client info, and item descriptions. Everything updates instantly.' },
    { icon: '👀', title: 'Live Preview', desc: 'See exactly how it looks as you type. Real-time updates every 300ms.' },
    { icon: '⬇️', title: 'Download PDF', desc: 'Download a professional PDF document. No watermarks, no account needed.' }
  ];

  const faqs = [
    { question: 'Is this invoice legally binding?', answer: 'An invoice is a request for payment and documents a transaction. While this template follows professional standards, it is always best to consult with a legal professional for complex contracts or specific industry requirements.' },
    { question: 'Can I add multiple items?', answer: 'In the current Launch Phase, our templates are optimized for 1-2 primary line items for speed. We will be adding support for unlimited line items in the coming weeks.' },
    { question: 'Where is my data stored?', answer: 'Nowhere. Your data is only kept in your browser memory while you are filling the form. Once you download the PDF or refresh the page, the data is gone.' }
  ];

  return (
    <ToolLayout
      category="Templates"
      categoryUrl="/templates"
      toolName="Free Invoice Template"
      headline="Create a Professional Invoice — No Signup"
      trustLine="Fill it out. Download it. We don't save your data."
      howItWorks={steps}
      faqs={faqs}
      description={
        <div>
          <p>
            Generating an invoice should be the easiest part of your job. Most tools force you to create an account, enter credit card details for a "free trial," or deal with ugly watermarks on your final PDF.
          </p>
          <br />
          <p>
            The Plain Tools Invoice Template is built for speed and privacy. Use it as many times as you want, download a clean PDF, and get back to work. Perfect for freelancers, tutors, and small business owners.
          </p>
        </div>
      }
    >
      <TemplateEngine
        fields={INVOICE_FIELDS}
        initialData={INITIAL_INVOICE_DATA}
        previewComponent={InvoicePreview}
        title="Professional Invoice"
      />
    </ToolLayout>
  );
}
