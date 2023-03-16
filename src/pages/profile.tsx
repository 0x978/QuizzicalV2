import {type FC, useState} from "react"
import type {GetServerSidePropsContext} from "next";
import {getServerAuthSession} from "~/server/auth";
import {api} from "~/utils/api";
import {useSession} from "next-auth/react";
import ProfileQuizSelect from "~/components/profileQuizSelect";
import {nanoid} from "nanoid";
import {useRouter} from "next/router";
import type {quizType} from "../../types/types";


const Profile: FC = ({}) => {
    const {data: session} = useSession()
    const [scoreArray,setScoreArray] = useState<number[]>([])

    const router = useRouter()
    function handleGameStart(gameID:number){
         void router.push({
            pathname: "/profileQuizView",
            query: {
                gameID: gameID
            }
        })
    }


    const { data: quizData,isLoading:quizLoading} = api.quiz.getQuizzesByID.useQuery(
        {
            userId: session!.user.id,
        },
        {
            onSuccess(response: quizType[]) {
                const score:number[] = []
                response.forEach(quiz => {
                    score.push(quiz.score)
                })
                setScoreArray(score)
            }
        }
    );

    const { data: quizIds,isLoading:IDloading} = api.quiz.getQuizIDByUserID.useQuery(
        {
            userId: session!.user.id,
        },
    );

    if(!quizData || quizLoading || IDloading ) return <p className="text-white">Loading...</p>


    return (
        <main className="flex h-screen">
            <div className="m-auto text-indigo-500 ">

                <div className="text-center">
                    <h1 className="text-5xl align-middle font-extrabold">Profile</h1>
                    <h3 className="text-xl pt-6 font-bold">Here you can view the last 5 games you played.</h3>
                </div>


                {scoreArray.length > 0 ? (
                    scoreArray.map((value,i) => { // this is bad
                        return quizIds?.[i]?.id ? (
                            <div onClick={() => handleGameStart(quizIds[i].id)} key={i} >
                                <ProfileQuizSelect key={nanoid()} date={Date.parse(quizData[i]?.date)} index={i} score={scoreArray[i]} />
                            </div>
                        )
                            :
                            <h1>Fatal Error occurred</h1>
                    })
                ) : (
                    <div className="text-center my-10">
                        {quizLoading || IDloading ? <h1>Loading...</h1> : <p className="text-red-400 font-extrabold text-xl ">Please play a game before attempting to view your statistics</p>}
                    </div>

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