export const resolvers = {
    Query: {
        warriors: (obj, args, context, info) => context.warriors,
    }
}