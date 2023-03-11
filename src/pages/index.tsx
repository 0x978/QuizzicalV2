import { type NextPage } from "next";
import Head from "next/head";
import { signIn,useSession } from "next-auth/react";
import {useRouter} from "next/router";
import Swal from "sweetalert2";
import { MdAccountCircle } from "react-icons/md";

const Home: NextPage = () => {
    const {data: session} = useSession()
    const router = useRouter()

    async function handleGameStart(gamemode:string){
        await router.push({
            pathname: "/questionDisplay",
            query: {
                gamemode: gamemode
            }
        })
    }

    function handleSettings(){
        if(!session){
            void Swal.fire({
                title:"Login?",
                text: 'By Logging in you will have access to features such as statistics and game history',
                icon:"question",
                showConfirmButton: true,
                showDenyButton: true,
                confirmButtonText:"Continue",
                denyButtonText:"Cancel",
            }).then((result) => {if(result.isConfirmed){void signIn()}})
        }
        else{
            void router.push("/settings")
        }
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
                          <button className="text-white bg-green-600 p-2 rounded-full transition hover:bg-green-700 w-44 text-base font-semibold " type="button" onClick={(() => void handleGameStart("easy"))} >Easy</button>
                          <button className="text-white bg-orange-600 p-2 rounded-full transition hover:bg-orange-700 w-44 text-base font-semibold " type="button" onClick={(() => void handleGameStart("medium"))}>Medium</button>
                          <button className="text-white bg-red-600 text-sm p-2 rounded-full transition hover:bg-red-700 w-44 text-base font-semibold" type="button" onClick={(() => void handleGameStart("hard"))}>Extreme</button>
                      </div>
                      <h3 className="text-xl pt-6 font-bold">Or, play from one of the following preselected categories!</h3>
                      <div className="m-auto space-x-4 mt-2 ">
                          <button className="text-white bg-pink-600 p-2 rounded-full transition hover:bg-pink-800 w-44 text-base font-semibold " type="button" onClick={(() => void handleGameStart("1980s"))}>80&apos;s Trivia</button> {/*https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-unescaped-entities.md */}
                          <button className="text-white bg-cyan-700 p-2 rounded-full transition hover:bg-cyan-800 w-44 text-base font-semibold " type="button" onClick={(() => void handleGameStart("sport_and_leisure"))}>Sport</button>
                          <button className="text-white bg-purple-600 p-2 rounded-full transition hover:bg-purple-700 w-44 text-base font-semibold" type="button" onClick={(() => void handleGameStart("music"))}>Music</button>
                          <button className="text-white bg-gray-600  p-2 rounded-full transition hover:bg-gray-700 w-44 text-base font-semibold" type="button" onClick={(() => void handleGameStart("film_and_tv"))}>Film & TV</button>
                      </div>
                      <div className="m-auto space-x-4 mt-5 ">
                          <button className="text-white bg-emerald-700 p-2 rounded-full transition hover:bg-emerald-800 w-44 text-base font-semibold " type="button" onClick={(() => void handleGameStart("arts_and_literature"))}>Art and literature</button>
                          <button className="text-white bg-amber-800 p-2 rounded-full transition hover:bg-amber-900 w-44 text-base font-semibold " type="button" onClick={(() => void handleGameStart("food_and_drink"))}>Food and Drink</button>
                          <button className="text-white bg-lime-700 p-2 rounded-full transition hover:bg-lime-800 w-44 text-base font-semibold" type="button" onClick={(() => void handleGameStart("geography"))}>Geography</button>
                          <button className="text-white bg-fuchsia-700 p-2 rounded-full transition hover:bg-fuchsia-800 w-44 text-base font-semibold" type="button" onClick={(() => void handleGameStart("history"))}>History</button>
                      </div>

                      <h3 className="pt-6 text-lg font-bold">Average Score:</h3>

                      <div className="m-auto mt-2 flex flex-col md:flex-row md:items-center md:justify-center space-y-2 md:space-y-0 md:space-x-4">
                          <button className="text-white bg-gray-700 text-sm p-2 rounded-full transition hover:bg-gray-800 w-40 h-11 text-base font-semibold" type="button" onClick={() => handleSettings()}>
                              {session ? "Settings" : "Login"}
                          </button>
                          {session && (
                              <button className="text-white bg-zinc-600 text-sm p-2 rounded-full transition hover:bg-zinc-800 w-40 h-11 text-base font-semibold flex items-center justify-center" type="button" onClick={() => void router.push("/profile")}>
                                  <div className="flex items-center">
                                      <MdAccountCircle className="relative top-0.4" size={22}/>
                                      <span className="ml-2">{session.user.name}</span>
                                  </div>
                              </button>
                          )}
                      </div>



                  </div>
              </div>
          </div>
      </main>

    </>
  );
};

export default Home;




