export default function Privacy() {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-slate-50 via-emerald-50/30 to-slate-100 dark:from-slate-950 dark:via-emerald-950/20 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-orbitron font-bold mb-8 text-slate-900 dark:text-white">Privacy Policy</h1>
        
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 space-y-6 text-slate-600 dark:text-slate-300">
          <p className="text-sm">Last updated: {new Date().toLocaleDateString()}</p>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Information We Collect</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Personal Information:</strong> Name, email, phone number, shipping address</li>
              <li><strong>Payment Information:</strong> Processed securely through payment gateways</li>
              <li><strong>Usage Data:</strong> IP address, browser type, pages visited</li>
              <li><strong>Cookies:</strong> For better user experience and analytics</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Process and fulfill your orders</li>
              <li>Send order updates and shipping notifications</li>
              <li>Provide customer support</li>
              <li>Send promotional emails (with your consent)</li>
              <li>Improve our website and services</li>
              <li>Prevent fraud and ensure security</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Data Security</h2>
            <p>We implement industry-standard security measures to protect your data:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>SSL encryption for all transactions</li>
              <li>Secure database storage</li>
              <li>Regular security audits</li>
              <li>Limited employee access to personal data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Data Sharing</h2>
            <p className="mb-2">We do NOT sell your personal information. We may share data with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Shipping partners (for delivery)</li>
              <li>Payment processors (for transactions)</li>
              <li>Legal authorities (if required by law)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Access your personal data</li>
              <li>Request data correction or deletion</li>
              <li>Opt-out of marketing emails</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Cookies</h2>
            <p>We use cookies to enhance your experience. You can disable cookies in your browser settings, but some features may not work properly.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Contact Us</h2>
            <p>For privacy concerns, email us at <a href="mailto:privacy@hackibits.com" className="text-emerald-600 dark:text-emerald-400 hover:underline">privacy@hackibits.com</a></p>
          </section>
        </div>
      </div>
    </div>
  );
}
