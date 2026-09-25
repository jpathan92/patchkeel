export default function Logo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 34 34" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 12h28l-4 8H7z" />
      <path d="M17 20v11" />
      <path d="M13 31h8" />
      <path d="M17 12V3l7 6h-7" />
    </svg>
  );
}

export function Check({ color = "#0F766E" }: { color?: string }) {
  return (
    <svg className="check" width="18" height="18" viewBox="0 0 18 18" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3.5 9.5l3.5 3.5 7.5-8" />
    </svg>
  );
}
