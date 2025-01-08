SETUP
# Baltimore Foodline

## Overview
The Baltimore Foodline is a platform designed to improve access to food resources in Baltimore by connecting individuals to nearby food banks. Users can:

- Get updates on local food pantries via text messages.
- Search for food resources by zip code.
- Pantries can send updates such as closures or special events.

This project is built using **Node.js**, **Next.js**, **Vercel**, and **MySQL**.

---

## Features
- **Home Page:** Displays the mission statement and information about the platform.
- **About Page:** Includes partner information.
- **Contact Page:** A form for new food pantries to sign up.
- **Dashboard:** Allows food pantries to update their info and send messages.
- **Database:** Stores food pantry details like name, location, hours, and contact info.

---

## Getting Started

### Prerequisites
Ensure you have the following installed:

1. **Node.js** (v18.x or higher)
   - [Download Node.js](https://nodejs.org/)
2. **MySQL**
   - Install MySQL:
     ```bash
     # MacOS
     brew install mysql

     # Ubuntu
     sudo apt install mysql-server
     ```

3. **Vercel CLI** (optional, for deployment)
   - Install Vercel CLI:
     ```bash
     npm install -g vercel
     ```

---

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/luckyjain1/baltimorefoodline.git
   cd baltimore-foodline
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

5. **Start the development server**:
   ```bash
   npm run dev
   ```
   The application will be available at [http://localhost:3000](http://localhost:3000).

---

## Deployment (optional)

To deploy the project on Vercel:

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy the project:
   ```bash
   vercel
   ```

---

## Contact
If you have any questions or suggestions, feel free to contact us:

- Email: baltimorefoodline@gmail.com
- Website: [Baltimore Foodline](https://baltimorefoodline.vercel.app/)
