export const config = {
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
  DEFAULT_MODEL: process.env.NEXT_PUBLIC_DEFAULT_MODEL || 'claude-opus',
  USE_MOCK_DATA: process.env.NEXT_PUBLIC_USE_MOCK_DATA !== 'false',
  RESPONSE_DELAY_MS: parseInt(process.env.NEXT_PUBLIC_SIMULATE_RESPONSE_DELAY_MS || '1500'),
  CREATOR_NAME: process.env.NEXT_PUBLIC_CREATOR_NAME || 'JinXSuper Developer',
  CREATOR_WEBSITE: process.env.NEXT_PUBLIC_CREATOR_WEBSITE || 'https://jinxsuper.vercel.app',
} as const;
