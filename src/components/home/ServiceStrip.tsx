const items = [
  { emoji: "🚚", label: "Fast Delivery" },
  { emoji: "🔒", label: "Secure Payments" },
  { emoji: "📦", label: "Safe Packaging" },
  { emoji: "↩️", label: "Easy Returns" },
];

export function ServiceStrip() {
  return (
    <div className="bg-saffron text-white">
      <div className="w-full px-6 md:px-12 py-3 flex flex-wrap justify-center gap-x-10 gap-y-2">
        {items.map(({ emoji, label }) => (
          <span key={label} className="flex items-center gap-2 text-sm font-medium">
            <span>{emoji}</span>
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
