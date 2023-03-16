import {type FC, useEffect, useState} from "react"

interface profileQuizDataProps{
    date: number,
    index:number,
    score:number,
}

const ProfileQuizSelect: FC<profileQuizDataProps> = ({date,index,score}) => {
    const [localeDate,setLocaleDate] = useState<string>("")



    useEffect(() => { // date formatting stuff
        const customFormattedDate = new Intl.DateTimeFormat(undefined, {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true,
        }).format(new Date(date));
        setLocaleDate(customFormattedDate)
    },[])

    return (
        <>
            <div className="relative flex flex-col justify-center items-center bg-gray-800 rounded-lg my-5 py-2 shadow-lg cursor-pointer hover:scale-110 transition duration-300">
                <div className="absolute top-0 left-0 w-full h-full bg-green-400 opacity-0 rounded-lg z-10 hover:opacity-25 transition duration-300"></div>
                <h1 className="text-white text-xl font-bold mb-2"> Game {index+1} </h1>
                <h1 className="text-gray-300 text-lg mb-2"> Score: {score} </h1>
                <h1 className="text-gray-300 text-lg"> Date: {localeDate} </h1>
            </div>


        </>
    )
}

export default ProfileQuizSelect

