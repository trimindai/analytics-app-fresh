import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// Mock database for demo purposes
const mockProfiles = [
  { id: 'A', name: 'Transactional Operations', confidence: 94 },
  { id: 'B', name: 'Service & Appointments', confidence: 0 },
  { id: 'C', name: 'Pipeline & Sales', confidence: 0 },
  { id: 'D', name: 'Operations & Process', confidence: 0 },
  { id: 'E', name: 'Content & Text', confidence: 0 },
  { id: 'X', name: 'Custom Analytics', confidence: 0, isPremium: true },
];

const mockKPIs = [
  { id: 'kpi-1', title: 'Total Revenue', value: 12847, change: 24.5, trend: 'up' },
  { id: 'kpi-2', title: 'Total Orders', value: 2456, change: 12.3, trend: 'up' },
  { id: 'kpi-3', title: 'Avg Order Value', value: 52.30, change: -3.2, trend: 'down' },
  { id: 'kpi-4', title: 'Active Customers', value: 1847, change: 8.7, trend: 'up' },
];

const mockInsights = [
  { id: 'insight-1', priority: 'high', title: 'Revenue dropped 15% on Tuesdays', confidence: 87 },
  { id: 'insight-2', priority: 'medium', title: 'SKU-4521 has high return rate', confidence: 92 },
  { id: 'insight-3', priority: 'low', title: 'Peak hours shifted to 7-9 PM', confidence: 78 },
];

export async function GET(request: NextRequest) {
  const { pathname } = new URL(request.url);
  const pathParts = pathname.split('/').filter(Boolean);
  
  // Remove 'api' from the beginning
  const route = pathParts.slice(1);

  // GET /api/profiles
  if (route[0] === 'profiles' && route.length === 1) {
    return NextResponse.json({ profiles: mockProfiles });
  }

  // GET /api/profiles/:id
  if (route[0] === 'profiles' && route.length === 2) {
    const profile = mockProfiles.find(p => p.id === route[1].toUpperCase());
    if (profile) {
      return NextResponse.json({ profile });
    }
    return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
  }

  // GET /api/kpis
  if (route[0] === 'kpis') {
    return NextResponse.json({ kpis: mockKPIs });
  }

  // GET /api/insights
  if (route[0] === 'insights') {
    return NextResponse.json({ insights: mockInsights });
  }

  // GET /api/health
  if (route[0] === 'health') {
    return NextResponse.json({ status: 'ok', timestamp: new Date().toISOString() });
  }

  return NextResponse.json({ error: 'Not found' }, { status: 404 });
}

export async function POST(request: NextRequest) {
  const { pathname } = new URL(request.url);
  const pathParts = pathname.split('/').filter(Boolean);
  const route = pathParts.slice(1);

  try {
    const body = await request.json();

    // POST /api/classify
    if (route[0] === 'classify') {
      // Simulate AI classification
      const result = {
        id: uuidv4(),
        detectedProfile: 'A',
        confidence: 94,
        columns: body.columns || [],
        suggestions: [
          'Your data appears to be transactional sales data',
          'Detected columns: date, amount, product, customer',
          'Recommended Profile: A - Transactional Operations',
        ],
      };
      return NextResponse.json(result);
    }

    // POST /api/analyze
    if (route[0] === 'analyze') {
      const result = {
        id: uuidv4(),
        status: 'completed',
        kpis: mockKPIs,
        insights: mockInsights,
        charts: [
          { type: 'bar', title: 'Revenue Trend', data: [4200, 5800, 6200, 7100, 8400] },
          { type: 'line', title: 'Daily Orders', data: [320, 280, 350, 410, 480] },
        ],
      };
      return NextResponse.json(result);
    }

    // POST /api/upload
    if (route[0] === 'upload') {
      const result = {
        id: uuidv4(),
        status: 'success',
        fileName: body.fileName || 'data.xlsx',
        rows: Math.floor(Math.random() * 10000) + 5000,
        columns: ['date', 'amount', 'product', 'customer', 'category'],
      };
      return NextResponse.json(result);
    }

    return NextResponse.json({ error: 'Invalid endpoint' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
