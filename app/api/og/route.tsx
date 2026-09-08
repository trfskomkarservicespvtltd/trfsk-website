// @ts-ignore
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'TRFSK';
  const description = searchParams.get('description') || 'Financial Awareness & Investment Platform';

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
          backgroundColor: '#0f172a',
          backgroundImage: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px 60px',
            maxWidth: '1000px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '40px',
            }}
          >
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '24px',
              }}
            >
              <span style={{ fontSize: '48px', fontWeight: 'bold', color: 'white' }}>T</span>
            </div>
            <span style={{ fontSize: '56px', fontWeight: 'bold', color: 'white', letterSpacing: '-1px' }}>
              TRFSK
            </span>
          </div>

          <h1
            style={{
              fontSize: '52px',
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
              lineHeight: '1.1',
              marginBottom: '24px',
              maxWidth: '900px',
            }}
          >
            {title}
          </h1>

          <p
            style={{
              fontSize: '28px',
              color: '#94a3b8',
              textAlign: 'center',
              lineHeight: '1.4',
              maxWidth: '800px',
              marginBottom: '40px',
            }}
          >
            {description}
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginTop: '20px',
            }}
          >
            <span style={{ fontSize: '24px', color: '#3b82f6', fontWeight: '600' }}>trfskomkar.com</span>
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: '60px',
              display: 'flex',
              gap: '40px',
            }}
          >
            <span style={{ fontSize: '20px', color: '#64748b' }}>Financial Awareness</span>
            <span style={{ fontSize: '20px', color: '#64748b' }}>Business Education</span>
            <span style={{ fontSize: '20px', color: '#64748b' }}>Investment Platform</span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
