import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Image metadata
export const alt = 'Peptides7 — Premium Research Peptides';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#050505',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle Background Glows */}
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            left: '-10%',
            width: '60%',
            height: '60%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-20%',
            right: '-10%',
            width: '60%',
            height: '60%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
          }}
        />

        {/* Outer Border */}
        <div
          style={{
            position: 'absolute',
            inset: '40px',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '20px',
            display: 'flex',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
          }}
        >
          {/* Logo / Brand Name */}
          <div
            style={{
              fontSize: 100,
              fontWeight: 400,
              color: '#ffffff',
              letterSpacing: '-0.02em',
              marginBottom: 20,
              fontFamily: 'serif',
            }}
          >
            Peptides7
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 32,
              fontWeight: 300,
              color: '#a1a1aa',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: 60,
              fontFamily: 'sans-serif',
            }}
          >
            Premium Research Peptides
          </div>

          {/* Details */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '40px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: 24,
                color: '#71717a',
                letterSpacing: '0.05em',
              }}
            >
              <span style={{ color: '#ffffff', marginRight: 12 }}>✓</span>
              ≥99% HPLC Purity
            </div>
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: 3,
                backgroundColor: '#3f3f46',
              }}
            />
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: 24,
                color: '#71717a',
                letterSpacing: '0.05em',
              }}
            >
              <span style={{ color: '#ffffff', marginRight: 12 }}>✓</span>
              Independent COAs
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
