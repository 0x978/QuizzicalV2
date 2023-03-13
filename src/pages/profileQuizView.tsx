import {useRouter} from "next/router";
import {api} from "~/utils/api";
import {useState} from "react";
import {quizType} from "../../types/types";


const ProfileQuizView = () => {
    const [fetchedQuiz,setFetchedQuiz] = useState<quizType>()
    const router = useRouter();
    const { gameID } = router.query;

    const { data: quizData,isLoading } = api.quiz.getQuizzesByQuizID.useQuery<quizType>({
        quizID:Number.parseInt(gameID as string)
    },{
        onSuccess(quiz){
            if (quiz === null) {
                return;
            }
            console.log(quiz)
            setFetchedQuiz(quiz);
        }
    })

    console.log(quizData)

    return <>
        {!gameID || isLoading || !fetchedQuiz ? (
            <h1>Loading...</h1>
            )
            :
        <div className="flex h-screen">
            <div className="m-auto">

                <div className="text-center text-indigo-500 font-extrabold ">
                    <h1 className="text-5xl my-5 ">Game Results </h1>
                    <h1 className="my-3" >Game Number: {gameID} </h1>
                    <h1 className="my-3">score: {fetchedQuiz.score} out of 5</h1>
                </div>

            {fetchedQuiz?.quizData.questions.map((ques,index) => {
                return(
                    <div key={index} className={`p-3 ${fetchedQuiz?.quizData.selectedAnswers[index] === fetchedQuiz?.quizData.correctAns[index] ? "bg-green-800" : "bg-red-900"}`}>
                        <h1 >{ques}</h1>
                        <div className="flex space-x-3"> {/* div for answers*/}
                        {fetchedQuiz?.quizData?.allAnswers[index] // fetches all answers for current question
                            .map((ans,index) => {
                                return(
                                    <h1 key={index} className={`${(ans === fetchedQuiz?.quizData.correctAns[index]) && "text-green-400"}`}>{ans}</h1>
                                )
                            })}
                        </div>
                    </div>
                )

            })}
            </div>
        </div>
        }</>;
};

export default ProfileQuizView;
