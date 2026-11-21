import { SITE, firstMailingPhrase } from "./config";

export type Faq = { q: string; a: string };

// One list drives both the visible FAQ and the FAQPage JSON-LD, so they cannot drift.
export function getFaq(now = new Date()): Faq[] {
  return [
    {
      q: "What is a letter subscription gift?",
      a: `It is a gift that arrives in the mailbox once a month instead of all at once. With Sister Wisdoms, the person you choose gets one paper letter a month, written in the voice of a wise old friend, mailed to their home address. It is ${SITE.priceLabel}.`,
    },
    {
      q: "Is a monthly letter a good gift for someone who has everything?",
      a: "Yes. It is a paper letter in her own mailbox once a month, so it keeps arriving long after the occasion. You can add a message to your gift in the form.",
    },
    {
      q: "How do I give a letter subscription as a gift?",
      a: "Fill in the form on this page: your message, the month you want the letters to start, her name and mailing address, and your details. We read it and email you to complete payment. We do not take payment on this page. Nothing is charged until you have heard from us and said yes.",
    },
    {
      q: "How much does it cost?",
      a: `${SITE.priceLabel}. There is one tier and one letter a month.`,
    },
    {
      q: "When does the first letter arrive?",
      a: `${firstMailingPhrase(now)} Choose a start month in the form and we will plan around it. We confirm the exact mailing in the email we send you.`,
    },
    {
      q: "Where does the recipient's first letter begin?",
      a: "Every subscriber begins at Letter 1, whichever month they start. A gift can begin in any month you choose.",
    },
    {
      q: "Is it a paper letter or an email?",
      a: "Paper. Each letter is mailed to the recipient's address in the United States through the postal service.",
    },
    {
      q: "Can I send it to my mom, sister, or a friend?",
      a: "Yes. Anyone who has a mailing address in the United States.",
    },
    {
      q: "Does the recipient need to do anything?",
      a: "No. Give us her name and mailing address and the letters come to her. You can keep it a surprise.",
    },
    {
      q: "Can I add a personal note?",
      a: "Yes. The gift message box in the form is for that. Your words come to us with the order, and the email we send you will confirm how we pass them along.",
    },
    {
      q: "Can I cancel or change an address later?",
      a: "We will spell out how cancelling and address changes work in the email we send you before you pay, so you can read it before you decide.",
    },
    {
      q: "Who is behind Sister Wisdoms?",
      a: "Tim and Cherie Flanagan, a husband and wife in Salado, Texas, who run Solas Gallery. You can read a little more about them further down this page.",
    },
  ];
}

export function faqJsonLd(now = new Date()) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE.url}/#faq`,
    mainEntity: getFaq(now).map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
