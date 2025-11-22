import React from 'react'
import { useModeState } from '../store/mode.store'

const Privacy = () => {
    const darkmode = useModeState((s) => s.darkmode)
    const backdarkmode = useModeState((s) => s.backdarkmode)

    return (
        <div style={{ color: darkmode, backgroundColor: backdarkmode, padding: 24, minHeight: '80vh' }}>
            <h1>Privacy Policy</h1>

            <p>
                Effective Date: November 22, 2025
            </p>

            <p>
                This Privacy Policy describes how we collect, use, disclose, and protect personal information
                when you use the application (the “App”). By using the App you agree to the collection and use
                of information in accordance with this policy.
            </p>

            <h2>1. Information We Collect</h2>
            <p>We collect the following types of information:</p>
            <ul>
                <li>
                    <strong>Account Information:</strong> information you provide when creating an account,
                    such as name, email address, profile picture and other profile fields.
                </li>
                <li>
                    <strong>User Content:</strong> any content you create, upload or post through the App (for
                    example: listings, images, messages).
                </li>
                <li>
                    <strong>Usage Data:</strong> information about how you use the App, including pages visited,
                    search queries, and actions performed. We collect this via server logs and analytics tools.
                </li>
                <li>
                    <strong>Device & Network Information:</strong> device model, operating system, IP address,
                    browser type, and mobile advertising identifiers when applicable.
                </li>
                <li>
                    <strong>Location Data:</strong> where you permit location access for features such as
                    searching nearby listings, we may collect location data (approximate or precise) from your device.
                </li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <ul>
                <li>Provide, maintain and improve the App and its features.</li>
                <li>Process uploads and display your listings and profile information.</li>
                <li>Communicate with you about account activity, support requests, and legal notices.</li>
                <li>Analyze usage patterns to optimize performance and user experience.</li>
                <li>Detect, prevent and address technical issues and security incidents.</li>
            </ul>

            <h2>3. Legal Basis (where required)</h2>
            <p>
                If you are located in the European Economic Area (EEA), we only process your personal data
                when we have a legal basis to do so — for example to perform our contract with you, to comply
                with a legal obligation, to protect vital interests, to perform a task carried out in the
                public interest, or where we have a legitimate interest which is not overridden by your rights.
            </p>

            <h2>4. Sharing and Disclosure</h2>
            <ul>
                <li>Service providers: we share data with vendors that perform services on our behalf (hosting, storage, analytics).</li>
                <li>Legal requests: we may disclose information to comply with applicable laws or lawful requests by public authorities.</li>
                <li>Business transfers: if we are involved in a merger, acquisition or asset sale, user data may be transferred.</li>
            </ul>

            <h2>5. Third-Party Services</h2>
            <p>
                The App may use third-party SDKs and services (for example: cloud storage providers, analytics,
                crash reporting). Those services have their own privacy policies; please review them. We are
                not responsible for their processing activities.
            </p>

            <h2>6. Play Store / Google Play Policy Disclosures</h2>
            <p>
                If the App is distributed via Google Play, the following disclosures apply:
            </p>
            <ul>
                <li>
                    <strong>Data Collection & Use:</strong> The App collects personal and device data listed above
                    to provide core functionality (accounts, listings, uploads) and analytics/diagnostics.
                </li>
                <li>
                    <strong>Advertising & Identifiers:</strong> If the App uses advertising or analytics that rely on
                    advertising identifiers (such as Google Advertising ID), those identifiers are used to deliver
                    personalized ads and measure ad performance. Users can reset advertising IDs or opt out of
                    personalized ads at the device level.
                </li>
                <li>
                    <strong>Data Safety Form:</strong> Where required by Google Play, we will complete and maintain
                    the Play Console Data Safety form accurately reflecting the data collected and its purposes.
                </li>
                <li>
                    <strong>Children:</strong> If the App is directed to children under 13 (or applicable age), we
                    will comply with COPPA and Google Play policies for children. The App is not intended for children
                    unless explicitly stated.
                </li>
            </ul>

            <h2>7. Data Retention</h2>
            <p>
                We retain personal data only as long as necessary to provide the App and fulfill the purposes
                described in this policy. When data is no longer needed, we delete or anonymize it unless a
                longer retention period is required by law.
            </p>

            <h2>8. Security</h2>
            <p>
                We implement reasonable technical and organizational measures to protect personal information
                from accidental loss, misuse, and unauthorized access, disclosure, alteration and destruction.
                However, no method of transmission over the internet or electronic storage is 100% secure.
            </p>

            <h2>9. Your Rights</h2>
            <p>
                Depending on your location, you may have rights to access, correct, delete or export your personal
                data, and to restrict or object to certain processing. To exercise these rights, contact us using
                the contact details below. We may ask you to verify your identity before responding.
            </p>

            <h2>10. International Transfers</h2>
            <p>
                The App may transfer personal data to countries with different data protection laws. Where required,
                we rely on appropriate safeguards (e.g., standard contractual clauses) to protect your information.
            </p>

            <h2>11. Children</h2>
            <p>
                The App is not intended for children under the age of 13 (or applicable local age). We do not knowingly
                collect personal data from children without parental consent. If you believe we have collected data from
                a child, contact us to request deletion.
            </p>

            <h2>12. Changes to This Policy</h2>
            <p>
                We may update this Privacy Policy from time to time. We will post the updated policy with a new
                effective date. Continued use of the App after such changes constitutes acceptance of the new policy.
            </p>

            <h2>13. Contact</h2>
            <p>
                For questions, requests or privacy concerns, please contact: beshaneh@gmail.com.
            </p>

            <p>
                Note: This policy is a template and does not constitute legal advice. Depending on the jurisdictions
                where you operate or your specific data processing activities, you should consult a lawyer to
                ensure full compliance with applicable laws (for example: GDPR, CCPA, COPPA and local regulations).
            </p>
        </div>
    )
}

export default Privacy
