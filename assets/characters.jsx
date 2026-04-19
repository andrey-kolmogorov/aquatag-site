// characters.jsx — Aquatag plant characters as parametric SVGs
// Six characters, one per flag color. Colors are hardware-exact from the flag photo.
// Usage: <Character name="monty" size={120} />

// Flag colors (paint-matched from photo):
//   green  #2db489   blue  #1e6aa8   yellow #f0dc5a
//   red    #c8201e   pink  #e8388a   white  #f5f2ea

const CHARACTERS = {
  // GREEN FLAG — Monty the Monstera
  monty: {
    label: 'Monty',
    species: 'Monstera deliciosa',
    flag: 'green',
    bg: '#2db489',        // exact flag green
    accent: '#1a8466',
    glow: '#6fd6b2',
    text: '#f4fff9',
    render: () => (
      <g>
        <circle cx="50" cy="50" r="34" fill="#6fd6b2" fillOpacity="0.28"/>
        <ellipse cx="50" cy="39" rx="23" ry="26" fill="#3fc598"/>
        <line x1="50" y1="14" x2="50" y2="62" stroke="#1a8466" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M32 30 Q22 35 24 46" stroke="#1a8466" strokeWidth="2.6" fill="none" strokeLinecap="round"/>
        <path d="M30 43 Q20 48 23 56" stroke="#1a8466" strokeWidth="2.6" fill="none" strokeLinecap="round"/>
        <path d="M68 30 Q78 35 76 46" stroke="#1a8466" strokeWidth="2.6" fill="none" strokeLinecap="round"/>
        <path d="M70 43 Q80 48 77 56" stroke="#1a8466" strokeWidth="2.6" fill="none" strokeLinecap="round"/>
        <ellipse cx="42" cy="37" rx="4.5" ry="5.5" fill="white"/>
        <circle cx="42" cy="38" r="2.8" fill="#0d3a2a"/>
        <circle cx="43.2" cy="36.5" r="1" fill="white"/>
        <ellipse cx="58" cy="37" rx="4.5" ry="5.5" fill="white"/>
        <circle cx="58" cy="38" r="2.8" fill="#0d3a2a"/>
        <circle cx="59.2" cy="36.5" r="1" fill="white"/>
        <path d="M43 47 Q50 52 57 47" stroke="#0d3a2a" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        <ellipse cx="36" cy="46" rx="4" ry="2.5" fill="#8fe8c2" fillOpacity="0.7"/>
        <ellipse cx="64" cy="46" rx="4" ry="2.5" fill="#8fe8c2" fillOpacity="0.7"/>
      </g>
    ),
  },

  // BLUE FLAG — Fernie the Fern (retuned from teal to blue)
  fernie: {
    label: 'Fernie',
    species: 'Boston fern',
    flag: 'blue',
    bg: '#1e6aa8',        // exact flag blue
    accent: '#0e4a7e',
    glow: '#6aa8d6',
    text: '#eaf4ff',
    render: () => (
      <g>
        <circle cx="50" cy="50" r="32" fill="#0e4a7e" fillOpacity="0.3"/>
        <path d="M50 62 Q33 49 22 34" stroke="#6fc97a" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
        <ellipse cx="27" cy="41" rx="8" ry="4" fill="#6fc97a" transform="rotate(-50 27 41)"/>
        <ellipse cx="34" cy="51" rx="7" ry="3.5" fill="#8bd890" transform="rotate(-40 34 51)"/>
        <ellipse cx="41" cy="58" rx="6" ry="3" fill="#6fc97a" transform="rotate(-30 41 58)"/>
        <path d="M50 62 Q67 49 78 34" stroke="#6fc97a" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
        <ellipse cx="73" cy="41" rx="8" ry="4" fill="#8bd890" transform="rotate(50 73 41)"/>
        <ellipse cx="66" cy="51" rx="7" ry="3.5" fill="#6fc97a" transform="rotate(40 66 51)"/>
        <ellipse cx="59" cy="58" rx="6" ry="3" fill="#8bd890" transform="rotate(30 59 58)"/>
        <path d="M50 62 Q50 44 50 20" stroke="#6fc97a" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
        <ellipse cx="43" cy="30" rx="7" ry="3" fill="#6fc97a" transform="rotate(-20 43 30)"/>
        <ellipse cx="57" cy="30" rx="7" ry="3" fill="#8bd890" transform="rotate(20 57 30)"/>
        <ellipse cx="43" cy="40" rx="6" ry="2.5" fill="#8bd890" transform="rotate(-15 43 40)"/>
        <ellipse cx="57" cy="40" rx="6" ry="2.5" fill="#6fc97a" transform="rotate(15 57 40)"/>
        <ellipse cx="46.5" cy="19" rx="3.5" ry="4" fill="white"/>
        <circle cx="46.5" cy="20" r="2.2" fill="#0a2a4a"/>
        <ellipse cx="54" cy="19" rx="3.5" ry="4" fill="white"/>
        <circle cx="54" cy="20" r="2.2" fill="#0a2a4a"/>
        <path d="M45 24 Q50 28 55 24" stroke="#0a2a4a" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      </g>
    ),
  },

  // YELLOW FLAG — Cleo the Flowering Cactus
  cleo: {
    label: 'Cleo',
    species: 'Flowering cactus',
    flag: 'yellow',
    bg: '#f0dc5a',        // exact flag yellow
    accent: '#a88810',
    glow: '#fff09a',
    text: '#2a2208',      // dark text (yellow needs dark text for readability)
    render: () => (
      <g>
        <circle cx="50" cy="50" r="32" fill="#d6b838" fillOpacity="0.28"/>
        <rect x="36" y="28" width="28" height="40" rx="14" fill="#4aa832"/>
        <rect x="18" y="36" width="20" height="12" rx="6" fill="#4aa832"/>
        <rect x="18" y="30" width="13" height="16" rx="6.5" fill="#4aa832"/>
        <rect x="62" y="41" width="20" height="12" rx="6" fill="#4aa832"/>
        <rect x="68" y="35" width="13" height="16" rx="6.5" fill="#4aa832"/>
        <line x1="34" y1="36" x2="28" y2="32" stroke="#c8f080" strokeWidth="1"/>
        <line x1="34" y1="42" x2="28" y2="42" stroke="#c8f080" strokeWidth="1"/>
        <line x1="66" y1="42" x2="72" y2="38" stroke="#c8f080" strokeWidth="1"/>
        <line x1="66" y1="48" x2="72" y2="48" stroke="#c8f080" strokeWidth="1"/>
        <line x1="50" y1="28" x2="50" y2="22" stroke="#c8f080" strokeWidth="1"/>
        <line x1="44" y1="30" x2="41" y2="24" stroke="#c8f080" strokeWidth="1"/>
        <line x1="56" y1="30" x2="59" y2="24" stroke="#c8f080" strokeWidth="1"/>
        <circle cx="50" cy="26" r="5.5" fill="#ff6b9d"/>
        <circle cx="43" cy="24" r="4" fill="#ff6b9d"/>
        <circle cx="57" cy="24" r="4" fill="#ff6b9d"/>
        <circle cx="50" cy="26" r="3.2" fill="#ffe066"/>
        <ellipse cx="43.5" cy="43" rx="4" ry="4.5" fill="white"/>
        <circle cx="43.5" cy="44" r="2.5" fill="#1a2a0a"/>
        <circle cx="45" cy="42.5" r="0.9" fill="white"/>
        <ellipse cx="57" cy="43" rx="4" ry="4.5" fill="white"/>
        <circle cx="57" cy="44" r="2.5" fill="#1a2a0a"/>
        <circle cx="58.5" cy="42.5" r="0.9" fill="white"/>
        <path d="M40 38.5 Q43.5 36 47 38.5" stroke="#1a2a0a" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
        <path d="M44 53 Q50 58 56 55" stroke="#1a2a0a" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        <ellipse cx="38" cy="51" rx="3.5" ry="2" fill="#f0c060" fillOpacity="0.7"/>
        <ellipse cx="62" cy="51" rx="3.5" ry="2" fill="#f0c060" fillOpacity="0.7"/>
      </g>
    ),
  },

  // RED FLAG — Suzy the Dahlia (retuned from coral to true scarlet)
  suzy: {
    label: 'Suzy',
    species: 'Dahlia blossom',
    flag: 'red',
    bg: '#c8201e',        // exact flag red
    accent: '#7e0e0c',
    glow: '#f06a68',
    text: '#fff0ee',
    render: () => (
      <g>
        <circle cx="50" cy="50" r="32" fill="#7e0e0c" fillOpacity="0.35"/>
        <ellipse cx="50" cy="30" rx="22" ry="10" fill="#a0181a"/>
        <ellipse cx="50" cy="30" rx="22" ry="10" fill="#b82028" transform="rotate(45 50 38)"/>
        <ellipse cx="50" cy="30" rx="22" ry="10" fill="#8a1012" transform="rotate(90 50 38)"/>
        <ellipse cx="50" cy="30" rx="22" ry="10" fill="#a0181a" transform="rotate(135 50 38)"/>
        <ellipse cx="50" cy="33" rx="17" ry="8" fill="#d02830" transform="rotate(22.5 50 38)"/>
        <ellipse cx="50" cy="33" rx="17" ry="8" fill="#b82028" transform="rotate(67.5 50 38)"/>
        <ellipse cx="50" cy="33" rx="17" ry="8" fill="#d02830" transform="rotate(112.5 50 38)"/>
        <ellipse cx="50" cy="33" rx="17" ry="8" fill="#b82028" transform="rotate(157.5 50 38)"/>
        <circle cx="50" cy="38" r="13" fill="#e85050"/>
        <circle cx="50" cy="38" r="8" fill="#fba0a0"/>
        <ellipse cx="46.5" cy="36" rx="3" ry="3.5" fill="white"/>
        <circle cx="46.5" cy="37" r="1.9" fill="#3a0606"/>
        <circle cx="47.5" cy="35.5" r="0.7" fill="white"/>
        <ellipse cx="54" cy="36" rx="3" ry="3.5" fill="white"/>
        <circle cx="54" cy="37" r="1.9" fill="#3a0606"/>
        <circle cx="55" cy="35.5" r="0.7" fill="white"/>
        <circle cx="47.5" cy="42" r="1.2" fill="#3a0606"/>
        <circle cx="50.5" cy="42" r="1.2" fill="#3a0606"/>
        <path d="M46.5 43 Q50 46.5 54 43" stroke="#3a0606" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
        <ellipse cx="41" cy="42" rx="4" ry="2.5" fill="#ff9090" fillOpacity="0.6"/>
        <ellipse cx="59.5" cy="42" rx="4" ry="2.5" fill="#ff9090" fillOpacity="0.6"/>
      </g>
    ),
  },

  // PINK FLAG — Ollie the African Violet (retuned from violet to hot pink)
  ollie: {
    label: 'Ollie',
    species: 'African violet',
    flag: 'pink',
    bg: '#e8388a',        // exact flag pink
    accent: '#9a1858',
    glow: '#ff8ac2',
    text: '#fff0f7',
    render: () => (
      <g>
        <circle cx="50" cy="50" r="32" fill="#9a1858" fillOpacity="0.32"/>
        <ellipse cx="34" cy="58" rx="12" ry="6" fill="#5a9a3a" transform="rotate(-20 34 58)"/>
        <ellipse cx="63" cy="54" rx="10" ry="5" fill="#4a8a2a" transform="rotate(15 63 54)"/>
        <ellipse cx="50" cy="24" rx="9" ry="13" fill="#ff7ab0"/>
        <ellipse cx="50" cy="24" rx="9" ry="13" fill="#ff7ab0" transform="rotate(72 50 24)"/>
        <ellipse cx="50" cy="24" rx="9" ry="13" fill="#f060a0" transform="rotate(144 50 24)"/>
        <ellipse cx="50" cy="24" rx="9" ry="13" fill="#ff7ab0" transform="rotate(216 50 24)"/>
        <ellipse cx="50" cy="24" rx="9" ry="13" fill="#f060a0" transform="rotate(288 50 24)"/>
        <circle cx="50" cy="24" r="9" fill="#fff0f5"/>
        <circle cx="50" cy="24" r="5" fill="#ffc850"/>
        <ellipse cx="47" cy="22" rx="2.8" ry="3.2" fill="white"/>
        <circle cx="47" cy="23" r="1.8" fill="#4a0e30"/>
        <circle cx="48" cy="21.5" r="0.7" fill="white"/>
        <ellipse cx="53.5" cy="22" rx="2.8" ry="3.2" fill="white"/>
        <circle cx="53.5" cy="23" r="1.8" fill="#4a0e30"/>
        <circle cx="54.5" cy="21.5" r="0.7" fill="white"/>
        <path d="M46 27 Q50 31 54.5 27" stroke="#4a0e30" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
        <line x1="20" y1="20" x2="24" y2="24" stroke="#ffd0e4" strokeWidth="1.4" strokeLinecap="round"/>
        <line x1="24" y1="20" x2="20" y2="24" stroke="#ffd0e4" strokeWidth="1.4" strokeLinecap="round"/>
        <line x1="74" y1="16" x2="78" y2="20" stroke="#ffd0e4" strokeWidth="1.4" strokeLinecap="round"/>
        <line x1="78" y1="16" x2="74" y2="20" stroke="#ffd0e4" strokeWidth="1.4" strokeLinecap="round"/>
        <circle cx="80" cy="32" r="2" fill="#ffd0e4"/>
      </g>
    ),
  },

  // WHITE FLAG — Pip (high-contrast dark greens on white, inky outlines)
  pip: {
    label: 'Pip',
    species: 'Pilea peperomioides',
    flag: 'white',
    bg: '#f5f2ea',        // exact flag white (slightly off-white)
    accent: '#6a7360',    // ink-gray for the NFC dot
    glow: '#c8cfbc',
    text: '#1d2a1b',      // dark text — white flag demands ink
    render: () => (
      <g>
        <circle cx="50" cy="50" r="34" fill="#1d2a1b" fillOpacity="0.05"/>
        {/* round coin leaves — darker greens so they pop on white */}
        <circle cx="32" cy="32" r="9" fill="#2e6b35" stroke="#1d2a1b" strokeWidth="1"/>
        <circle cx="68" cy="30" r="8" fill="#3a8043" stroke="#1d2a1b" strokeWidth="1"/>
        <circle cx="26" cy="50" r="7" fill="#3a8043" stroke="#1d2a1b" strokeWidth="1"/>
        <circle cx="74" cy="52" r="7" fill="#2e6b35" stroke="#1d2a1b" strokeWidth="1"/>
        <circle cx="32" cy="32" r="1.2" fill="#1d2a1b"/>
        <circle cx="68" cy="30" r="1.2" fill="#1d2a1b"/>
        <circle cx="26" cy="50" r="1" fill="#1d2a1b"/>
        <circle cx="74" cy="52" r="1" fill="#1d2a1b"/>
        {/* stems to center */}
        <line x1="32" y1="32" x2="50" y2="50" stroke="#1d2a1b" strokeWidth="1.3"/>
        <line x1="68" y1="30" x2="50" y2="50" stroke="#1d2a1b" strokeWidth="1.3"/>
        <line x1="26" y1="50" x2="50" y2="50" stroke="#1d2a1b" strokeWidth="1.3"/>
        <line x1="74" y1="52" x2="50" y2="50" stroke="#1d2a1b" strokeWidth="1.3"/>
        {/* center leaf face */}
        <circle cx="50" cy="52" r="14" fill="#4a9550" stroke="#1d2a1b" strokeWidth="1.2"/>
        <circle cx="50" cy="52" r="1.4" fill="#1d2a1b"/>
        <ellipse cx="45" cy="49" rx="2" ry="2.4" fill="white"/>
        <circle cx="45" cy="49.5" r="1.3" fill="#0d1810"/>
        <ellipse cx="55" cy="49" rx="2" ry="2.4" fill="white"/>
        <circle cx="55" cy="49.5" r="1.3" fill="#0d1810"/>
        <path d="M45 55 Q50 58 55 55" stroke="#0d1810" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
        <ellipse cx="42" cy="54" rx="1.8" ry="1.2" fill="#ff9090" fillOpacity="0.55"/>
        <ellipse cx="58" cy="54" rx="1.8" ry="1.2" fill="#ff9090" fillOpacity="0.55"/>
      </g>
    ),
  },
};

// Flag hardware colors (paint-matched from photo)
const FLAG_COLORS = {
  green:  { stake: '#2db489', ink: '#1a8466', name: 'Forest green' },
  blue:   { stake: '#1e6aa8', ink: '#0e4a7e', name: 'Cobalt blue' },
  yellow: { stake: '#f0dc5a', ink: '#a88810', name: 'Lemon yellow' },
  red:    { stake: '#c8201e', ink: '#7e0e0c', name: 'Scarlet red' },
  pink:   { stake: '#e8388a', ink: '#9a1858', name: 'Magenta pink' },
  white:  { stake: '#f5f2ea', ink: '#6a7360', name: 'Linen white' },
};

function Character({ name, size = 100, showName = false, showRing = true, ring, nameFont = 'Fraunces, Georgia, serif' }) {
  const c = CHARACTERS[name];
  if (!c) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ display: 'block' }}>
      {showRing && <circle cx="50" cy="50" r="50" fill={ring || c.bg}/>}
      {c.render()}
      {showName && (
        <>
          <text x="50" y="80" textAnchor="middle" fontFamily={nameFont} fontSize="10" fontWeight="700" fill={c.text} letterSpacing="1">{c.label.toUpperCase()}</text>
          <circle cx="50" cy="90" r="3.5" fill={c.accent}/>
          <circle cx="50" cy="90" r="1.8" fill={c.glow} fillOpacity="0.9"/>
        </>
      )}
    </svg>
  );
}

function Sticker({ name, size = 160, ring }) {
  return <Character name={name} size={size} showName showRing ring={ring} />;
}

window.CHARACTERS = CHARACTERS;
window.FLAG_COLORS = FLAG_COLORS;
window.Character = Character;
window.Sticker = Sticker;
