import {FC} from "preact/compat";
import {useEffect, useState} from "react";


interface buttonProps{
    correctAnswer: string,
    incorrectAnswers: string[],
    onAnswerClicked: (isCorrect: boolean) => void,
}

const AnswerButtons: FC<buttonProps> = ({correctAnswer,incorrectAnswers,onAnswerClicked}) => {
    const [answers,setAnswers] = useState<string[]>([])

    if (!correctAnswer || !incorrectAnswers) {
        return null; // or return an error message
    }

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
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // TODO fix type error
        }

        return shuffledArray;
    }


    const handleButtonClick = (answer:string) => {

        //onAnswerClicked(newIsCorrect);
    };

    return(
        <>
        <main>
            <div className="flex justify-center gap-5">
                {answers.map((ans) =>{
                    return(
                        <button className="text-black bg-amber-200 text-sm p-2 rounded-full transition hover:bg-green-700 w-44 text-base font-semibold">{ans}</button>
                    )
                })}
            </div>
        </main>
        </>
    )
}

export default AnswerButtons