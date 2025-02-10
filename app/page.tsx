export default function HomePage() {
  return (
    <div className="text-left relative">
      {/* Hero Section */}
      <div className = "m-[100px]">
      <h1 className="font-bold text-[#1B5E20] text-[60px] leading-none mb-6 max-w-[500px]">Find a Food Pantry Near You</h1>
      <h2 className="font-normal text-[#1f2937] text-[18px] max-w-[500px] mb-4">
        Text your zipcode to XXX-XXX-XXXX to see food pantries near you, or HELP for instructions 
        on subscribing to real-time updates about food resources in your area!
      </h2>
      <a
        href="/about"
        className="inline-block text-[1rem] font-bold py-4 px-8 text-white bg-[#1B5E20] rounded-[2rem] cursor-pointer text-center mb-8">
        Learn more →
      </a>
      <div className="float-right relative -top-[350px] ml-[40px]">
        <img
          src="./cover_image.jpg"
          alt="Cover Image"
          className="w-[500px] h-auto rounded-lg"
        />
      </div>  
    </div>
    {/* Full-Width Mission and Team Section */}
    <div className="bg-[#1B5E20] text-white py-6">
      <div className="px-[100px]">
        {/* Mission Section */}
        <div className="flex justify-between items-center w-full">
          {/* Mission Text on the Left */}
          <div className="w-1/2"> 
            <h2 className="text-3xl font-bold mb-3">Mission</h2>
            <p className="text-lg leading-relaxed">
              Baltimore Foodline is dedicated to bridging the gap between Baltimore residents 
              and essential food resources. By providing updates directly to your phone, we aim 
              to make food access simpler and more reliable.
            </p>
          </div>
          {/* Button on the Right (Now Aligned Further Right) */}
          <a
            href="/contact"
            className="text-[1rem] font-bold py-4 px-8 bg-white text-[#1B5E20] rounded-[2rem] cursor-pointer text-center hover:bg-gray-100">
            Partner With Us →
          </a>
        </div>
      </div>
    </div>
      {/* Our Team Section */}
      <div className="mt-8">
        <h2 className="text-3xl font-bold mb-3">Our Team</h2>
        <p className="text-lg leading-relaxed">
          This project was brought to life by Shreya, Megan, and Lucky, members of the 
          Volunteers for Medical Engineering club at Johns Hopkins University.
        </p>
      </div>
    </div>
  )}