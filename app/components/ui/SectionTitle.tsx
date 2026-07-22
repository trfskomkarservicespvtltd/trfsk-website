type SectionTitleProps = {
  title: string;
  subtitle: string;
  center?: boolean;
};

export default function SectionTitle({
  title,
  subtitle,
  center = false,
}: SectionTitleProps) {
  return (
    <div className={center ? "text-center" : ""}>
      <p className="text-blue-500 uppercase tracking-widest font-semibold mb-3">
        {subtitle}
      </p>

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
        {title}
      </h2>
    </div>
  );
}