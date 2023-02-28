import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import {useRouter} from "next/router";

const Home: NextPage = () => {
    const router = useRouter()

    async function handleGameStart(gamemode:string){
        router.push({
            pathname:"/questionDisplay",
            query:{
                gamemode:gamemode
            }
        })
    }

  return (
    <>
      <Head>
        <title> Quizzical 2 </title>
        <meta name="description" content = "generated by create-t3-app" />
        <link rel = "icon" href= "/favicon.ico" />
      </Head>

      <main>
          <div className="flex h-screen ">
              <div className="m-auto">
                  <div className="text-indigo-500 text-center">
                      <h1 className="text-5xl align-middle font-extrabold">Quizzical</h1>
                      <h3 className="text-xl pt-6 font-bold">A quiz game with different questions each time you play!</h3>
                      <h3 className="pt-6 text-lg font-bold">Select a difficulty below to get started!</h3>
                      <div className="m-auto space-x-4 mt-2 ">
                          <button className="text-white bg-green-600 text-sm p-2 rounded-full transition hover:bg-green-700 w-44 text-base font-semibold " type="button" onClick={(() => handleGameStart("easy"))} >Easy</button>
                          <button className="text-white bg-orange-600 text-sm p-2 rounded-full transition hover:bg-orange-700 w-44 text-base font-semibold " type="button" onClick={(() => handleGameStart("medium"))}>Medium</button>
                          <button className="text-white bg-red-600 text-sm p-2 rounded-full transition hover:bg-red-700 w-44 text-base font-semibold" type="button" onClick={(() => handleGameStart("hard"))}>Extreme</button>
                      </div>
                      <h3 className="text-xl pt-6 font-bold">Or, play from one of the following preselected categories!</h3>
                      <div className="m-auto space-x-4 mt-2 ">
                          <button className="text-white bg-pink-600 text-sm p-2 rounded-full transition hover:bg-pink-800 w-44 text-base font-semibold " type="button" onClick={(() => handleGameStart("1980's"))}>80's Trivia</button>
                          <button className="text-white bg-cyan-700 text-sm p-2 rounded-full transition hover:bg-cyan-800 w-44 text-base font-semibold " type="button" onClick={(() => handleGameStart("sport_and_leisure"))}>Sport</button>
                          <button className="text-white bg-purple-600 text-sm p-2 rounded-full transition hover:bg-purple-700 w-44 text-base font-semibold" type="button" onClick={(() => handleGameStart("music"))}>Music</button>
                          <button className="text-white bg-gray-600 text-sm p-2 rounded-full transition hover:bg-gray-700 w-44 text-base font-semibold" type="button" onClick={(() => handleGameStart("film_and_tv"))}>Film & TV</button>
                      </div>
                      <div className="m-auto space-x-4 mt-5 ">
                          <button className="text-white bg-emerald-700 text-sm p-2 rounded-full transition hover:bg-emerald-800 w-44 text-base font-semibold " type="button" onClick={(() => handleGameStart("arts_and_literature"))}>Art and literature</button>
                          <button className="text-white bg-amber-800 text-sm p-2 rounded-full transition hover:bg-amber-900 w-44 text-base font-semibold " type="button" onClick={(() => handleGameStart("food_and_drink"))}>Food and Drink</button>
                          <button className="text-white bg-lime-700 text-sm p-2 rounded-full transition hover:bg-lime-800 w-44 text-base font-semibold" type="button" onClick={(() => handleGameStart("geography"))}>Geography</button>
                          <button className="text-white bg-fuchsia-700 text-sm p-2 rounded-full transition hover:bg-fuchsia-800 w-44 text-base font-semibold" type="button" onClick={(() => handleGameStart("history"))}>History</button>
                      </div>

                      <h3 className="pt-6 text-lg font-bold">Average Score:</h3>
                      <button className="text-white bg-gray-700 text-sm p-2 rounded-full transition hover:bg-gray-800 w-56 h-11 text-base font-semibold" type="button">Settings</button>

                  </div>
              </div>
          </div>

      </main>

    </>
  );
};

export default Home;




