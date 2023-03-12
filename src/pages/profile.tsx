import {type FC, useState} from "react"
import {GetServerSidePropsContext} from "next";
import {getServerAuthSession} from "~/server/auth";
import {api} from "~/utils/api";
import {useSession} from "next-auth/react";
import ProfileQuizSelect from "~/components/profileQuizSelect";
import {nanoid} from "nanoid";

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
    date: string
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
        <main className="flex h-screen">
            <div className="m-auto text-indigo-500 ">

                <div className="text-center">
                    <h1 className="text-5xl align-middle font-extrabold">Profile</h1>
                    <h3 className="text-xl pt-6 font-bold">Here you can view the last 5 games you played.</h3>
                </div>


                {quizData && scoreArray.length > 0 ? (
                    scoreArray.map((value,i) => { // this is bad
                        return (
                            <>
                                <ProfileQuizSelect key={nanoid()} date={Date.parse(quizData[i]?.date)} index={i} score={scoreArray[i]} />
                            </>
                        )
                    })
                ) : (
                    <h1>Loading...</h1>
                )}
            </div>
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