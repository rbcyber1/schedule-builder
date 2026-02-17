import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction): void => {
    const start: number = Date.now();
    res.on("finish", (): void => {
        const duration: number = Date.now() - start;
        console.log(
            `${req.method} ${req.ip} ${req.originalUrl} ${res.statusCode} - ${duration}ms`,
        );
    });
    next();
};
