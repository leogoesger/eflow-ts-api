export const categoryTypes = `
    type Category {
        id: ID
        name: String
        product: [Product]
    }

    extend type Query {
        getCategories: [Category]
    }
`;
