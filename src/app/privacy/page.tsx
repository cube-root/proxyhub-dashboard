"use client";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white p-4 dark:bg-gray-900 text-gray-900 dark:text-white sm:p-6 md:p-8">
      <main className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

        <section className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-3">
              Our Commitment to Privacy
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              ProxyHub is committed to protecting your privacy. We do not
              collect, store, or process any personal information through our
              proxy services. Our platform is designed to maintain your
              anonymity while managing proxy configurations.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Analytics Usage</h2>
            <p className="text-gray-600 dark:text-gray-300">
              We use Google Analytics with IP anonymization enabled to
              understand general usage patterns of our dashboard. The analytics
              data is strictly limited to:
            </p>
            <ul className="list-disc pl-6 mt-2 text-gray-600 dark:text-gray-300">
              <li>Page views and navigation patterns</li>
              <li>Browser type and device category</li>
              <li>Geographic region (country-level only)</li>
              <li>Session duration and feature interaction</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">
              Proxy Configuration Data
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Any proxy configuration data you input is processed locally and is
              not stored on our servers. We maintain a strict no-logs policy for
              all proxy-related activities.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Data Security</h2>
            <p className="text-gray-600 dark:text-gray-300">
              We implement industry-standard security measures to protect. All
              communications between your browser and our services are encrypted
              using HTTPS.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">
              Limitation of Liability
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              While we strive to protect your privacy and maintain the security
              of our services, ProxyHub is provided "as is" without
              any warranties of any kind. We are not liable for any damages,
              losses, or consequences that may arise from the use of our
              services, including but not limited to:
            </p>
            <ul className="list-disc pl-6 mt-2 text-gray-600 dark:text-gray-300">
              <li>Technical issues or service interruptions</li>
              <li>Data breaches or security incidents beyond our control</li>
              <li>Misuse of the proxy services by users</li>
              <li>
                Third-party actions or content accessed through our services
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Contact</h2>
            <p className="text-gray-600 dark:text-gray-300">
              If you have any questions about our privacy practices, please
              contact us through our GitHub repository.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}