import { Category } from '../../models';

export class categoryServices {
    Category = Category;

    public getCategories() {
        return this.Category.findAll();
    }
}
