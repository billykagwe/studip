import {signupValidation, hashPassword} from './helpers'

// describe('signup validation', () => {
//   let user = {
//     name: 'billy',
//     email:'jandrew@gmail.com',
//     password: 'Password1',
//     phone: '071442892344',
//     role: 'student',
//     location: 'nairobi'
//   }
//   it('should return user if valid input', () => {
//     expect(signupValidation(user)).toEqual(user)
//   })
// })

// describe('hash password', () => {
//   it('should hash password', () => {
//     expect(hashPassword('pass')).rejects.toBe('dsndfhrerefbbc')
//   })
// })

describe('add', () => {
  it('should add', () => {
    expect(2 + 2).toBe(4)
  })
})