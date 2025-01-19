import React from 'react';
import StringsProvider from '@/app/context/StringsProvider';

const Home: React.FC = () => {
  return (
    <StringsProvider>
      <div>
        <div>
          a pff platform
        </div>
        <h1>
          Teaching Poets Collective
        </h1>
        <h2>About                           Teaching
          Poets
          Collective
        </h2>
        <p>Our goal is to make poetry education and community open to all—and fucking fun!
        </p>
        <p>Founded in 2025 by the PFFs, Teaching Poets Collective is a free, accessible online platform, community, and resource hub where all poets and writers are welcome to teach and learn.</p>
        <h2>
          Our Platform
        </h2>
        <h3>
          What we offer
        </h3>
        <div>
          <ul>
            <li>Online sign-up system including easy registration for class participants
            </li>
            <li>Listing in our community class calendar
            </li>
            <li>Promotion on our social media
            </li>
            <li>Access to a community of fellow teaching artists
            </li>
          </ul>
        </div>
        <h3>
          What you need to bring
        </h3>
        <ul>
          <li>Your class, duh!
          </li>
          <li>Your own teaching assistant or tech support, if needed
          </li>
          <li>A Paypal account, if you want to charge for your class
          </li>
        </ul>

        <button className="btn btn-accent btn-outline">JOIN HERE!</button>







      </div>
    </StringsProvider>
  );
};

export default Home;