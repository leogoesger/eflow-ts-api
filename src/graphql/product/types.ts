export const productTypes = `
    type Product {
        id: ID
        name: String
        archived: Boolean
        price: Float
        category: [Category]
    }

    type Query {
        dummy: Boolean
    }
    
    type Mutation {
        dummy: Boolean
    }

    extend type Query {
        getProducts: [Product]
    }
`;
