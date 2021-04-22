import type {Request, Response} from 'express';

export interface NexusContext {
  req: Request;
  res: Response;
  select: {
    select: Record<string, never>;
  };
}
