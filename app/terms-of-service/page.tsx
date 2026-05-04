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
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using the services provided by H Vitamin Drip ("we," "us," or "our"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Medical Disclaimer</h2>
              <p>
                The services provided by H Vitamin Drip, including IV vitamin therapy and booster shots, are not intended to diagnose, treat, cure, or prevent any disease. The material on this website is provided for informational purposes only and is not medical advice. Always consult your physician before beginning any therapy program.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. Appointments and Cancellations</h2>
              <p>
                When booking an appointment, you agree to provide accurate and complete information. We require at least 24 hours notice for any cancellations or rescheduling. Cancellations made less than 24 hours before the scheduled appointment may be subject to a cancellation fee.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Payment Terms</h2>
              <p>
                Payment for services is due at the time of booking or upon completion of the service, depending on the payment method selected. We accept major credit/debit cards and bank transfers. Prices are subject to change without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by applicable law, H Vitamin Drip shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Contact Information</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <ul className="list-none pl-0 mt-4 space-y-2">
                <li><strong>Email:</strong> info@hvitamindrip.co.uk</li>
                <li><strong>Phone / WhatsApp:</strong> +44 7495 393025</li>
              </ul>
            </section>
          </div>
        </div>
      </div>

      <AIFooter />
    </main>
  )
}
