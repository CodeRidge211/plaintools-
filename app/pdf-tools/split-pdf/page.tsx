'use client';

import ToolLayout from '@/components/Tools/ToolLayout';
import PDFSplitter from '@/components/Tools/PDFSplitter';

export default function SplitPDFPage() {
  const howItWorks = [
    {
      icon: '📂',
      title: 'Select PDF',
      desc: 'Upload the PDF document you want to split or extract pages from.'
    },
    {
      icon: '✂️',
      title: 'Choose Pages',
      desc: 'Select specific page ranges or extract all pages into separate files.'
    },
    {
      icon: '💾',
      title: 'Download',
      desc: 'Instantly download your new, separated PDF documents.'
    }
  ];

  const faqs = [
    {
      question: 'Is my document uploaded to a server?',
      answer: 'No. The splitting process happens entirely within your web browser using JavaScript. We never see, store, or upload your private documents.'
    },
    {
      question: 'Can I select specific page numbers?',
      answer: 'Yes! You can enter comma-separated numbers (1, 3, 5) or ranges (1-5) to extract exactly what you need.'
    },
    {
      question: 'Is there a file size limit?',
      answer: 'Since the processing happens on your device, the only limit is your device\'s RAM. Most modern phones and computers can easily handle 100MB+ PDFs.'
    }
  ];

  return (
    <ToolLayout
      category="PDF Tools"
      categoryUrl="/pdf-tools"
      toolName="Split PDF"
      headline="Split & Extract PDF Pages"
      trustLine="100% Secure. Processed locally in your browser."
      howItWorks={howItWorks}
      faqs={faqs}
      description={
        <>
          <p>
            Splitting a large PDF document used to require expensive software or sketchy websites that force 
            you to upload your private data. We built this tool to be different.
          </p>
          <p>
            Whether you need to extract a single page from a massive contract, or break an entire book down 
            into chapters, our <strong>Free PDF Splitter</strong> gets the job done instantly. Because everything 
            runs <strong>locally on your device</strong>, there are no wait times for uploads or downloads, and 
            zero risk of your sensitive documents being intercepted.
          </p>
        </>
      }
    >
      <PDFSplitter />
    </ToolLayout>
  );
}
