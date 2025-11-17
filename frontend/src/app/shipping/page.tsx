export default function Shipping() {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-slate-50 via-emerald-50/30 to-slate-100 dark:from-slate-950 dark:via-emerald-950/20 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-orbitron font-bold mb-8 text-slate-900 dark:text-white">Shipping Policy</h1>
        
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 space-y-6 text-slate-600 dark:text-slate-300">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Shipping Coverage</h2>
            <p>We currently ship across India. International shipping coming soon!</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Delivery Time</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Metro Cities:</strong> 3-5 business days</li>
              <li><strong>Other Cities:</strong> 5-7 business days</li>
              <li><strong>Remote Areas:</strong> 7-10 business days</li>
            </ul>
            <p className="mt-4 text-sm">*Delivery times may vary during peak seasons or due to unforeseen circumstances.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Shipping Charges</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Free shipping on orders above ₹2,000</li>
              <li>₹99 flat shipping fee for orders below ₹2,000</li>
              <li>Beta users get free shipping on first order</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Order Tracking</h2>
            <p>Once shipped, you'll receive:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Email with tracking number</li>
              <li>SMS updates on delivery status</li>
              <li>Real-time tracking on our website</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Packaging</h2>
            <p>All products are securely packaged to prevent damage during transit. We use eco-friendly packaging materials wherever possible.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Delivery Issues</h2>
            <p>If you face any delivery issues:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Contact us within 24 hours of expected delivery</li>
              <li>Email: support@hackibits.com</li>
              <li>We'll resolve the issue or arrange re-delivery</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
