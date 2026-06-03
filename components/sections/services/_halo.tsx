// Soft blurred backdrop so text reads cleanly over the PageBackground lines.
// Place inside a `relative isolate` wrapper, as a sibling before the text.
export function Halo({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`absolute -inset-x-8 -inset-y-6 -z-10 backdrop-blur-sm bg-background/60 [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_85%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_85%)] ${className}`}
    />
  );
}
