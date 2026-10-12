export default function Lotus({ color = '#9f6f21' }: { color?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth={1.3} aria-hidden="true">
      <path d="M24 40c-9-3-14-11-12-20 6 1 11 7 12 20zM24 40c9-3 14-11 12-20-6 1-11 7-12 20zM24 40c-4-8-4-17 0-26 4 9 4 18 0 26z" />
    </svg>
  )
}
