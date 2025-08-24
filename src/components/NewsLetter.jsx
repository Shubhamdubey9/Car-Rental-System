import React from 'react'
import Titlle from './Titlle';
import Testimonial from './Testimonial';

const NewsLetter = () => {
  return (
    <div className=" flex flex-col items-center py-24 px-5 md:px-16 lg:px-24 xl:px-32">
      <div className='max-w-7xl mx-auto mb-7'>
        <Titlle
          title="What Our Customers Say"
          subTitle="Discover why discerning travelers choose StayVenture for their luxury accommodations around the world."
          className="text-2xl text-black"
        />
      </div>
      <div>
        <Testimonial />
      </div>
    </div>
  );
}

export default NewsLetter