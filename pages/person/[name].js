import {useRouter} from 'next/router'
export default function Person(props){
    const router = useRouter()
    const {name} = router.query
    return name 
}