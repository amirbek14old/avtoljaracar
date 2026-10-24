import { useId } from 'react'

// Side-view shapes, car faces right. Ground line is y = 92.
const SHAPES = {
  sedan: {
    body: 'M14 84 L14 66 Q14 58 24 56 L62 52 Q84 32 104 28 L148 27 Q164 27 180 46 L214 52 Q228 55 228 68 L228 84 Z',
    glass: 'M70 52 Q88 36 104 33 L124 32 L124 52 Z M130 32 L146 32 Q158 33 172 52 L130 52 Z',
    wheels: [62, 180], r: 17, doors: [126, 76, 172], light: 214, tail: 16,
  },
  business: {
    body: 'M10 84 L10 66 Q10 58 20 56 L62 52 Q86 30 110 27 L150 26 Q168 27 186 46 L222 52 Q234 55 234 68 L234 84 Z',
    glass: 'M72 52 Q92 35 110 32 L130 31 L130 52 Z M136 31 L150 31 Q164 32 178 52 L136 52 Z',
    wheels: [62, 188], r: 18, doors: [132, 78, 178], light: 222, tail: 12,
  },
  hatch: {
    body: 'M26 84 L26 58 Q26 46 34 36 Q40 28 56 27 L130 26 Q146 27 164 44 L200 52 Q214 55 214 68 L214 84 Z',
    glass: 'M38 46 Q42 33 56 32 L92 32 L92 46 Z M98 32 L128 32 Q140 33 156 46 L98 46 Z',
    wheels: [62, 172], r: 16, doors: [96, 50, 158], light: 202, tail: 28,
  },
  suv: {
    body: 'M14 80 L14 54 Q14 42 22 32 Q28 22 46 21 L150 20 Q164 21 180 40 L214 48 Q230 52 230 66 L230 80 Z',
    glass: 'M28 42 Q32 27 46 26 L94 26 L94 42 Z M100 26 L148 26 Q160 27 172 42 L100 42 Z',
    wheels: [62, 182], r: 20, doors: [98, 44, 176], light: 216, tail: 16, rails: true,
  },
}

function Wheel({ x, r, y }) {
  const spokes = [0, 72, 144, 216, 288]
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill="#1c1c1c" />
      <circle cx={x} cy={y} r={r * 0.62} fill="#c9ccd1" stroke="#8d9299" strokeWidth="1" />
      {spokes.map(a => (
        <rect key={a} x={x - 1.6} y={y - r * 0.58} width="3.2" height={r * 0.5} rx="1.5"
          fill="#9aa0a7" transform={`rotate(${a} ${x} ${y})`} />
      ))}
      <circle cx={x} cy={y} r={r * 0.18} fill="#6b7078" />
    </g>
  )
}

export default function CarImage({ color = '#ccc', body = 'sedan', big }) {
  const s = SHAPES[body] || SHAPES.sedan
  const id = useId().replace(/:/g, '')
  const groundY = 92
  const wy = groundY - s.r
  const [doorX, rearDoor, frontDoor] = s.doors
  const glassBottom = body === 'suv' ? 42 : body === 'hatch' ? 46 : 52

  return (
    <div className={big ? 'car-img big' : 'car-img'}>
      <svg viewBox="0 0 244 104" aria-hidden="true">
        <g transform={body === 'hatch' ? 'translate(18 9) scale(.88)' : undefined}>
        <defs>
          <linearGradient id={`shine${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity=".45" />
            <stop offset=".45" stopColor="#fff" stopOpacity=".08" />
            <stop offset="1" stopColor="#000" stopOpacity=".22" />
          </linearGradient>
          <linearGradient id={`glass${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#dcebf5" />
            <stop offset="1" stopColor="#8fb0c7" />
          </linearGradient>
          <clipPath id={`clip${id}`}><path d={s.body} /></clipPath>
        </defs>

        {/* shadow */}
        <ellipse cx="122" cy={groundY + 2} rx="108" ry="5" fill="#000" opacity=".12" />

        {/* roof rails */}
        {s.rails && <rect x="52" y="16" width="90" height="3" rx="1.5" fill="#2a2a2a" />}

        {/* body */}
        <path d={s.body} fill={color} />
        <g clipPath={`url(#clip${id})`}>
          <rect x="0" y="0" width="244" height="104" fill={`url(#shine${id})`} />
          {/* lower plastic trim */}
          <rect x="0" y={body === 'suv' ? 70 : 76} width="244" height="20" fill="#000" opacity=".18" />
          {/* wheel arches */}
          {s.wheels.map(x => <circle key={x} cx={x} cy={wy} r={s.r + 3.5} fill="#222" />)}
          {/* side crease line */}
          <path d={`M20 ${glassBottom + 10} L224 ${glassBottom + 8}`} stroke="#fff" strokeOpacity=".35" strokeWidth="1.2" />
        </g>
        <path d={s.body} fill="none" stroke="#1a1a1a" strokeOpacity=".55" strokeWidth="1.2" />

        {/* windows */}
        <path d={s.glass} fill={`url(#glass${id})`} stroke="#1a1a1a" strokeOpacity=".6" strokeWidth="1" />

        {/* doors */}
        <g stroke="#1a1a1a" strokeOpacity=".35" strokeWidth="1" fill="none">
          <path d={`M${doorX} ${glassBottom - 20} L${doorX} ${wy + 4}`} />
          <path d={`M${rearDoor} ${glassBottom} L${rearDoor + 2} ${wy + 4}`} />
          <path d={`M${frontDoor} ${glassBottom} L${frontDoor - 6} ${wy + 4}`} />
        </g>
        <rect x={doorX - 16} y={glassBottom + 5} width="9" height="2.5" rx="1.2" fill="#1a1a1a" opacity=".45" />
        <rect x={frontDoor - 22} y={glassBottom + 5} width="9" height="2.5" rx="1.2" fill="#1a1a1a" opacity=".45" />

        {/* mirror */}
        <path d={`M${frontDoor - 4} ${glassBottom - 2} l8 -4 l3 4 z`} fill={color} stroke="#1a1a1a" strokeOpacity=".5" />

        {/* lights */}
        <path d={`M${s.light} ${glassBottom + 4} l10 2 l2 5 l-12 -1 z`} fill="#fff8d6" stroke="#1a1a1a" strokeOpacity=".4" />
        <rect x={s.tail - 1} y={glassBottom + 4} width="5" height="9" rx="1.5" fill="#d93a2b" />

        {s.wheels.map(x => <Wheel key={x} x={x} y={wy} r={s.r} />)}
        </g>
      </svg>
    </div>
  )
}
