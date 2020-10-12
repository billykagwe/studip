const { SchemaDirectiveVisitor, AuthenticationError } = require('apollo-server-micro')
const { defaultFieldResolver } = require('graphql')

class AuthenticationDirective extends SchemaDirectiveVisitor{
    visitFieldDefinition(field){
        const resolver = field.resolve || defaultFieldResolver

        field.resolve = async(root,args,ctx,info) => {
            if(!ctx.userId){
                throw new AuthenticationError('Unauthorized')
            }
            return resolver(root,args,ctx,info)
        }
    }
}

class AuthorizationDirective extends SchemaDirectiveVisitor{
    visitFieldDefinition(field){
        const resolver = field.resolve || defaultFieldResolver
        const {role} = this.args

        field.resolve = async(root,args,ctx,info) => {
            if(ctx.user.role !== role){
                throw new AuthenticationError('Unauthorized')
            }
            return resolver(root,args,ctx,info)
        }
    }
}

module.exports = {
    AuthorizationDirective,
    AuthenticationDirective
}