export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-indigo-50 p-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">About Baltimore Foodline</h1>
      <p className="text-lg text-gray-700 text-center max-w-2xl mb-8">
        Baltimore Foodline is dedicated to bridging the gap between Baltimore residents 
        and essential food resources. By providing updates directly to your phone, we aim 
        to make food access simpler and more reliable.
      </p>

      {/* Partners Section */}
      <div className="bg-white shadow-md rounded-lg p-6 max-w-lg w-full mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Partners</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Manna House</li>
          <li>Spirit of Faith Food Pantry</li>
          <li>The Church of the Redeemed of the Lord</li>
          <li>Donald Bentley Food Pantry</li>
          <li>... and many more!</li>
        </ul>
      </div>

      {/* Credit Section */}
      <div className="bg-white shadow-md rounded-lg p-6 max-w-lg w-full mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Team</h2>
        <p className="text-gray-700">
          This project was brought to life by Shreya, Megan, and Lucky, members of the 
          Volunteers for Medical Engineering club at Johns Hopkins University. We are 
          passionate about improving food access in Baltimore.
        </p>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <p className="text-gray-700 mb-4">
          Interested in partnering with us? We would love to hear from you!
        </p>
        <a
          href="/contact"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Partner With Us
        </a>
      </div>
    </div>
  );
}
