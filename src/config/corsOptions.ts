const allowedOrigins = new Set<string>(['http://localhost:3000', 'http://localhost:5000']);

const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allowed: boolean) => void) => {
    const isAllowed = allowedOrigins.has(origin as string) || !origin;
    callback(isAllowed ? null : new Error('Not allowed by CORS'), isAllowed);
  },
  credentials: true,
  optionsSuccessStatus: 200,
} as const;

export { corsOptions };
