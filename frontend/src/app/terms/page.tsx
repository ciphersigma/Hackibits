export default function Terms() {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-slate-50 via-emerald-50/30 to-slate-100 dark:from-slate-950 dark:via-emerald-950/20 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-orbitron font-bold mb-8 text-slate-900 dark:text-white">Terms and Conditions</h1>
        
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 space-y-6 text-slate-600 dark:text-slate-300">
          <p className="text-sm">Last updated: {new Date().toLocaleDateString()}</p>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">1. Acceptance of Terms</h2>
            <p>By accessing and using HackiBits website and services, you accept and agree to be bound by these Terms and Conditions.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">2. Use of Products</h2>
            <p className="mb-4">Our cybersecurity hardware products are intended for:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Educational purposes only</li>
              <li>Ethical hacking and security research</li>
              <li>Authorized penetration testing</li>
              <li>Personal learning and skill development</li>
            </ul>
            <p className="mt-4 font-semibold text-red-600 dark:text-red-400">Unauthorized or illegal use of our products is strictly prohibited.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">3. User Responsibilities</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>You must be 18 years or older to purchase</li>
              <li>Use products only on systems you own or have permission to test</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Not use products for malicious purposes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">4. Intellectual Property</h2>
            <p>All content, designs, and materials on HackiBits are protected by copyright and intellectual property laws.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">5. Limitation of Liability</h2>
            <p>HackiBits is not liable for any misuse of products or damages resulting from unauthorized use.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">6. Privacy</h2>
            <p>Your use of our services is also governed by our Privacy Policy.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">7. Changes to Terms</h2>
            <p>We reserve the right to modify these terms at any time. Continued use constitutes acceptance of updated terms.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">8. Contact</h2>
            <p>Questions? Email us at <a href="mailto:legal@hackibits.com" className="text-emerald-600 dark:text-emerald-400 hover:underline">legal@hackibits.com</a></p>
          </section>
        </div>
      </div>
    </div>
  );
}
