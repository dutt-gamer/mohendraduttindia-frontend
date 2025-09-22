import React from "react";
import Apurba from "../assets/Apurba.jpg";
import bgUmb from "../assets/bg-umb.jpg";

const AboutUs = () => {
  return (
    <section
      className="bg-cover bg-center bg-no-repeat py-20 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `url(${bgUmb})`,
      }}
    >
      <div className="max-w-4xl mx-auto text-gray-600">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-cyan-900 mb-12">
          Our Legacy
        </h1>

        <div className="space-y-6 text-base sm:text-lg leading-relaxed bg-white/65 p-6 sm:p-10 rounded-lg shadow-xl">
          <p>
            At <span className="font-semibold"> Mohendra Dutt India</span>, we
            don’t just make umbrellas — we carry forward a story that began
            nearly a century and a half ago. Our roots trace back to
            <span className="font-semibold"> 1882 in Calcutta (now Kolkata)</span>, 
            when our great-great-grandfather,
            <span className="font-semibold"> Shri Mohendra Lal Dutt</span>,
            envisioned and created high-quality umbrellas that could withstand the
            test of time and weather.
          </p>

          <p>
            During that time, quality umbrellas were considered a symbol of status,
            mostly used by the British elite in colonial India. But Shri Mohendra
            Lal Dutt took a bold pledge — to bring that same level of quality to the
            common Indian people who braved the rains without any protection. His
            vision made the umbrella not just a style icon, but a symbol of dignity
            and accessibility.
          </p>

          <p>
            His attention to detail and belief in quality quickly gained
            recognition, and as the family grew, so did the business. Over time, it
            branched into
            <span className="font-semibold"> five distinct lineages</span>, each
            built on the same values of dedication, craftsmanship, and pride. One of
            these branches eventually made its journey to the Northeast — a
            significant turning point in our legacy.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-2">
            <img
              className="w-[40vw] sm:w-30 rounded-lg"
              src={Apurba}
              alt="Shri Apurba Kumar Dutt"
            />
            <p>
              In <span className="font-semibold"> 1959</span>, our late grandfather,
              <span className="font-semibold"> Shri Apurba Kumar Dutt</span>, brought
              the craft to <span className="font-semibold"> Guwahati</span>, 
              establishing what would become the northeastern chapter of our
              legacy — <span className="font-semibold"> Mohendra Dutt India</span>.
              With bare hands, strong values, and a vision for future generations, he
              built a manufacturing unit that still operates today.
            </p>
          </div>

          <p>
            From those humble beginnings, we have grown to become a trusted name,
            known for umbrellas that combine style, strength, and soul. Our products
            are not just tools — they are trusted companions through the monsoons,
            symbols of reliability, and reflections of our family’s legacy.
          </p>

          <p>
            Now led by the next generation,
            <span className="font-semibold"> Mohendra Dutt India</span> continues to
            evolve. While we honor the craftsmanship of our ancestors, we also
            embrace modern design, sustainable practices, and customer-centric
            values. We are proud to be a brand that balances heritage with
            innovation.
          </p>

          <p className="text-center font-medium text-blue-600 mt-10 text-lg">
            Mohendra Dutt India — Proudly crafting umbrellas since 1882.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
