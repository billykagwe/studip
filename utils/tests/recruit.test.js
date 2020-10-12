import recruit_student from '../../pages/api/recruit'

describe('recruit student', () => {
    it('should succesfully recruit a student', async() => {
        const req = {
            body: {
                student_id:'0b22105e-d639-437e-880e-edb4fa0b8be0',
                listing_id:1,
                name:'billy',
                email:'billmwas2@gmail.com',
                onboarding_details: 'welcome'
            } 
        }
        const res = await recruit_student(req)
        expect(res).toBe('Recruiting student failed')
    })
})
