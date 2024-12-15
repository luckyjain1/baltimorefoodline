export default function Dashboard() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
  
        {/* Welcome Message */}
        <p className="text-lg text-gray-600 mb-8">
          Welcome to your dashboard! Here you can manage your SMS communications.
        </p>
  
        {/* Placeholder for Actions */}
        <div className="w-full max-w-md bg-white shadow-md rounded p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Send SMS</h2>
          <p className="text-gray-500 mb-6">This is where the SMS form will go.</p>
  
          {/* Placeholder Buttons */}
          <button className="w-full bg-blue-500 text-white py-2 rounded cursor-not-allowed">
            Send SMS
          </button>
          <button className="w-full bg-gray-300 text-gray-600 py-2 mt-4 rounded cursor-not-allowed">
            View Sent Messages
          </button>
        </div>
      </div>
    );
  }
  