export function HeroSection() {
  return (
    <section className="px-6 py-12 bg-green-50">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl font-bold text-green-800 mb-6 leading-tight">
            Your Smart Farming Assistant
          </h1>
          <p className="text-gray-700 text-lg mb-8 leading-relaxed">
            Get crop advice, fertilizer guidance, and disease detection – all in
            one
            <br />
            loreepsum lloreeepsum in llorepsum lore lorepsum
          </p>
          <button className="px-8 py-3 text-white font-semibold rounded-lg bg-[#4caf50] hover:bg-[#45a049] transition-colors">
            Get Start
          </button>
        </div>

        <div className="relative">
          <img
            src="/farmer-phone-icons.png"
            alt="Smart farming illustration showing farmer with phone and agricultural icons"
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}
