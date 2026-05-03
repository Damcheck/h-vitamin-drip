import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="pt-[88px]">
        {/* Hero */}
        <div className="bg-background border-b border-border/30 py-16">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8 text-center">
            <p className="text-[13px] font-semibold uppercase tracking-widest text-foreground/40 mb-3">Legal</p>
            <h1 className="text-[48px] md:text-[64px] font-bold text-foreground leading-tight">Privacy Policy</h1>
            <p className="text-[14px] text-muted-foreground mt-3">Last updated: May 2026</p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-[860px] mx-auto px-6 lg:px-8 py-16">
          <div className="prose prose-lg max-w-none">
            <div className="space-y-10">
              {[
                {
                  title: "1. Introduction",
                  content: "H Vitamin Drip ('we', 'us', or 'our') is committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, and share information about you when you use our services or visit our website at hvitamindrip.ng.",
                },
                {
                  title: "2. Information We Collect",
                  content: "We collect information you provide directly to us, including your name, email address, phone number, health information relevant to treatments, and payment information. We also collect information automatically when you use our website, such as your IP address, browser type, and pages visited.",
                },
                {
                  title: "3. How We Use Your Information",
                  content: "We use your information to provide, maintain, and improve our services; process bookings and payments; communicate with you about your appointments; send you marketing communications (with your consent); and comply with legal obligations. Health information is used solely for the purpose of providing safe and appropriate treatment.",
                },
                {
                  title: "4. How We Share Your Information",
                  content: "We do not sell or rent your personal information to third parties. We may share your information with our registered nurses and healthcare professionals who administer your treatment, payment processors, and analytics providers. All third parties are bound by confidentiality obligations.",
                },
                {
                  title: "5. Data Security",
                  content: "We implement appropriate technical and organisational measures to protect your personal information against unauthorised or unlawful processing and against accidental loss, destruction, or damage. However, no method of transmission over the internet is 100% secure.",
                },
                {
                  title: "6. Data Retention",
                  content: "We retain your personal information for as long as necessary to provide our services and comply with our legal obligations. Health records are retained in accordance with Nigerian medical regulations. You may request deletion of your data at any time by contacting us.",
                },
                {
                  title: "7. Your Rights",
                  content: "You have the right to access, correct, or delete your personal information; object to or restrict processing of your personal information; withdraw consent at any time where processing is based on consent; and lodge a complaint with the relevant data protection authority in Nigeria.",
                },
                {
                  title: "8. Cookies",
                  content: "We use cookies and similar tracking technologies to enhance your experience on our website. You can control cookie settings through your browser settings. Note that disabling cookies may affect some features of our website.",
                },
                {
                  title: "9. Children's Privacy",
                  content: "Our services are not intended for children under the age of 18. We do not knowingly collect personal information from minors. If you believe we have collected information from a child, please contact us immediately.",
                },
                {
                  title: "10. Changes to This Policy",
                  content: "We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on this page and updating the 'last updated' date. Your continued use of our services after such changes constitutes your acceptance of the updated policy.",
                },
                {
                  title: "11. Contact Us",
                  content: "If you have any questions about this Privacy Policy or our privacy practices, please contact us at: hello@hvitamindrip.ng or +234 800 000 0000. You may also write to us at: H Vitamin Drip, Lagos, Nigeria.",
                },
              ].map((section) => (
                <div key={section.title} className="border-b border-border/30 pb-8 last:border-0">
                  <h2 className="text-[20px] font-bold text-foreground mb-3">{section.title}</h2>
                  <p className="text-[15px] text-foreground/60 leading-relaxed">{section.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
