export default function RefundPolicy() {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-slate-50 via-emerald-50/30 to-slate-100 dark:from-slate-950 dark:via-emerald-950/20 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-orbitron font-bold mb-8 text-slate-900 dark:text-white">Cancellation & Refund Policy</h1>
        
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 space-y-6 text-slate-600 dark:text-slate-300">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Cancellation Policy</h2>
            <p className="mb-4">Orders can be cancelled within 24 hours of placement for a full refund. After 24 hours, cancellation may not be possible if the order has been shipped.</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Contact us immediately at support@hackibits.com to cancel</li>
              <li>Provide your order ID and reason for cancellation</li>
              <li>Cancellation requests are processed within 1-2 business days</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Refund Policy</h2>
            <p className="mb-4">We offer refunds under the following conditions:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Defective Products:</strong> Full refund or replacement within 7 days of delivery</li>
              <li><strong>Wrong Item Delivered:</strong> Full refund or correct item shipped at no cost</li>
              <li><strong>Order Cancellation:</strong> Full refund if cancelled within 24 hours</li>
              <li><strong>Non-Delivery:</strong> Full refund if product not delivered within 15 days</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Refund Process</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Contact our support team with order details and issue</li>
              <li>Return the product (if applicable) in original packaging</li>
              <li>Refund will be processed within 7-10 business days</li>
              <li>Amount will be credited to original payment method</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Non-Refundable Items</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Products damaged due to misuse or mishandling</li>
              <li>Items without original packaging or accessories</li>
              <li>Products used beyond testing period</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Contact Us</h2>
            <p>For cancellations or refunds, email us at <a href="mailto:support@hackibits.com" className="text-emerald-600 dark:text-emerald-400 hover:underline">support@hackibits.com</a></p>
          </section>
        </div>
      </div>
    </div>
  );
}
