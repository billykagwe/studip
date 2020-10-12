const { makeVar, InMemoryCache,gql} = require("@apollo/client");

export const schoolFilterText = makeVar("")
export const filterCriteria = makeVar('course')
export const newRecruits = makeVar([])
export const isLoggedIn = makeVar()
export const attached = makeVar(false)
export const toggleModal = makeVar({recruit:false,listing:false,upload:false,profile:false})
export const page = makeVar(0)
export const studentFilter = makeVar({
  attached:null,
  term:"",
  offset:0,
  limit:10,
  course: ""
})

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;


export const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          studentFilter: {
            read() {
              return studentFilter();
            }},
          filterCriteria: {
            read() {
                return filterCriteria();
              }
          },
          limit: {
            read() {
                return page();
              }
          },
          isLoggedIn: {
            read(){
              return isLoggedIn(!!localStorage.getItem('token'))
            }
          },
          schoolFilterText: {
            read(){
              return schoolFilterText()
            }
          },
          attached: {
            read(){
              return attached()
            }
          },
          selectedStudents: {
            read(){
              return newRecruits()
            }
          },
          modalState: {
            read(){
              return toggleModal()
            }
          }
          
        }
      }
    }
  });
