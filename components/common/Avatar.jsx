export default function Avatar({ name = "", src = "", size = "h-8 w-8", rounded = "rounded-full" }) {
  const shape = `${size} ${rounded} shrink-0`;
  const circle = { borderRadius: "9999px" };
  if (src) {
    return (
      <img
        src={src}
        alt={name || "avatar"}
        style={{ ...circle, objectFit: "cover", overflow: "hidden" }}
        className={`${shape} !rounded-full object-cover`}
      />
    );
  }
  return (
    <span
      style={circle}
      className={`${shape} grid place-items-center bg-brand-gradient text-xs font-bold text-white`}
    >
      {name?.charAt(0)?.toUpperCase() ?? "?"}
    </span>
  );
}