// screens.jsx — mocked-up AquaTag app screens used inside iOS device frames.
// Two styles: "nursery" (cream, serif, warm) and "terrarium" (moss green, cream type).
// Each screen takes a `theme` object.

const NURSERY_THEME = {
  bg: '#f6efdf',
  surface: '#fff9ec',
  ink: '#1b2a1a',
  inkSoft: '#5a6b57',
  accent: '#2d8c4e',
  accentSoft: '#d7e8c8',
  warn: '#e8a020',
  danger: '#c8463a',
  divider: 'rgba(27,42,26,0.08)',
  serif: 'Fraunces, "Instrument Serif", Georgia, serif',
  sans: '"IBM Plex Sans", -apple-system, system-ui, sans-serif',
  statusDark: false,
};
const TERRARIUM_THEME = {
  bg: '#0f2a1e',
  surface: '#16382a',
  ink: '#f3ead4',
  inkSoft: 'rgba(243,234,212,0.6)',
  accent: '#6fd69a',
  accentSoft: 'rgba(111,214,154,0.18)',
  warn: '#f4b455',
  danger: '#ef7d6a',
  divider: 'rgba(243,234,212,0.1)',
  serif: 'Fraunces, "Instrument Serif", Georgia, serif',
  sans: '"IBM Plex Sans", -apple-system, system-ui, sans-serif',
  statusDark: true,
};

// Demo plant data (minimal density: plant + status only)
const DEMO_PLANTS = [
  { id: 'monty',  char: 'monty',  name: 'Monty',  status: 'ok',       days: 3,  emoji: '🌿' },
  { id: 'cleo',   char: 'cleo',   name: 'Cleo',   status: 'due',      days: 0,  emoji: '🌵' },
  { id: 'fernie', char: 'fernie', name: 'Fernie', status: 'overdue',  days: -2, emoji: '🌿' },
  { id: 'ollie',  char: 'ollie',  name: 'Ollie',  status: 'ok',       days: 5,  emoji: '🌸' },
  { id: 'suzy',   char: 'suzy',   name: 'Suzy',   status: 'ok',       days: 4,  emoji: '🌺' },
  { id: 'pip',    char: 'pip',    name: 'Pip',    status: 'due',      days: 1,  emoji: '🌱' },
];

function statusLabel(p) {
  const _t = (window.t || ((k, v) => {
    const map = { 'app.overdue_d': `${v && v.n}d overdue`, 'app.water_today': 'Water today', 'app.water_tomorrow': 'Water tomorrow', 'app.in_d': `In ${v && v.n}d` };
    return map[k] || k;
  }));
  if (p.status === 'overdue') return _t('app.overdue_d', { n: Math.abs(p.days) });
  if (p.status === 'due') return p.days === 0 ? _t('app.water_today') : _t('app.water_tomorrow');
  return _t('app.in_d', { n: p.days });
}
function statusColor(t, p) {
  if (p.status === 'overdue') return t.danger;
  if (p.status === 'due') return t.warn;
  return t.accent;
}

// ─── 1. PLANT LIST ──────────────────────────────────────────────
function ScreenPlantList({ theme: t, plants = DEMO_PLANTS, useStickers = true }) {
  return (
    <div style={{
      background: t.bg, minHeight: '100%', fontFamily: t.sans, color: t.ink,
      paddingBottom: 120,
    }}>
      {/* Large title */}
      <div style={{ padding: '58px 22px 4px' }}>
        <div style={{ fontFamily: t.sans, fontSize: 13, fontWeight: 500, letterSpacing: 1.4, color: t.inkSoft, textTransform: 'uppercase' }}>
          {(window.t || (()=>'Today'))('app.today', { n: plants.filter(p => p.status !== 'ok').length })}
        </div>
        <h1 style={{ fontFamily: t.serif, fontSize: 44, fontWeight: 500, margin: '6px 0 0', lineHeight: 1, letterSpacing: -1 }}>
          {(window.t || (()=>'Your plants'))('app.your_plants')}
        </h1>
      </div>

      {/* Rows */}
      <div style={{ padding: '16px 14px 0' }}>
        {plants.map((p, i) => (
          <div key={p.id} style={{
            display: 'flex', alignItems: 'center', gap: 14,
            padding: '14px 10px',
            borderBottom: i < plants.length - 1 ? `1px solid ${t.divider}` : 'none',
          }}>
            {/* Avatar */}
            <div style={{
              width: 56, height: 56, borderRadius: '50%',
              background: useStickers ? CHARACTERS[p.char].bg : t.accentSoft,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
              boxShadow: `0 2px 0 ${CHARACTERS[p.char].accent}`,
            }}>
              {useStickers ? (
                <Character name={p.char} size={56} showRing={false} />
              ) : (
                <span style={{ fontSize: 28 }}>{p.emoji}</span>
              )}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: t.serif, fontSize: 22, fontWeight: 500, lineHeight: 1.1 }}>{p.name}</div>
              <div style={{ fontSize: 13, color: statusColor(t, p), marginTop: 3, fontWeight: 500, letterSpacing: 0.2 }}>
                {statusLabel(p)}
              </div>
            </div>
            {/* Water drop action */}
            <div style={{
              width: 40, height: 40, borderRadius: 20,
              background: p.status === 'ok' ? 'transparent' : statusColor(t, p),
              border: p.status === 'ok' ? `1.5px solid ${t.divider}` : 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <svg width="16" height="20" viewBox="0 0 16 20" fill={p.status === 'ok' ? t.inkSoft : '#fff'}>
                <path d="M8 1 C4 7 1 11 1 14 a7 7 0 0 0 14 0 c0-3-3-7-7-13z"/>
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* FAB: Scan Tag */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 38, display: 'flex', justifyContent: 'center', pointerEvents: 'none' }}>
        <div style={{
          background: t.ink, color: t.bg,
          padding: '14px 26px', borderRadius: 999,
          display: 'inline-flex', alignItems: 'center', gap: 10,
          fontFamily: t.sans, fontWeight: 600, fontSize: 16, letterSpacing: 0.2,
          boxShadow: '0 12px 30px rgba(0,0,0,0.25)',
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={t.bg} strokeWidth="2" strokeLinecap="round">
            <path d="M2 12a10 10 0 0 1 20 0"/>
            <path d="M6 12a6 6 0 0 1 12 0"/>
            <path d="M10 12a2 2 0 0 1 4 0"/>
          </svg>
          {(window.t || (()=>'Scan a tag'))('app.scan_tag')}
        </div>
      </div>
    </div>
  );
}

// ─── 2. NFC SCAN (the tap moment) ───────────────────────────────
function ScreenScan({ theme: t, plant = DEMO_PLANTS[0] }) {
  return (
    <div style={{
      background: t.bg, minHeight: '100%', fontFamily: t.sans, color: t.ink,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '0 24px', position: 'relative', overflow: 'hidden',
    }}>
      {/* Ripples */}
      <div style={{ position: 'absolute', top: '38%', left: '50%', transform: 'translate(-50%, -50%)', width: 340, height: 340 }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            position: 'absolute', inset: `${i * 40}px`,
            borderRadius: '50%',
            border: `1.5px solid ${t.accent}`,
            opacity: 0.15 + (2 - i) * 0.12,
          }}/>
        ))}
      </div>

      {/* Character + glow */}
      <div style={{ marginTop: -60, position: 'relative' }}>
        <div style={{
          position: 'absolute', inset: -20, borderRadius: '50%',
          background: `radial-gradient(circle, ${CHARACTERS[plant.char].glow}55 0%, transparent 70%)`,
          filter: 'blur(10px)',
        }}/>
        <div style={{
          width: 180, height: 180, borderRadius: '50%',
          background: CHARACTERS[plant.char].bg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 20px 60px ${CHARACTERS[plant.char].accent}44`,
          position: 'relative',
        }}>
          <Character name={plant.char} size={180} showRing={false} />
        </div>
      </div>

      <div style={{ fontFamily: t.sans, fontSize: 12, fontWeight: 600, letterSpacing: 2, color: t.inkSoft, textTransform: 'uppercase', marginTop: 40 }}>
        {(window.t || (()=>'NFC · Watered now'))('app.nfc_watered')}
      </div>
      <h1 style={{ fontFamily: t.serif, fontSize: 46, fontWeight: 500, margin: '8px 0 0', letterSpacing: -1.2 }}>
        {(window.t || (()=>plant.name+', hydrated.'))('app.hydrated', { name: plant.name })}
      </h1>
      <div style={{ fontFamily: t.sans, fontSize: 16, color: t.inkSoft, marginTop: 10, textAlign: 'center', maxWidth: 280, lineHeight: 1.4 }}>
        {(window.t || (()=>'Next drink in X days.'))('app.next_in', { n: CHARACTERS[plant.char].species === 'Monstera deliciosa' ? '7' : '5' })}
      </div>

      {/* Check */}
      <div style={{
        marginTop: 36, width: 54, height: 54, borderRadius: '50%',
        background: t.accent, display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: `0 8px 22px ${t.accent}55`,
      }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="5 12 10 17 19 7"/>
        </svg>
      </div>
    </div>
  );
}

// ─── 3. PLANT DETAIL ────────────────────────────────────────────
function ScreenDetail({ theme: t, plant = DEMO_PLANTS[0] }) {
  return (
    <div style={{ background: t.bg, minHeight: '100%', fontFamily: t.sans, color: t.ink, paddingBottom: 60 }}>
      {/* Hero */}
      <div style={{
        background: CHARACTERS[plant.char].bg,
        padding: '56px 24px 28px', position: 'relative',
        color: CHARACTERS[plant.char].text,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 17,
            background: 'rgba(0,0,0,0.22)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </div>
          <div style={{ fontFamily: t.sans, fontSize: 12, letterSpacing: 1.4, opacity: 0.8, textTransform: 'uppercase' }}>{(window.t||(()=>'Edit'))('app.edit')}</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
          <Character name={plant.char} size={150} showRing={false}/>
        </div>
        <h1 style={{ fontFamily: t.serif, fontSize: 44, fontWeight: 500, textAlign: 'center', margin: '18px 0 2px', letterSpacing: -1 }}>
          {plant.name}
        </h1>
        <div style={{ fontFamily: t.sans, fontSize: 14, textAlign: 'center', opacity: 0.8, letterSpacing: 0.3 }}>
          {CHARACTERS[plant.char].species}
        </div>
      </div>

      {/* Big status card */}
      <div style={{
        margin: '-24px 18px 0', background: t.surface,
        borderRadius: 24, padding: '22px 22px 20px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
        position: 'relative', zIndex: 2,
      }}>
        <div style={{ fontFamily: t.sans, fontSize: 11, fontWeight: 600, letterSpacing: 1.5, color: t.inkSoft, textTransform: 'uppercase' }}>
          {(window.t||(()=>'Next watering'))('app.next_watering')}
        </div>
        <div style={{ fontFamily: t.serif, fontSize: 38, fontWeight: 500, marginTop: 4, letterSpacing: -0.8, color: statusColor(t, plant) }}>
          {statusLabel(plant)}
        </div>
        <div style={{ fontFamily: t.sans, fontSize: 14, color: t.inkSoft, marginTop: 4 }}>
          {(window.t||(()=>'Last tapped 3 days ago · by iPhone 15'))('app.last_tapped')}
        </div>

        {/* Water bar */}
        <div style={{ marginTop: 18, height: 8, background: t.divider, borderRadius: 4, overflow: 'hidden' }}>
          <div style={{ width: plant.status === 'overdue' ? '100%' : '58%', height: '100%', background: statusColor(t, plant), borderRadius: 4 }}/>
        </div>
      </div>

      {/* Rows */}
      <div style={{ padding: '24px 22px 0' }}>
        {(() => { const _t = window.t || ((k)=>k); return [
          [_t('app.row.interval'), _t('app.row.interval.v')],
          [_t('app.row.tag'), 'aquatag:' + plant.id],
          [_t('app.row.ha'), _t('app.row.ha.v')],
          [_t('app.row.notif'), _t('app.row.notif.v')],
        ]; })().map(([k, v], i) => (
          <div key={k} style={{
            display: 'flex', justifyContent: 'space-between',
            padding: '14px 0',
            borderBottom: i < 3 ? `1px solid ${t.divider}` : 'none',
            fontSize: 15,
          }}>
            <span style={{ color: t.inkSoft }}>{k}</span>
            <span style={{ fontWeight: 500 }}>{v}</span>
          </div>
        ))}
      </div>

      {/* Write tag button */}
      <div style={{ padding: '26px 22px 0' }}>
        <div style={{
          border: `1.5px solid ${t.ink}`, borderRadius: 999,
          padding: '14px 0', textAlign: 'center',
          fontFamily: t.sans, fontWeight: 600, fontSize: 15, letterSpacing: 0.3,
        }}>
          {(window.t||(()=>'Write to a new NFC tag'))('app.write_tag')}
        </div>
      </div>
    </div>
  );
}

// ─── 4. ADD PLANT ───────────────────────────────────────────────
function ScreenAdd({ theme: t }) {
  const [selected] = [3]; // "basil" row
  return (
    <div style={{ background: t.bg, minHeight: '100%', fontFamily: t.sans, color: t.ink, paddingBottom: 40 }}>
      <div style={{ padding: '56px 22px 10px', display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ fontFamily: t.sans, fontSize: 15, color: t.inkSoft }}>{(window.t||(()=>'Cancel'))('app.cancel')}</div>
        <div style={{ fontFamily: t.sans, fontSize: 15, color: t.accent, fontWeight: 600 }}>{(window.t||(()=>'Save'))('app.save')}</div>
      </div>
      <div style={{ padding: '6px 22px 10px' }}>
        <h1 style={{ fontFamily: t.serif, fontSize: 40, fontWeight: 500, margin: 0, letterSpacing: -1, lineHeight: 1.02 }}
            dangerouslySetInnerHTML={{ __html: (window.t||(()=>'Meet your new<br/>plant friend.'))('app.meet_new.html') }}/>
      </div>

      {/* Character picker */}
      <div style={{ padding: '20px 0 4px' }}>
        <div style={{ fontFamily: t.sans, fontSize: 11, fontWeight: 600, letterSpacing: 1.5, color: t.inkSoft, textTransform: 'uppercase', padding: '0 22px 10px' }}>
          {(window.t||(()=>'Pick a character'))('app.pick_character')}
        </div>
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', padding: '2px 22px 10px' }}>
          {['pip', 'monty', 'cleo', 'fernie', 'ollie', 'suzy'].map((c, i) => (
            <div key={c} style={{
              width: 70, height: 70, borderRadius: '50%',
              background: CHARACTERS[c].bg,
              flexShrink: 0,
              border: i === 0 ? `3px solid ${t.ink}` : 'none',
              boxShadow: i === 0 ? `0 6px 16px ${CHARACTERS[c].accent}55` : 'none',
            }}>
              <Character name={c} size={70} showRing={false}/>
            </div>
          ))}
        </div>
      </div>

      {/* Form fields */}
      <div style={{ padding: '20px 22px 0' }}>
        {(() => { const _t = window.t || ((k)=>k); return [
          [_t('app.field.name'), 'Pip', true],
          [_t('app.field.species'), _t('app.field.species.v'), false],
          [_t('app.field.water'), _t('app.field.water.v'), false],
        ]; })().map(([k, v, strong], i) => (
          <div key={k} style={{
            padding: '16px 0', borderBottom: `1px solid ${t.divider}`,
            display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          }}>
            <span style={{ fontSize: 13, color: t.inkSoft, letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: 600 }}>{k}</span>
            <span style={{ fontFamily: strong ? t.serif : t.sans, fontSize: strong ? 22 : 17, fontWeight: strong ? 500 : 500 }}>{v}</span>
          </div>
        ))}
      </div>

      {/* Interval dial */}
      <div style={{ padding: '30px 22px 0', textAlign: 'center' }}>
        <div style={{ fontFamily: t.serif, fontSize: 56, fontWeight: 400, letterSpacing: -2, color: t.accent }}>4</div>
        <div style={{ fontFamily: t.sans, fontSize: 12, letterSpacing: 2, color: t.inkSoft, textTransform: 'uppercase', marginTop: -4 }}>{(window.t||(()=>'days between waters'))('app.days_between')}</div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 3, marginTop: 16 }}>
          {[...Array(14)].map((_, i) => (
            <div key={i} style={{
              width: 4, height: i === 3 ? 22 : 14,
              background: i === 3 ? t.accent : t.divider,
              borderRadius: 2,
            }}/>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── 5. HISTORY ─────────────────────────────────────────────────
function ScreenHistory({ theme: t }) {
  const _t = window.t || ((k)=>k);
  const weeks = [
    [_t('app.day.mon'), 1, 0, 1, 0, 1, 1, 0],
    [_t('app.day.tue'), 0, 1, 0, 1, 0, 1, 1],
    [_t('app.day.wed'), 1, 0, 1, 1, 0, 1, 0],
    [_t('app.day.thu'), 0, 1, 1, 0, 1, 0, 1],
    [_t('app.day.fri'), 1, 1, 0, 1, 0, 1, 1],
    [_t('app.day.sat'), 0, 1, 0, 1, 1, 0, 1],
    [_t('app.day.sun'), 1, 0, 1, 0, 1, 1, 0],
  ];
  return (
    <div style={{ background: t.bg, minHeight: '100%', fontFamily: t.sans, color: t.ink, paddingBottom: 60 }}>
      <div style={{ padding: '58px 22px 4px' }}>
        <div style={{ fontFamily: t.sans, fontSize: 13, fontWeight: 500, letterSpacing: 1.4, color: t.inkSoft, textTransform: 'uppercase' }}>
          {_t('app.last_six')}
        </div>
        <h1 style={{ fontFamily: t.serif, fontSize: 44, fontWeight: 500, margin: '6px 0 0', lineHeight: 1, letterSpacing: -1 }}>
          {_t('app.history')}
        </h1>
      </div>

      {/* Big stat */}
      <div style={{ padding: '22px 22px 6px', display: 'flex', gap: 22 }}>
        <div>
          <div style={{ fontFamily: t.serif, fontSize: 52, fontWeight: 400, letterSpacing: -1.5, lineHeight: 1, color: t.accent }}>142</div>
          <div style={{ fontSize: 12, color: t.inkSoft, letterSpacing: 1.2, textTransform: 'uppercase', fontWeight: 600 }}>{_t('app.waterings')}</div>
        </div>
        <div>
          <div style={{ fontFamily: t.serif, fontSize: 52, fontWeight: 400, letterSpacing: -1.5, lineHeight: 1 }}>31</div>
          <div style={{ fontSize: 12, color: t.inkSoft, letterSpacing: 1.2, textTransform: 'uppercase', fontWeight: 600 }}>{_t('app.day_streak')}</div>
        </div>
      </div>

      {/* Heatmap */}
      <div style={{ padding: '24px 22px 0' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {weeks.map(([day, ...cells]) => (
            <div key={day} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 30, fontSize: 11, color: t.inkSoft, fontWeight: 500 }}>{day}</div>
              {cells.map((v, i) => (
                <div key={i} style={{
                  flex: 1, aspectRatio: '1/1',
                  background: v ? t.accent : t.divider,
                  opacity: v ? (0.3 + Math.random() * 0.7) : 1,
                  borderRadius: 5,
                }}/>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Recent entries */}
      <div style={{ padding: '28px 22px 0' }}>
        <div style={{ fontFamily: t.sans, fontSize: 11, fontWeight: 600, letterSpacing: 1.5, color: t.inkSoft, textTransform: 'uppercase', marginBottom: 10 }}>
          {_t('app.this_week')}
        </div>
        {[
          ['monty', 'Monty', _t('app.when.2h'), 'Andrei'],
          ['cleo',  'Cleo',  _t('app.when.yesterday'), 'Mira'],
          ['fernie','Fernie',_t('app.when.monday'), 'Andrei'],
        ].map(([c, name, when, who]) => (
          <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: `1px solid ${t.divider}` }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: CHARACTERS[c].bg }}>
              <Character name={c} size={40} showRing={false}/>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: t.serif, fontSize: 18, fontWeight: 500 }}>{name}</div>
              <div style={{ fontSize: 12, color: t.inkSoft }}>{_t('app.watered_by', { when, who })}</div>
            </div>
            <svg width="16" height="20" viewBox="0 0 16 20" fill={t.accent}>
              <path d="M8 1 C4 7 1 11 1 14 a7 7 0 0 0 14 0 c0-3-3-7-7-13z"/>
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}

window.THEMES = { nursery: NURSERY_THEME, terrarium: TERRARIUM_THEME };
window.DEMO_PLANTS = DEMO_PLANTS;
window.ScreenPlantList = ScreenPlantList;
window.ScreenScan = ScreenScan;
window.ScreenDetail = ScreenDetail;
window.ScreenAdd = ScreenAdd;
window.ScreenHistory = ScreenHistory;
