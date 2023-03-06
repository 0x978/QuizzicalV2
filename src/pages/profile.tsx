import {FC, useEffect, useState} from "react"
import {GetServerSidePropsContext} from "next";
import {getServerAuthSession} from "~/server/auth";
import {api} from "~/utils/api";
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";



interface quizQuestions{
    correct:string,
    id:string,
    question: string
}

interface quizData{
    answers:string[]
    quizQuestions: quizQuestions[],
}

interface userQuizzes{
    id: number,
    quizData: quizData[],
    score: number,
    userId: string,
}

const Profile: FC = ({}) => {
    const {data: session} = useSession()
    const [userQuizzes,setUserQuizzes] = useState<userQuizzes[]>()

    const {data:quizData} =  api.quiz.getQuizzesByID.useQuery({
        userId: session!.user.id, // TODO find better way to solve error
    },{
        onSuccess(response:userQuizzes[]){
            setUserQuizzes(response)
            console.log(response)
        }
    })



    return(
        <main>
            {userQuizzes ?
                <h1> fetched! </h1>
            :
            <h1>Loading...</h1>
            }
        </main>
    )
}


export const getServerSideProps = async (ctx:GetServerSidePropsContext) => {

    const session = await getServerAuthSession(ctx);

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    return {
        props: { session },
    };
}


export default Profile