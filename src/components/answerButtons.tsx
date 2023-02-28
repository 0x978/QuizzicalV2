import {FC} from "preact/compat";
import {useEffect, useState} from "react";
import {nanoid} from "nanoid";


interface buttonProps{
    correctAnswer: string,
    incorrectAnswers: string[],
}

const AnswerButtons: FC<buttonProps> = ({correctAnswer,incorrectAnswers}) => {
    const [answers,setAnswers] = useState<string[]>([])
    const [canClick,setCanClick] = useState<boolean>(true)

    useEffect(() =>{
        let tempAns:string[] = []
        incorrectAnswers.forEach((ans) => tempAns.push(ans))
        tempAns.push(correctAnswer)
        tempAns = shuffleStringArray(tempAns)
        setAnswers(tempAns)
    },[])

    function shuffleStringArray(array: string[]): string[] {
        const shuffledArray:string[] = [...array];

        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }

        return shuffledArray;
    }


    const handleButtonClick = (answer:string) => {
        const correct = answer === correctAnswer
        setCanClick(false)
        // onAnswerClicked(correct) TODO was causing state re-render in parent. Not really necessary, can probably find another way.
    };

    return(
        <>
        <main>
            <div className="flex justify-center gap-5">
                {answers.map((ans) =>{
                    return(
                        <button key={nanoid()} className={`text-black text-sm p-2 rounded-lg transition hover:bg-orange-300 w-44 text-base font-semibold disabled:pointer-events-none active:translate-y-1
                        ${canClick && "bg-slate-500"} ${(!canClick && ans === correctAnswer) && "bg-lime-400"} ${(!canClick && ans !== correctAnswer) && "bg-red-400"} `}
                                disabled={!canClick}
                                onClick={() => canClick && handleButtonClick(ans)}>{ans}</button>
                    )
                })}
            </div>
        </main>
        </>
    )
}

export default AnswerButtons