import {GetServerSidePropsContext, InferGetServerSidePropsType, NextPage} from "next";
import axios from 'axios';
import AnswerButtons from "~/components/answerButtons";
import Head from "next/head";
import {useEffect, useState} from "react";
import {nanoid} from "nanoid";
import {useRouter} from "next/router";


interface questionData{
    question: string,
    shuffled: string[],
    correct:string,
    id: string,
}

interface questionType {
    question: string,
    correctAnswer: string,
    incorrectAnswers: string[],
    difficulty: string,
}

const QuestionDisplay: NextPage< InferGetServerSidePropsType<typeof getServerSideProps>> = ({questionData}) => {
    const router = useRouter();
    const [score,setScore] = useState<number>(0)
    const [answeredQuestions,setAnsweredQuestions] = useState<string[]>([])


    const handleAnswerButtonClick = (id:string,isCorrect:boolean) => {
        if(isCorrect){
            setScore(prev => prev+1);
        }
        setAnsweredQuestions([...answeredQuestions,id])
        console.log(id,score)
    }

    useEffect(() => {
        if(answeredQuestions.length === 5){
            setTimeout(() =>{
                void router.push({
                    pathname: "/endGame",
                    query:{
                        score:score
                    }
                },"/endGame")
            },500)
        }
    },[answeredQuestions])


    return(
        <>
            <Head>
                <title> Quizzical 2 </title>
                <meta name="description" content = "generated by create-t3-app" />
                <link rel = "icon" href= "/favicon.ico" />
            </Head>

            <main className="flex h-screen">
                <div className="m-auto" >
                    {questionData.map((question:questionData) => {
                        return(
                            <div key={nanoid()} className="text-center max-w-5xl">
                                <h1 key={nanoid()} className="text-xl pt-6 text-indigo-500 font-bold m-2 ">{question.question}</h1>
                                <AnswerButtons
                                    correctAnswer={question.correct}
                                    allAnswers={question.shuffled}
                                    handleAnswerButtonClick={handleAnswerButtonClick}
                                    id={question.id}
                                    isAnswered={answeredQuestions.includes(question.id)}
                                    key={nanoid()}/>
                            </div>
                        )
                    } )}
                </div>

            </main>
        </>
    )
}

export const getServerSideProps = async (context:GetServerSidePropsContext) => {
    const gamemode = context.query.gamemode

    if(gamemode === "easy" || gamemode === "medium" || gamemode === "hard"){
        const {data} = await axios.get<questionType[]>("https://the-trivia-api.com/api/questions?limit=5&tags=1980's")
        const questionData:questionData[] = data.map((q) => {
            return {
                question: q.question,
                shuffled:shuffleAnswers(q.correctAnswer,q.incorrectAnswers),
                correct:q.correctAnswer,
                id: nanoid()
            }
        })
        console.log(questionData)
        return({
            props:{
                questionData:questionData
            }
        })
    }

    else if(gamemode === "1980s"){
        const {data} = await axios.get<questionType[]>("https://the-trivia-api.com/api/questions?limit=5&tags=1980's")
        const questionData:questionData[] = data.map((q) => {
            return {
                question: q.question,
                shuffled:shuffleAnswers(q.correctAnswer,q.incorrectAnswers),
                correct:q.correctAnswer,
                id: nanoid()
            }
        })
        return({
            props:{
                questionData:questionData
            }
        })
    }

    const {data} = await axios.get<questionType[]>(`https://the-trivia-api.com/api/questions?categories=${context.query.gamemode}&limit=5`)


    const questionData:questionData[] = data.map((q) => {
        return {
            question: q.question,
            shuffled:shuffleAnswers(q.correctAnswer,q.incorrectAnswers),
            correct:q.correctAnswer,
            id: nanoid()
        }
    })
    return({
        props:{
            questionData:questionData
        }
    })

    function shuffleAnswers(correctAnswer:string,incorrectAnswers:string[]): string[] {
        const shuffledArray:string[] = [...incorrectAnswers,correctAnswer];

        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }

        return shuffledArray;
    }
}

export default QuestionDisplay;
