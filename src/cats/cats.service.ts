import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

// singleton scope unless specified otherwise
@Injectable()
export class CatsService {
    private readonly cats: Cat[] = [];

    create(cat: Cat) {
        this.cats.push(cat);
    }
    findById(id: number): Cat | {} {
        return this.cats[id] || {};
    }
    findAll(): Cat[] {
        return this.cats;
    }
    updateCat(id: number, newCat: Cat): boolean {
        if (this.cats.length < id) return false
        let foundCat: Cat = this.cats[id]
        for (let key in newCat) {
            if (key) {
                foundCat[key] = newCat[key];
            }
        }
        return true;
    }
    remove(id: number) {
        this.cats.splice(id, 1);
    }
}
