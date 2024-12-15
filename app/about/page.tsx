export default function AboutPage() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">About Us</h1>
        <p className="text-lg text-gray-600 text-center max-w-2xl">
          Welcome to Baltimore Food Line. We are a community-driven initiative dedicated to
          connecting individuals and families in Baltimore to essential food resources.
          Our mission is to ensure that no one in our city goes hungry by streamlining
          access to food banks and nourishment programs.
        </p>
        <p className="text-lg text-gray-600 text-center max-w-2xl mt-4">
          Through technology, we make it easier for those in need to connect with resources,
          and for food banks to distribute their offerings efficiently. Together, we can
          create a stronger, more nourished community.
        </p>
      </div>
    );
  }
  