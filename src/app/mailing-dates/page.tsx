import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mailing Dates — Sister Wisdoms",
  description:
    "See when your next Sister Wisdoms letter will mail and when to expect delivery.",
};

const mailingSchedule = [
  { month: "January", mailDate: "January 1", delivery: "January 4–7" },
  { month: "February", mailDate: "February 1", delivery: "February 4–7" },
  { month: "March", mailDate: "March 1", delivery: "March 4–7" },
  { month: "April", mailDate: "April 1", delivery: "April 4–7" },
  { month: "May", mailDate: "May 1", delivery: "May 4–7" },
  { month: "June", mailDate: "June 1", delivery: "June 4–7" },
  { month: "July", mailDate: "July 1", delivery: "July 4–7" },
  { month: "August", mailDate: "August 1", delivery: "August 4–7" },
  { month: "September", mailDate: "September 1", delivery: "September 4–7" },
  { month: "October", mailDate: "October 1", delivery: "October 4–7" },
  { month: "November", mailDate: "November 1", delivery: "November 4–7" },
  { month: "December", mailDate: "December 1", delivery: "December 4–7" },
];

export default function MailingDatesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-blush/20 to-cream py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="font-handwritten text-xl text-dusty-rose mb-3">
            Mark your calendar
          </p>
          <h1 className="text-4xl md:text-5xl font-light text-deep-plum mb-6">
            Mailing Dates
          </h1>
          <p className="text-warm-brown/80 text-lg leading-relaxed max-w-xl mx-auto">
            Every letter mails on the 1st of the month from our studio in
            Salado, Texas. Here&apos;s the full schedule.
          </p>
        </div>
      </section>

      {/* Schedule Table */}
      <section className="py-20 md:py-28">
        <div className="max-w-2xl mx-auto px-6">
          <div className="bg-soft-white rounded-2xl border border-blush/20 overflow-hidden">
            <div className="grid grid-cols-3 bg-deep-plum text-soft-white text-xs uppercase tracking-widest font-semibold">
              <div className="px-6 py-4">Month</div>
              <div className="px-6 py-4">Mail Date</div>
              <div className="px-6 py-4">Est. U.S. Delivery</div>
            </div>
            {mailingSchedule.map((row, i) => (
              <div
                key={row.month}
                className={`grid grid-cols-3 text-sm ${
                  i % 2 === 0 ? "bg-soft-white" : "bg-cream/50"
                }`}
              >
                <div className="px-6 py-3 font-semibold text-deep-plum">
                  {row.month}
                </div>
                <div className="px-6 py-3 text-warm-brown/80">
                  {row.mailDate}
                </div>
                <div className="px-6 py-3 text-warm-brown/80">
                  {row.delivery}
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-warm-brown/50 text-center mt-6">
            International delivery typically takes 7–14 additional business
            days depending on destination.
          </p>
        </div>
      </section>
    </>
  );
}
