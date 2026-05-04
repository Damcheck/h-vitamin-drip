import { AIHeader } from "@/components/ai-theme/ai-header"
import { AIFooter } from "@/components/ai-theme/ai-footer"

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-[#F4F1E9]">
      <AIHeader />

      <div className="pt-[120px] pb-24">
        <div className="max-w-[800px] mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-[36px] md:text-[48px] font-bold text-foreground leading-tight mb-4">
              Terms of Service
            </h1>
            <p className="text-[14px] text-muted-foreground">Last Updated: May 2026</p>
          </div>

          <div className="prose prose-slate max-w-none text-foreground/80 space-y-8">
            <p className="text-sm">
              Holistic Care is located in Bexleyheath, England, DA7 4ST, United Kingdom.
              Our store and website are open for bookings. You can click here to book your appointment.
            </p>

            <section>
              <h2 className="text-xl font-bold text-[#132B23] mb-4">BOOKING DEPOSIT</h2>
              <p className="text-sm leading-relaxed">
                When booking your appointment, you will be asked for a £20 holding deposit. This amount will be deducted from your final bill at your appointment. If you do not show up for your appointment, the deposit will be forfeited.
                Our rescheduling policy allows you to reschedule your appointment up to 24 hours before your appointment without losing your deposit. However, if you cancel your appointment at any time, the deposit will not be returned.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#132B23] mb-4">CANCELLATION POLICY</h2>
              <p className="text-sm leading-relaxed">
                Please note that Holistic Vitamin Drips & Wellness operates on a 24-hour cancellation policy. If you wish to cancel or rearrange your appointment, and to ensure fair scheduling for all clients, we kindly request a 24-hour notice for any cancellations or rescheduling. If a client arrives more than 10 minutes after their appointment start time or fails to arrive for their scheduled appointment without prior notice, we will consider this a no-show or cancellation.
                To rearrange, cancel, or change your appointment, please contact us at least 24 hours in advance via phone call or email to talk to a member of our team who can assist you.
                We strive to ensure that we are always available to you and are open 7 days a week. Holistic Vitamin Drips and Wellness reserves the right to exercise discretion in applying this policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#132B23] mb-4">HOME AND OFFICE VISITS</h2>
              <p className="text-sm leading-relaxed">
                Home and office visits are subject to minimum spend with an additional call-out fee, which may vary per location. If a cancellation is made less than 24 hours before your appointment, you will be subject to a late cancellation fee, as per our Cancellation Policy above. This fee is equivalent to the full cost of the appointment and will be charged to your payment method on file. Call-outs must be paid 24 hours in advance, or – if the booking is made less than 24 hours before the appointment – at the time of booking. We will issue an invoice which must be paid in full, and in advance. We do not offer refunds on call-outs unless the medical consultation identifies you are not eligible for your IV Drip Therapy. Call-out times may vary up to 2 hours due to external circumstances such as poor traffic. We may try to contact you before, during, or after the scheduled call-out time to provide updates. We ask that you please keep your phone nearby to answer. The person having the drip must be present and ready for their appointment at the time of the appointment. If the customer is not ready at the appointed time then we will consider this as a cancellation (see above cancellation policy) and we reserve the right to invoice the full amount and not offer a refund.
              </p>
              <p className="text-sm leading-relaxed mt-4">
                Every person having an appointment must have their own email address. We will email a medical questionnaire in advance of the appointment, which must be completed at least 12 hours prior to the appointment. If the medical questionnaire has not been completed in advance of the appointment, we reserve the right to cancel the appointment.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#132B23] mb-4">AGE RESTRICTION & APPOINTMENTS</h2>
              <p className="text-sm leading-relaxed">
                All clients must be over the age of 18 at the time of their appointment. As a first-time client, arrive 15 minutes early. Drink 2 large glasses of water 30 minutes before the appointment and wear clothing with easy arm access. We may refuse entry for late arrivals (and charge 100% of the fee) for arrivals more than 15 minutes late.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#132B23] mb-4">CANCELLATIONS AND SERVICE TERMINATION</h2>
              <p className="text-sm leading-relaxed">
                Give us at least 24 hours’ notice to reschedule or cancel, or you may be charged the full fee. For website maintenance, we may occasionally suspend website access for maintenance or upgrades. We reserve the right to terminate your service for violating these terms or non-payment.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#132B23] mb-4">PRICING AND PAYMENT</h2>
              <p className="text-sm leading-relaxed">
                Our prices and availability are subject to change without notice. For sessions and packages, you can purchase single sessions, packages, or other combinations as offered. Sessions are non-transferable. We might increase session fees with 14 days’ prior notice. These terms do not affect your statutory consumer rights.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#132B23] mb-4">GENERAL TERMS & CONDITIONS</h2>
              <ul className="text-sm leading-relaxed space-y-4 list-disc pl-5">
                <li><strong>Acceptance:</strong> By using this website, you agree to these terms and conditions. You should review them periodically for updates.</li>
                <li><strong>Governing Law:</strong> These terms are governed by English law, and you agree to the non-exclusive jurisdiction of English courts.</li>
                <li><strong>Children & Pets:</strong> For safety reasons, children are not allowed in waiting areas or treatment rooms. We cannot accommodate pets in the clinic (service animals are permitted).</li>
                <li><strong>Promotion:</strong> All promotions are limited to one per person and cannot be combined with other offers.</li>
                <li><strong>Right To Refuse Service:</strong> We reserve the right to refuse service to anyone rude or aggressive towards our staff.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#132B23] mb-4">WEBSITE USE & LIABILITY</h2>
              <p className="text-sm leading-relaxed">
                We may amend these terms and conditions from time to time. Please check back periodically. We may update or modify the website for service improvements or user needs. We cannot guarantee uninterrupted website access. We own the intellectual property rights on our website and the content it contains. The content on our website is for general information only and should not be considered medical advice.
              </p>
              <p className="text-sm leading-relaxed mt-4">
                Products purchased from Holistic Vitamin Drips & Wellness are for private use only and not for commercial purposes. We are not liable for lost profits, business interruptions, or other damages arising from your use of our services. Our total liability to you is limited to the value of your contract—the price you paid for the products and any additional services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#132B23] mb-4">FEEDBACK AND COMPLAINTS</h2>
              <p className="text-sm leading-relaxed">
                Unsatisfied with your service? Email us at <a href="mailto:Info@hvitamindrip.co.uk" className="text-[#C4A67B] underline">Info@hvitamindrip.co.uk</a> to provide feedback or make a complaint.
              </p>
            </section>
          </div>
        </div>
      </div>

      <AIFooter />
    </main>
  )
}
