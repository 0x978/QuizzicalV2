import {FC, useEffect, useState} from "react"
import {GetServerSidePropsContext} from "next";
import {getServerAuthSession} from "~/server/auth";
import {api} from "~/utils/api";
import {signOut, useSession} from "next-auth/react";
import {useRouter} from "next/router";
import {set} from "immutable";



interface quizQuestions{
    id: string;
    correct: string;
    question: string;
    shuffled: string[];
}

interface quizDataType{
    answers:string[]
    quizQuestions: quizQuestions[],
}

interface userQuizzes{
    id: number,
    userId: string,
    quizData: quizDataType[],
    score: number,
}

type QuizDataWithScore = {
    quizData: quizDataType[],
    score: number
}


const Profile: FC = ({}) => {
    const {data: session} = useSession()

    const [quizRes,setQuizRes] = useState<QuizDataWithScore[]>([])


    const { data: quizData } = api.quiz.getQuizzesByID.useQuery(
        {
            userId: session!.user.id,
        },
        {
            onSuccess(response: userQuizzes[]) {
                let quizDataWithScores: QuizDataWithScore[] = response.map(res => {
                    return {
                        quizData: res.quizData,
                        score: res.score
                    };
                });
                setQuizRes(quizDataWithScores)
            }
        }
    );


    console.log(quizRes)


    return (
        <main>
            {quizRes ? (
                quizRes.map((quiz) => {
                    return <h1>{quiz.score}</h1>;
                })
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