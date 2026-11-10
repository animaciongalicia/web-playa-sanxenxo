// Marca provisional (ola sobre círculo). Se sustituye cuando Pablo aporte el logo.
export default function Logo({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <circle cx="18" cy="18" r="18" className="fill-ria-700" />
      <path d="M5 20c3 0 3-3 6.5-3S15 20 18 20s3-3 6.5-3S28 20 31 20" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <path d="M5 26c3 0 3-3 6.5-3S15 26 18 26s3-3 6.5-3S28 26 31 26" stroke="#ebdcc1" strokeWidth="2" strokeLinecap="round" />
      <circle cx="25" cy="10" r="3" className="fill-arena-200" />
    </svg>
  );
}
