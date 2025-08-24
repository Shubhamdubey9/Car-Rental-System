import React from "react";

const Testimonial = () => {
  const testimonials = [
    {
      id: 1,
      name: "Donald Jackman",
      title: "Content Creator",
      img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
    },
    {
      id: 2,
      name: "Richard Nelson",
      title: "Instagram Influencer",
      img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
    },
    {
      id: 3,
      name: "James Washington",
      title: "Marketing Manager",
      img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
    },
  ];

  const renderStars = () => (
    <div className="flex gap-0.5">
      {Array(5)
        .fill(0)
        .map((_, idx) => (
          <svg
            key={idx}
            width="18"
            height="18"
            viewBox="0 0 22 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z"
              fill="#FF532E"
            />
          </svg>
        ))}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto py-14 px-4 flex flex-wrap items-center justify-center gap-16 bg-gray-50">
      {testimonials.map((item) => (
        <div
          key={item.id}
          className="text-sm w-80 border border-gray-500/30 pb-6 rounded-lg bg-white shadow-[0px_4px_15px_0px] shadow-black/5"
        >
          <div className="flex flex-col items-center px-5 py-4 relative">
            <img
              className="h-24 w-24 absolute -top-14 rounded-full object-cover border-4 border-white shadow"
              src={item.img}
              alt={`${item.name} profile`}
            />
            <div className="pt-8 text-center">
              <h1 className="text-lg font-medium text-gray-800">{item.name}</h1>
              <p className="text-gray-800/80">{item.title}</p>
            </div>
          </div>
          <p className="text-gray-500 px-6 text-center">
            I've been using Imagify for nearly two years, primarily for
            Instagram, and it has been incredibly user-friendly, making my work
            much easier.
          </p>
          <div className="flex justify-center pt-4">{renderStars()}</div>
        </div>
      ))}
    </div>
  );
};

export default Testimonial;
