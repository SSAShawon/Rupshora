
const galleryImages = [
  {
    image:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=900&q=85",
    title: "Community Volunteering",
    category: "Volunteer Activities",
    size: "large",
  },
  {
    image:
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=900&q=85",
    title: "Helping Together",
    category: "Community Support",
    size: "normal",
  },
  {
    image:
      "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=900&q=85",
    title: "Making a Difference",
    category: "Social Development",
    size: "normal",
  },
  {
    image:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=900&q=85",
    title: "Food Distribution",
    category: "Humanitarian Support",
    size: "normal",
  },
  {
    image:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=900&q=85",
    title: "Together We Grow",
    category: "Community Building",
    size: "normal",
  },
  {
    image:
      "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=900&q=85",
    title: "A Brighter Future",
    category: "Child Development",
    size: "large",
  },
];

export default function GallerySection() {
  return (
    <section className="bg-[#fff8fa] px-5 py-20 dark:bg-[#171116] sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="mb-4 inline-block rounded-full bg-[#873C56]/10 px-4 py-2 text-sm font-semibold text-[#873C56] dark:bg-[#E9A5D1]/10 dark:text-[#E9A5D1]">
              Our Community in Action
            </span>

            <h2 className="text-3xl font-bold tracking-tight text-[#292027] dark:text-white sm:text-4xl lg:text-5xl">
              Small Moments,
              <span className="text-[#873C56] dark:text-[#E9A5D1]">
                {" "}Big Impact.
              </span>
            </h2>

            <p className="mt-4 max-w-xl leading-7 text-gray-600 dark:text-gray-400">
              Every helping hand creates a story. Explore moments of kindness,
              teamwork, and positive change from communities around us.
            </p>
          </div>

          <div className="text-sm font-medium text-[#873C56] dark:text-[#E9A5D1]">
            Together, We Make a Difference ♥
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((item, index) => (
            <div
              key={item.title}
              className={`group relative overflow-hidden rounded-2xl bg-[#eadde2] shadow-sm ${
                item.size === "large" ? "sm:row-span-2" : ""
              }`}
            >
              <div
                className={`relative w-full ${
                  item.size === "large"
                    ? "h-72 sm:h-full sm:min-h-[440px]"
                    : "h-64"
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <span className="mb-2 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                    {item.category}
                  </span>

                  <h3 className="text-xl font-bold text-white sm:text-2xl">
                    {item.title}
                  </h3>
                </div>

                <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-sm font-semibold text-white backdrop-blur-md">
                  {String(index + 1).padStart(2, "0")}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Message */}
        <div className="mt-12 rounded-2xl border border-[#873C56]/10 bg-white p-8 text-center dark:border-white/10 dark:bg-[#211921]">
          <h3 className="text-2xl font-bold text-[#292027] dark:text-white">
            Be Part of Something Meaningful
          </h3>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-600 dark:text-gray-400">
            Your time, effort, and kindness can make a real difference.
            Join our community and help create a better tomorrow.
          </p>
        </div>
      </div>
    </section>
  );
}
