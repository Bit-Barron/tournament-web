declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      SECRET: string;
      NEXT_PUBLIC_PRICE_POOL: number;
    }
  }
}
