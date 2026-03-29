'use client';

import ToolLayout from "@/components/Tools/ToolLayout";

export default function AnonymousReportPage() {
  const faqs = [
    { question: "Is my IP address logged?", answer: "No. We do not log IP addresses, browser fingerprints, or any other identifying data for submission through this form. The server receives the data and immediately processes it through the email gateway without writing to a local database." },
    { question: "Can the recipient see who I am?", answer: "No. The email comes from a generic @theplaintools.com address. Unless you include identifying information in the report body, the recipient has no way of knowing who sent the message." },
    { question: "Do you store the report contents?", answer: "No. Once the email is successfully dispatched to the recipient's mail provider, we immediately purge the data from memory. There is no 'outbox' or 'sent history' for these reports." },
    { question: "Is this tool encrypted?", answer: "Yes. All traffic to theplaintools.com is encrypted via HTTPS (SSL), meaning your report contents are protected between your device and our server." },
    { question: "What if the recipient doesn't receive it?", answer: "We recommend confirming through another channel if possible, or using an official whistleblower portal if your report is of high legal sensitivity. This tool is designed for convenience and privacy for everyday use cases." }
  ];

  const steps = [
    { icon: '📝', title: 'Write Your Report', desc: "Explain the who, what, and where in plain English. Keep it clear and concise." },
    { icon: '📧', title: 'Enter Recipient', desc: "Tell us where to send it. This can be an HR email, a tip line, or any valid address." },
    { icon: '🚀', title: 'Send Privately', desc: "We'll send it from our server. No record of your session or device is kept." }
  ];

  return (
    <ToolLayout
      category="Anonymous Reporting"
      categoryUrl="/anonymous-reporting"
      toolName="Anonymous Tip Form"
      headline="Send an Anonymous Report — No Tracking"
      trustLine="Everything we do is private. No IP logging, no cookies, no storage."
      howItWorks={steps}
      faqs={faqs}
      description={
        <div>
          <p>
            The Anonymous Tip Form is designed for situations where you need to report something—harassment, safety concerns, or community issues—without fear of digital retaliation or tracking.
          </p>
          <br />
          <p>
            Unlike typical "contact us" forms, we don't attach your metadata to the message. No IP addresses, no user agents, and no session identifiers reach the recipient. It's the digital version of dropping a plain white envelope on someone's desk.
          </p>
        </div>
      }
    >
      <AnonymousForm />
    </ToolLayout>
  );
}

function AnonymousForm() {
  return (
    <div className="report-form-container">
      <form className="report-form">
        <div className="field">
          <label htmlFor="report-target">Who or what are you reporting?</label>
          <input id="report-target" type="text" placeholder="e.g. Local construction noise, safety issue at work..." required />
          <div className="plain-english-helper">Tell us the main subject of your report in a few words.</div>
        </div>

        <div className="field">
          <label htmlFor="report-details">Report Details</label>
          <textarea id="report-details" rows={6} placeholder="Provide as much detail as possible. Remember not to include your own name if you wish to remain 100% anonymous." required />
          <div className="plain-english-helper">Explain what happened, where, and when. More detail is better for the person reading it.</div>
        </div>

        <div className="field">
          <label htmlFor="recipient-email">Where should we send this report? (Recipient Email)</label>
          <input id="recipient-email" type="email" placeholder="e.g. hr@company.com or tips@city-dept.gov" required />
          <div className="plain-english-helper">Enter the email address of the person or department who needs to see this.</div>
        </div>

        <div className="form-footer">
          <p className="privacy-confirm">By clicking below, you confirm that you want to send this message anonymously.</p>
          <button type="submit" className="btn btn-primary send-report-btn">Send My Report Now</button>
        </div>
      </form>

      <style jsx>{`
        .report-form {
          max-width: 600px;
          margin: 0 auto;
          display: grid;
          gap: 2rem;
        }

        .field {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        label {
          font-weight: 700;
          font-family: var(--font-display);
          font-size: 1.1rem;
        }

        input, textarea {
          padding: 1rem;
          background: var(--background);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          font-size: 1rem;
          color: var(--text-main);
          width: 100%;
          transition: all 0.3s;
        }

        input:focus, textarea:focus {
          border-color: var(--primary);
          outline: none;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
        }

        .form-footer {
          text-align: center;
          margin-top: 2rem;
        }

        .privacy-confirm {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 1.5rem;
        }

        .send-report-btn {
          width: 100%;
          padding: 1.25rem;
          font-size: 1.15rem;
          border-radius: 40px;
        }
      `}</style>
    </div>
  );
}
