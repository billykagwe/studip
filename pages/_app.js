import '../output.css'
import Navbar from '../components/Navbar'
import FileData from '../contexts/file/FileData'
import AuthState from '../contexts/auth/State'
import RecruitState from '../contexts/recruit/RecruitState'
import StudentsState from '../contexts/students/StudentsState'

export default function MyApp({ Component, pageProps }) {
    const Layout = Component.Layout ? Component.Layout : React.Fragment

    return (
        <AuthState>
            <FileData>
                <StudentsState>
                    <RecruitState>
                        <Navbar>
                            <Layout>
                                <Component {...pageProps} />
                            </Layout>
                        </Navbar>
                    </RecruitState>
                </StudentsState>
            </FileData>
        </AuthState>
    )
}
