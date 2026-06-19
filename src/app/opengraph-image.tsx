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
  // Read the logo from the public directory
  const logoData = await fetch(
    new URL('../../public/logo.png', import.meta.url)
  ).then((res) => res.arrayBuffer());

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
          <img
            // @ts-expect-error ImageResponse src accepts ArrayBuffer
            src={logoData}
            width={700}
            style={{
              objectFit: 'contain',
              marginBottom: 40,
              filter: 'brightness(0) invert(1)', // Forces the logo to be pure white
            }}
          />

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
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 12 }}>
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
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
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 12 }}>
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
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
