export function TestimonialCard({ testimonial }) {
  return (
    <div className="relative">
      <div className="bg-white rounded-2xl shadow-lg p-6 relative hover:shadow-xl transition-shadow">
        <div className="p-0 text-center">
          <div className="w-16 h-16 rounded-full mx-auto mb-4 overflow-hidden">
            <img
              src={testimonial.avatar || "/placeholder.svg"}
              alt={`${testimonial.name} profile`}
              className="w-full h-full object-cover"
            />
          </div>
          <h4 className="font-semibold text-black mb-1">{testimonial.name}</h4>
          <p className="text-gray-500 text-sm mb-4">{testimonial.role}</p>
          <div className="text-2xl text-gray-400 mb-2">"</div>
          <p className="text-gray-600 text-sm leading-relaxed">
            {testimonial.content}
          </p>
        </div>
      </div>

      {/* Speech bubble tail */}
      <div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0"
        style={{
          borderLeft: "20px solid transparent",
          borderRight: "20px solid transparent",
          borderTop: "20px solid white",
        }}
      />
    </div>
  );
}
