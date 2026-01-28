// src/app/opengraph-image/route.tsx

import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fafaf9',
          backgroundImage: 'radial-gradient(circle at 25px 25px, #e7e5e4 2%, transparent 0%)',
          backgroundSize: '50px 50px',
        }}
      >
        {/* Logo/Brand */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Star icon */}
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#292524"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>

          <div
            style={{
              marginTop: 24,
              fontSize: 64,
              fontFamily: 'Georgia, serif',
              fontWeight: 400,
              color: '#292524',
              letterSpacing: '-0.02em',
            }}
          >
            EverHere Prints
          </div>

          <div
            style={{
              marginTop: 16,
              fontSize: 28,
              color: '#78716c',
              letterSpacing: '0.05em',
            }}
          >
            Personalised Prints That Capture Your Moments
          </div>

          {/* Product types */}
          <div
            style={{
              display: 'flex',
              gap: 24,
              marginTop: 48,
            }}
          >
            {['Star Maps', 'Location Maps', 'Moon Phases', 'Sound Waves'].map((product) => (
              <div
                key={product}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#292524',
                  color: 'white',
                  borderRadius: 100,
                  fontSize: 18,
                }}
              >
                {product}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            color: '#a8a29e',
            fontSize: 18,
          }}
        >
          <span>🇦🇺</span>
          <span>Australian Made</span>
          <span style={{ margin: '0 8px' }}>•</span>
          <span>Free Shipping</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}