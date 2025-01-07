export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-indigo-50 p-8">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Find a Food Pantry Near You</h1>
      <p className="mt-6 text-lg leading-8 text-gray-600 text-center max-w-2xl">
        Text your zipcode to XXX-XXX-XXXX to see food pantries near you, or HELP for instructions on subscribing to real-time updates about food resources in your area!
      </p>
      <div className="p-6 max-w-lg w-full text-center">
        <a
          href="/about"
          className="text-center text-sm font-semibold leading-4 text-gray-900">Learn more<span aria-hidden="true">→</span></a>
      </div>
    </div>
  );
}
