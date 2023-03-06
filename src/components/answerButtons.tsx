import type {FC} from "preact/compat";
import {nanoid} from "nanoid";


interface buttonProps{
    correctAnswer: string,
    allAnswers: string[],
    id: string,
    handleAnswerButtonClick(id:string,isCorrect:boolean,answer:string): void;
    isAnswered:boolean
}

const AnswerButtons: FC<buttonProps> =  ({correctAnswer,allAnswers,id,handleAnswerButtonClick,isAnswered}) => {


    const handleButtonClick = (answer:string) => {
        const isCorrect = answer === correctAnswer
        handleAnswerButtonClick(id,isCorrect,answer)
    };

    return(
        <>
        <main>
            <div className="flex justify-center gap-5">
                {allAnswers.map((ans) =>{
                    return(
                        <button key={nanoid()} className={`text-black text-sm p-2 rounded-lg transition hover:bg-orange-300 w-44 text-base font-semibold disabled:pointer-events-none active:translate-y-1
                        ${!isAnswered && "bg-slate-500"} ${(isAnswered && ans === correctAnswer) && "bg-lime-400"} ${(isAnswered && ans !== correctAnswer) && "bg-red-400"} `}
                                disabled={isAnswered}
                                onClick={() => handleButtonClick(ans)}>{ans}</button>
                    )
                })}
            </div>
        </main>
        </>
    )
}

export default AnswerButtons