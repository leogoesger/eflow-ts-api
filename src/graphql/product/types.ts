export const productTypes = `
    type Product {
        id: ID
        name: String
        archived: Boolean
        price: Float
        category: [Category]
    }

    input CreateProductPayload {
        name: String
        price: Float
        archived: Boolean
    }

    extend type Query {
        getProducts: [Product]
    }

    extend type Mutation {
        createProduct (productPayload: CreateProductPayload): Product
    }
`;
