import React from "react";
import { Link } from "react-router-dom";

export default function LandPage() {
  return (
    <>
      {/* Hero section - matches navbar colors */}
      <section className="bg-gray-800  py-20">
        <div className="container mx-auto pt-4 px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-white font-bold text-5xl leading-tight mb-6">
                Delicious meals delivered to your door
              </h1>
              <p className="text-white text-xl mb-8">
                From our kitchen to your table - fresh, hot, and ready in
                minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to={"/home"}>
                  <button className="px-6 py-3 bg-amber-300 text-gray-800 font-bold rounded-full hover:bg-amber-400 transition duration-200 text-center">
                    Order Now
                  </button>
                </Link>
                <a
                  href="#"
                  className="px-6 py-3 border-2 border-amber-300 text-amber-300 font-bold rounded-full hover:bg-amber-300 hover:text-gray-800 transition duration-200 text-center"
                >
                  Download App
                </a>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
                alt="Delicious food"
                className="w-full rounded-lg shadow-2xl border-2 border-amber-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured section */}
      <section className="py-20 bg-gray-100" id="menu">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Our Popular Dishes
            </h2>
            <div className="w-20 h-1 bg-amber-300 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
  <div>
    <img src="/dish1.jpg" alt="Pizza" className="w-40 h-40 rounded-full object-cover shadow-md hover:scale-105 transition mx-auto" />
    <p className="mt-2 text-lg font-semibold text-gray-800">Pizza</p>
  </div>
  <div>
    <img src="/dish2.jpeg" alt="Biriyani" className="w-40 h-40 rounded-full object-cover shadow-md hover:scale-105 transition mx-auto" />
    <p className="mt-2 text-lg font-semibold text-gray-800">Biriyani</p>
  </div>
  <div>
    <img src="/dish3.jpeg" alt="Burger" className="w-40 h-40 rounded-full object-cover shadow-md hover:scale-105 transition mx-auto" />
    <p className="mt-2 text-lg font-semibold text-gray-800">Burger</p>
  </div>
  <div>
    <img src="/dish4.jpeg" alt="Shawarma" className="w-40 h-40 rounded-full object-cover shadow-md hover:scale-105 transition mx-auto" />
    <p className="mt-2 text-lg font-semibold text-gray-800">Shawarma</p>
  </div>
</div>

          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-gray-800 text-amber-300 font-bold rounded-full hover:bg-gray-700 transition duration-200 inline-block">
              Taste Now
            </button>
          </div>
        </div>
      </section>

      {/* How it works section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-2">How It Works</h2>
            <div className="w-20 h-1 bg-amber-300 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gray-700 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-amber-300 text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Choose Your Food
              </h3>
              <p className="text-gray-300">
                Browse our menu and select your favorite dishes
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gray-700 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-amber-300 text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Delivery or Pickup
              </h3>
              <p className="text-gray-300">
                Choose delivery to your door or pickup at our location
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gray-700 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-amber-300 text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Enjoy Your Meal
              </h3>
              <p className="text-gray-300">
                Fresh, delicious food prepared just for you
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-amber-300">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Ready to order your favorite meal?
          </h2>
          <p className="text-gray-800 text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers enjoying our delicious food
            delivery service.
          </p>
          <Link to={"/home"}>
            <button className="px-8 py-3 bg-gray-800 text-amber-300 font-bold rounded-full hover:bg-gray-700 transition duration-200 inline-block">
              Get Started Now
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}
