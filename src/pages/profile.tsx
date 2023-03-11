import {type FC, useState} from "react"
import {GetServerSidePropsContext} from "next";
import {getServerAuthSession} from "~/server/auth";
import {api} from "~/utils/api";
import {useSession} from "next-auth/react";

interface quizDataType{
    answers:string[]
    questions: string[]
    correctAns: string[]
}

interface userQuizzes{
    id: number,
    userId: string,
    quizData: quizDataType,
    score: number,
}

const Profile: FC = ({}) => {
    const {data: session} = useSession()
    const [scoreArray,setScoreArray] = useState<number[]>([])
    const [questions,setQuestions] = useState<string[][]>([])
    const [answers,setAnswers] = useState<string[][]>([])
    const [correctAnswers,setCorrectAnswers] = useState<string[][]>([])



    const { data: quizData } = api.quiz.getQuizzesByID.useQuery(
        {
            userId: session!.user.id,
        },
        {
            onSuccess(response: userQuizzes[]) {
                response.forEach(quiz => {
                    setScoreArray(prevState => [...prevState, quiz.score])
                    setQuestions(prevState => [...prevState,quiz.quizData.questions])
                    setAnswers(prevState => [...prevState,quiz.quizData.answers])
                    setCorrectAnswers(prevState => [...prevState,quiz.quizData.correctAns])
                })

            }
        }
    );



    return (
        <main>
            {scoreArray.length > 0 ? (
                <h1>fetched</h1>
            ) : (
                <h1>Loading...</h1>
            )}
        </main>
    );
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