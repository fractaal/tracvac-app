export const port = parseInt(process.env.PORT ?? 80 as unknown as string);
export const host = process.env.HOST ?? '0.0.0.0';