import {gql} from 'apollo-server-micro'


const typeDefs = gql`
enum Role {
    STUDENT
    SCHOOL
    COMPANY
}
  directive @authenticated on FIELD_DEFINITION
  directive @authorized(role: Role! = ADMIN) on FIELD_DEFINITION

   type User {
       id: ID
       email: String
       password: String
       role: String
   }

   type School {
       id:ID
       location: String!
       name: String!
       phone: String!
       user: User!
       students(filter: StudentFilter): [Student]
   }

   type Student {
       id:ID
       email:String
       name: String!
       course: String!
       adm: String
       referee1: String
       referee2: String
       phone: String
       trainings: String
       skills: String
       personal_statement: String
       hobbies: String
       voluntary_work: String
       education1: String
       education2: String
       company_id: String
       attached: Boolean
       school_id: String
       user: User!
       school: School!
       company: Company
   }

   input ListingsFilter{
       title: String
   }

   input StudentsFilter{
       term: String
   }

   input LoginInput {
       email:String!
       password:String!
   }

   input ListingInput {
        positions: Int!,
        title: String!
   }

   input RecruitInput {
        recruits: [String!]!
        id: ID!
   }


   input newStudent {
        name: String!
        adm: String!
        email: String!
   }

   input UploadInput{
       students: [[String!]]!
       course: String!
   }

   input ProfileInput {
        referee1: String!
        referee2: String!
        phone: String!
        trainings: String!
        skills: String!
        personal_statement: String!
        hobbies: String!
        voluntary_work: String!
        education1: String!
        education2: String!
        company_id: String!
   }

   input CompanyInput {
        location: String!
        name: String!
        phone: String!
        description: String!
        email: String!
        password: String!
        role: Role! 
   }

   input SchoolInput {
        location: String!
        name: String!
        phone: String!
        email:String!
        password: String!
        role: Role! 
   }

   input FilterInput {
       criteria: String
       term: String
   }

   type Error {
       path: String!
       error: String!
   }

   type LoginResponse {
       ok:Boolean!
       msg: String
       token: String
   }

   type Company {
       id: ID!
       location: String!
       name: String!
       phone: String!
       description: String!
       user:User!
       listings(filter: ListingsFilter): [Listing]
   }

   type Listing {
       positions: Int,
       title: String!
       company_id: String!
       recruits: [Student]
       company: Company
       id: ID!
   }

   input StudentFilter {
       attached:Boolean,
       term:String
       offset:Int,
       limit:Int,
       course: String
   }

   type FilterResponse {
       name: String!
       email: String!
       course: String!
       school: String!
       company: String!
   }

   type Query{
       users: [User!]
       schools(filter: String): [School]
       students(filter:String): [Student]
       companies: [Company]
       listings(filter:String): [Listing] 
       me: User! @authenticated
       company: Company! @authenticated
       school: School! @authenticated
       filterStudents(input: FilterInput): FilterResponse!
       courses(schoolId:ID): [String!]
       student(id: ID!): Student
   }



   type Mutation {
    login(input:LoginInput!): LoginResponse!
    newListing(input:ListingInput): Listing! @authenticated
    recruit(input: RecruitInput): String!
    companySignup(input:CompanyInput!):String!
    schoolSignup(input:SchoolInput!):String!
    updateProfile(input: ProfileInput!): Student!
    uploadStudents(input: UploadInput!): [String!] @authenticated
   }

`

export default typeDefs