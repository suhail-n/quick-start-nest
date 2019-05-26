import { NestMiddleware, Injectable } from "@nestjs/common";
import { Request, Response } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: () => void) {
        console.log(`url ${req.originalUrl}`);
        // console.log(`Request Method: ${req.method}`)
        next();
    }
}


// can also use this instead of the class above
export function functionalLogger(req: Request, res: Response, next: () => void) {
    console.log(`Request Method: ${req.method}`);
    next();
};