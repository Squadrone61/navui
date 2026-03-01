export function Wallpaper() {
  return (
    <div
      className="absolute inset-0"
      style={{
        zIndex: 0,
        backgroundColor: '#0a0a0a',
        backgroundImage: 'radial-gradient(ellipse at center, #111 0%, #0a0a0a 100%)',
      }}
    />
  )
}
