
import DashboardLayout from "../../../components/layout/DashboardLayout";
import {
  Ban,
  Check,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";

const highlights = [
  {
    icon: Ban,
    title: "We never sell your data",
    description:
      "Your personal and health data is shared only as far as needed to give you care.",
  },
  {
    icon: Check,
    title: "Sharing needs your consent",
    description:
      "Your health records are private by default. You approve sharing and can revoke it at any time.",
  },
  {
    icon: LockKeyhole,
    title: "Encrypted end to end",
    description:
      "AES-256 encryption for health records at rest, TLS in transit and encrypted consultations.",
  },
  {
    icon: ShieldCheck,
    title: "Your rights are protected",
    description:
      "Access, correct, move or delete your data under the Nigeria Data Protection Act, 2023.",
  },
];

const legalBases = [
  {
    title: "Consent",
    description:
      "For example, sharing your reports, recording consultations and marketing. You can withdraw consent at any time.",
  },
  {
    title: "Contract performance",
    description: "To provide the services you request.",
  },
  {
    title: "Legitimate interest",
    description:
      "To secure and improve the Platform, where this does not override your rights.",
  },
  {
    title: "Legal compliance",
    description: "To meet our legal and regulatory duties.",
  },
  {
    title: "Vital interest",
    description:
      "To protect life in a medical emergency where you cannot give consent.",
  },
];

const sharingPrinciples = [
  {
    title: "You approve",
    description:
      "Sharing with a new doctor, pharmacist or hospital needs your explicit in-app consent, either per instance or per provider.",
  },
  {
    title: "You control",
    description:
      "You can revoke access at any time from your EHR settings.",
  },
  {
    title: "We never sell",
    description:
      "We never sell your health data to anyone, for any reason.",
  },
];

const privacyRights = [
  {
    title: "Access and correct",
    description: "Access, correct and update your personal data.",
  },
  {
    title: "Withdraw consent",
    description: "Withdraw your consent to non-essential processing.",
  },
  {
    title: "Delete your data",
    description:
      "Request deletion, subject to legal retention requirements.",
  },
  {
    title: "Object and port",
    description:
      "Object to processing and request portability of your EHR.",
  },
  {
    title: "Complain",
    description:
      "Lodge a complaint with the Nigeria Data Protection Commission (NDPC).",
  },
];

const informationCollected = [
  {
    heading: "3.1 Information you provide directly",
    items: [
      <>
        <strong>Account information:</strong> name, phone number, email
        address, date of birth, gender, location and password.
      </>,
      <>
        <strong>Medical and health information:</strong> symptoms, medical
        history, allergies, medications, consultation notes, uploaded lab
        reports, images, prescriptions and health goals. This is special
        (sensitive) personal data and receives the highest level of
        protection.
      </>,
      <>
        <strong>Pharmacy and transaction data:</strong> prescriptions
        ordered, delivery address, pharmacy preferences and payment
        information. Payments are processed by secure third-party payment
        providers; we do not store your full card details.
      </>,
      <>
        <strong>Communications:</strong> messages, feedback and support
        chats. Audio and video consultations are recorded only with your
        explicit consent.
      </>,
    ],
  },
  {
    heading: "3.2 Information collected automatically",
    items: [
      <>
        <strong>Device and usage data:</strong> IP address, device type,
        operating system, browser type, app usage, log files and
        consultation duration.
      </>,
      <>
        <strong>Location data:</strong> approximate location, used to find
        the nearest pharmacy or hospital and to arrange delivery. We
        collect this only with your permission.
      </>,
      <>
        <strong>Cookies and similar technologies:</strong> used to keep
        you logged in, remember your preferences and analyse how the
        Platform is used (see Section 12).
      </>,
    ],
  },
  {
    heading: "3.3 Information from third parties",
    items: [
      "Healthcare professionals you consult on the Platform (for example, diagnoses and consultation notes).",
      "Hospitals and laboratories in our network that share reports you have authorised.",
      "Payment processors and identity verification partners.",
    ],
  },
];

const useOfData = [
  "Create and manage your account and your Electronic Health Record (EHR).",
  "Facilitate virtual consultations and connect you with healthcare professionals.",
  "Enable prescription ordering, price comparison and medication delivery.",
  "Enable secure sharing of medical reports between hospitals, only when you explicitly authorise it.",
  "Process payments and prevent fraud.",
  "Improve the Platform, personalise your experience and send proactive health reminders, such as drug refills and check-ups.",
  "Comply with legal and regulatory obligations, including those of the Medical and Dental Council of Nigeria.",
  "Send essential service updates. We send marketing messages only if you opt in.",
];

const sharingData = [
  <>
    <strong>Healthcare professionals on Medicpadi:</strong> the doctors,
    pharmacists and consultants you choose to consult.
  </>,
  <>
    <strong>Network hospitals and laboratories:</strong> only the reports
    you authorise us to share.
  </>,
  <>
    <strong>Pharmacies and logistics partners:</strong> your name, phone
    number, delivery address and prescription, so they can fulfil your
    order.
  </>,
  <>
    <strong>Service providers:</strong> cloud hosting (AWS or Google Cloud),
    payment gateways (Paystack or Flutterwave), analytics (using
    de-identified data) and customer support tools. They are bound by
    strict confidentiality obligations.
  </>,
  <>
    <strong>Legal and safety disclosures:</strong> where required by law
    or court order, or to protect life when you are unable to consent.
  </>,
];

const securityMeasures = [
  "End-to-end encryption for consultations.",
  "AES-256 encryption for EHR data at rest, and TLS encryption in transit.",
  "Role-based access controls, so people see only what their role requires.",
  "Two-factor authentication for healthcare professionals.",
  "Regular security audits.",
];

const retentionData = [
  {
    type: "Account data",
    duration: "While your account is active.",
  },
  {
    type: "Medical records / EHR",
    duration:
      "At least 10 years, as required by Nigerian medical record laws, even after account closure. After that, anonymised or securely deleted.",
  },
  {
    type: "Transaction records",
    duration: "6 years, for tax and audit purposes.",
  },
];

function Section({ number, title, children }) {
  return (
    <section className="border-t border-gray-200 pt-7">
      <div className="flex items-center gap-3 mb-5">
        <span className="w-8 h-8 shrink-0 rounded-lg bg-[#150D5E] text-white flex items-center justify-center text-sm font-semibold">
          {number}
        </span>
        <h2 className="text-lg md:text-xl font-semibold text-[#333333]">
          {title}
        </h2>
      </div>

      <div className="text-sm text-gray-600 leading-7">
        {children}
      </div>
    </section>
  );
}

function InfoCards({ items, columns = 3 }) {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 ${
        columns === 4 ? "xl:grid-cols-4" : "xl:grid-cols-3"
      } gap-4 mt-5`}
    >
      {items.map((item) => (
        <div
          key={item.title}
          className="border border-gray-200 rounded-xl p-5 bg-white"
        >
          <h3 className="font-semibold text-[#333333] mb-3">
            {item.title}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function Policy() {
  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto bg-white border border-gray-200 rounded-xl p-5 md:p-8 space-y-8">

        {/* Heading and Introduction */}
        <div>
          <h1 className="text-2xl font-semibold text-[#333333]">
            Policy
          </h1>

          <h2 className="text-lg font-semibold text-[#333333] mt-5">
            Your health data is yours. This is how we protect it.
          </h2>

          <p className="text-sm text-gray-600 leading-7 mt-2">
            This Privacy Policy explains how Medicpadi collects, uses,
            shares and protects your personal data when you use our web
            app, mobile app and related services.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="border border-gray-200 rounded-xl p-5 min-h-[175px]"
                >
                  <Icon size={22} className="text-[#150D5E] mb-5" />

                  <h3 className="font-semibold text-sm text-[#333333] mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 1. Introduction */}
        <Section number="1" title="Introduction">
          <div className="space-y-4">
            <p>
              Medicpadi ("we", "us", "our", the "Platform") is a
              telemedicine platform that connects you with doctors,
              pharmacists and health consultants. Our aim is to make
              healthcare proactive, accessible and part of daily life,
              not only something you turn to when you are ill.
            </p>

            <p>
              This Privacy Policy explains how we collect, use, share,
              protect and otherwise process your personal data when you
              use the Medicpadi web app, our mobile app and related
              services. These include appointment scheduling, virtual
              consultations, prescription ordering, medication delivery
              and price comparison, and Electronic Health Records (EHR).
            </p>

            <p>
              By creating an account and using Medicpadi, you acknowledge
              that you have read this policy. Where we process your
              health information, we ask for your explicit consent
              inside the app, as described in Sections 4 and 5.
            </p>
          </div>
        </Section>

        {/* 2. Data Controller */}
        <Section number="2" title="Data Controller">
          <p>
            Medicpadi [Insert Full Legal Company Name], a company
            registered in Nigeria, is the Data Controller responsible
            for your personal data.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
            <div className="bg-[#F3F4FF] rounded-xl p-5">
              <h3 className="font-semibold text-[#333333] mb-2">
                General Enquiries
              </h3>
              <a
                href="mailto:privacy@medicpadi.com"
                className="text-sm text-[#150D5E] underline"
              >
                privacy@medicpadi.com
              </a>
            </div>

            <div className="bg-[#F3F4FF] rounded-xl p-5">
              <h3 className="font-semibold text-[#333333] mb-2">
                Data Protection Officer
              </h3>
              <a
                href="mailto:dpo@medicpadi.com"
                className="text-sm text-[#150D5E] underline"
              >
                dpo@medicpadi.com
              </a>
            </div>
          </div>
        </Section>

        {/* 3. Information We Collect */}
        <Section number="3" title="Information We Collect">
          <p>
            We collect three kinds of information: what you give us,
            what we collect automatically, and what third parties share
            with us.
          </p>

          <div className="space-y-6 mt-5">
            {informationCollected.map((group) => (
              <div key={group.heading}>
                <h3 className="font-semibold text-[#333333] mb-3">
                  {group.heading}
                </h3>

                <ul className="list-disc pl-5 space-y-3">
                  {group.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {/* 4. How We Use Your Data */}
        <Section number="4" title="How We Use Your Data">
          <p>We use your personal data to:</p>

          <ol className="list-decimal pl-5 space-y-3 mt-4">
            {useOfData.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ol>

          <h3 className="font-semibold text-[#333333] mt-7 mb-2">
            Legal bases for processing
          </h3>

          <p>
            Under the Nigeria Data Protection Act 2023 (NDPA), we rely
            on one or more of the following legal bases:
          </p>

          <InfoCards items={legalBases} />
        </Section>

        {/* 5. EHR and Medical Report Sharing */}
        <Section
          number="5"
          title="Electronic Health Records and Medical Report Sharing"
        >
          <p>
            Your EHR is encrypted and stored securely, and it is private
            by default. We operate a consent-based sharing model.
          </p>

          <InfoCards items={sharingPrinciples} />
        </Section>

        {/* 6. How We Share Your Data */}
        <Section number="6" title="How We Share Your Data">
          <p>
            We do not sell your personal data. We share it only as far
            as necessary:
          </p>

          <ul className="list-disc pl-5 space-y-3 mt-4">
            {sharingData.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <p className="mt-5">
            All third-party professionals on Medicpadi are
            contractually bound to keep your information confidential.
          </p>
        </Section>

        {/* 7. Data Security */}
        <Section number="7" title="Data Security">
          <p>We protect your data with industry-standard measures:</p>

          <ul className="list-disc pl-5 space-y-3 mt-4">
            {securityMeasures.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <p className="mt-5">
            No system is completely secure, so we cannot guarantee
            absolute security. Please keep your password confidential
            and tell us promptly at{" "}
            <a
              href="mailto:privacy@medicpadi.com"
              className="text-[#150D5E] underline"
            >
              privacy@medicpadi.com
            </a>{" "}
            if you suspect unauthorised access to your account. Where
            required by the NDPA, we will notify the Nigeria Data
            Protection Commission (NDPC) and affected users of a
            personal data breach.
          </p>
        </Section>

        {/* 8. Data Retention */}
        <Section number="8" title="Data Retention">
          <p>
            We keep your data only as long as needed for the purposes
            in this policy and to meet legal obligations.
          </p>

          <div className="overflow-x-auto mt-5">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead>
                <tr className="bg-[#F3F4FF] text-[#333333]">
                  <th className="p-4 font-semibold">Type of data</th>
                  <th className="p-4 font-semibold">
                    How long we keep it
                  </th>
                </tr>
              </thead>

              <tbody>
                {retentionData.map((item) => (
                  <tr key={item.type} className="border-b border-gray-200">
                    <td className="p-4 font-medium text-[#333333]">
                      {item.type}
                    </td>
                    <td className="p-4 text-gray-600">
                      {item.duration}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-5">
            You can ask us to delete your account at any time. We may
            still keep health data in anonymised form where the law
            requires it.
          </p>
        </Section>

        {/* 9. Your Rights */}
        <Section number="9" title="Your Rights">
          <p>Under the NDPA 2023, you have the right to:</p>

          <InfoCards items={privacyRights} />

          <p className="mt-5">
            To exercise any of these rights, email{" "}
            <a
              href="mailto:privacy@medicpadi.com"
              className="text-[#150D5E] underline"
            >
              privacy@medicpadi.com
            </a>
            . We will respond within 30 days.
          </p>
        </Section>

        {/* 10. Children's Privacy */}
        <Section number="10" title="Children's Privacy">
          <p>
            Medicpadi is not intended for users under 18. For a minor,
            a parent or legal guardian must create and manage the
            account and consent to the processing of the child's
            health data.
          </p>
        </Section>

        {/* 11. International Transfers */}
        <Section number="11" title="International Transfers">
          <p>
            Your data is primarily stored in Nigeria. If it is
            transferred outside Nigeria, for example to cloud servers
            abroad, we put adequate safeguards in place as the NDPA
            requires and, where needed, obtain your consent.
          </p>
        </Section>

        {/* 12. Cookies */}
        <Section number="12" title="Cookies">
          <p>
            We use essential cookies to make the Platform work, for
            example to keep you logged in, and analytical cookies to
            understand and improve our service. You can manage or
            block cookies in your browser or app settings. Blocking
            essential cookies may stop parts of the Platform from
            working.
          </p>
        </Section>

        {/* 13. Changes to This Policy */}
        <Section number="13" title="Changes to This Policy">
          <p>
            We may update this policy from time to time. We will
            notify you of material changes by email or in-app
            notification at least 30 days before they take effect.
            The "Last updated" date at the top of this page shows
            when the policy was last revised.
          </p>
        </Section>

        {/* 14. Contact Us */}
        <Section number="14" title="Contact Us">
          <p>
            For questions, complaints or data requests, contact us:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mt-5">
            <div className="bg-[#F3F4FF] rounded-xl p-5">
              <h3 className="font-semibold text-[#333333] mb-2">
                Privacy
              </h3>
              <a
                href="mailto:privacy@medicpadi.com"
                className="text-sm text-[#150D5E] underline"
              >
                privacy@medicpadi.com
              </a>
            </div>

            <div className="bg-[#F3F4FF] rounded-xl p-5">
              <h3 className="font-semibold text-[#333333] mb-2">
                Support
              </h3>
              <a
                href="mailto:support@medicpadi.com"
                className="text-sm text-[#150D5E] underline"
              >
                support@medicpadi.com
              </a>
            </div>

            <div className="bg-[#F3F4FF] rounded-xl p-5">
              <h3 className="font-semibold text-[#333333] mb-2">
                Data Protection Officer
              </h3>
              <a
                href="mailto:dpo@medicpadi.com"
                className="text-sm text-[#150D5E] underline"
              >
                dpo@medicpadi.com
              </a>
            </div>

            <div className="bg-[#F3F4FF] rounded-xl p-5">
              <h3 className="font-semibold text-[#333333] mb-2">
                Address
              </h3>
              <p className="text-sm text-gray-600">
                (Insert Medicpadi Office Address, Lagos, Nigeria)
              </p>
            </div>

            <div className="bg-[#F3F4FF] rounded-xl p-5">
              <h3 className="font-semibold text-[#333333] mb-2">
                Phone
              </h3>
              <p className="text-sm text-gray-600">
                (Insert phone number)
              </p>
            </div>
          </div>
        </Section>

      </div>
    </DashboardLayout>
  );
}
