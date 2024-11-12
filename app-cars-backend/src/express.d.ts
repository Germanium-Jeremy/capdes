import express from 'express';

declare global {
    namespace Express {
        export interface Request {
            id?: string;
        }
    }
}
