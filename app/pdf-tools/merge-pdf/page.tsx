'use client';

import ToolLayout from "@/components/Tools/ToolLayout";
import PDFMerger from "@/components/Tools/PDFMerger";

export default function PDFMergePage() {
  const faqs = [
    { question: "How many PDFs can I merge at once?", answer: "Currently, our tool supports merging up to 20 PDFs at once. For more than that, we recommend doing them in batches of 10-20 to ensure maximum speed and stability in your browser." },
    { question: "What happens to my files after I merge them?", answer: "They are deleted immediately. Since the merging happens entirely within your browser tab, the files are only temporary residents in your device's memory. Once you close the tab, both your original files and the new merged file are cleared from memory." },
    { question: "Will the order be correct?", answer: "Yes! The files will be merged in the order they appear in your list. You can see the index numbers (1, 2, 3...) to confirm that they are in the sequence you desire." },
    { question: "Does it work with password-protected PDFs?", answer: "At this time, we cannot merge password-protected (encrypted) PDFs due to security and privacy limitations of in-browser processing. You will need to unlock your PDF before using this tool." },
    { question: "Is this tool free for business use?", answer: "Absolutely. 100% free for everyone, whether you are a student, a freelancer, or a business professional. No signup, no watermarks, no credit card required." }
  ];

  const steps = [
    { icon: '➕', title: 'Upload Multiple PDFs', desc: "Drag and drop your files into the upload box. You can add them one by one or all at once." },
    { icon: '🔢', title: 'Check the Sequence', desc: "Look at the list to make sure your files are in the order you want. We join them from top to bottom." },
    { icon: '🔗', title: 'Merge & Download', desc: "Click combined to create a single document. Download it immediately and get back to your day." }
  ];

  return (
    <ToolLayout
      category="PDF Tools"
      categoryUrl="/pdf-tools"
      toolName="Merge PDF"
      headline="Merge PDF Files Into One — No Signup"
      trustLine="Combine documents in seconds without uploading to a server."
      howItWorks={steps}
      faqs={faqs}
      description={
        <div>
          <p>
            Combining multiple documents into a single PDF shouldn't involve complex software or expensive subscriptions.
          </p>
          <br />
          <p>
            Our PDF Merger tool is fast, private, and runs entirely in your web browser. Perfect for merging multiple resumes, scanning separate receipt pages into one report, or combining legal documents into a single file for sharing. <strong>Fast, clean, and impossible to mess up.</strong>
          </p>
        </div>
      }
    >
      <PDFMerger />
    </ToolLayout>
  );
}
