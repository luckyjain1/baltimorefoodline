export default function AboutPage() {
  return (
    <div className="container">
      <h1 className="page-title">About Baltimore Foodline</h1>
      <p className="body">
        Baltimore Foodline is dedicated to bridging the gap between Baltimore residents 
        and essential food resources. By providing updates directly to your phone, we aim 
        to make food access simpler and more reliable.
      </p>

      <h2 className="section-title">Our Partners</h2>
        <ul  className="list-none">
          <li>Manna House</li>
          <li>Spirit of Faith Food Pantry</li>
          <li>The Church of the Redeemed of the Lord</li>
          <li>Donald Bentley Food Pantry</li>
          <li>... and many more!</li>
        </ul>

      <h2 className="section-title">Our Team</h2>
        <p className="body">
          This project was brought to life by Shreya, Megan, and Lucky, members of the 
          Volunteers for Medical Engineering club at Johns Hopkins University. We are 
          passionate about improving food access in Baltimore.
        </p>

      <p className="body">
          Interested in partnering with us? We would love to hear from you!
        </p>
        <a
          href="/contact"
          className="btn">Partner With Us</a>
      </div>
  );
}
