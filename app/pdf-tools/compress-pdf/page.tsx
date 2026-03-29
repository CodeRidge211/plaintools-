'use client';

import ToolLayout from "@/components/Tools/ToolLayout";
import PDFCompressor from "@/components/Tools/PDFCompressor";

export default function PDFCompressPage() {
  const faqs = [
    { question: "How does the PDF compression work?", answer: "Our tool uses pdf-lib, an in-browser processing library. It re-encodes the PDF objects and removes duplicates or unused elements. For large PDFs with many images, it optimizes the internal image streams without losing visible quality." },
    { question: "Will I lose image quality?", answer: "We aim for 'perceptually lossless' compression. Most users will not notice any difference in quality, especially for office documents. If you have extremely high-res photos, you might see a tiny change on high-zoom, but for sharing and printing, it remains professional." },
    { question: "Is it safe to upload sensitive PDFs?", answer: "Your file is NEVER uploaded. The processing happens entirely within your web browser. No data is sent to our servers. This is the safest way to compress sensitive legal or financial documents." },
    { question: "What is the maximum file size?", answer: "Since the processing happens in your browser, the limit depends on your device's memory. Most modern phones and computers can handle PDFs up to 100MB-200MB. Larger files might cause a slowdown or crash if your device is low on RAM." },
    { question: "Can I compress multiple PDFs at once?", answer: "Currently, this tool compresses one file at a time to ensure the highest speed and stability. You can quickly process and download one, then click 'start over' to do the next." }
  ];

  const steps = [
    { icon: '📁', title: 'Choose Your PDF', desc: "Select a file from your computer or phone's gallery. No size limit for local files." },
    { icon: '🤏', title: 'Shrink in Browser', desc: "We optimize the file structure using your device's speed. Fast and private." },
    { icon: '✅', title: 'Download New PDF', desc: "Download your compressed file instantly. We provide a size comparison so you can see the savings." }
  ];

  return (
    <ToolLayout
      category="PDF Tools"
      categoryUrl="/pdf-tools"
      toolName="Compress PDF"
      headline="Compress a PDF for Free — No Signup"
      trustLine="Your file never leaves your device. We don't store anything."
      howItWorks={steps}
      faqs={faqs}
      description={
        <div>
          <p>
            When you need to email a document or upload it to a portal, you often find the file size is too big. Most tools force you to upload your sensitive files to their servers, where they might be stored or analyzed.
          </p>
          <br />
          <p>
            The Plain Tools PDF Compressor is different. It's built on <strong>privacy-first principles</strong>. The compression logic runs inside your browser tab using modern JavaScript. You get a smaller file in seconds without ever letting your data leave your hands.
          </p>
        </div>
      }
    >
      <PDFCompressor />
    </ToolLayout>
  );
}
