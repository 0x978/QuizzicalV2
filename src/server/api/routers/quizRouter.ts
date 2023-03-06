import {createTRPCRouter, publicProcedure} from "~/server/api/trpc";
import {z} from "zod"
import {Simulate} from "react-dom/test-utils";
import select = Simulate.select;

const quizQuestionSchema = z.object({
    question: z.string(),
    shuffled: z.array(z.string()),
    correct: z.string(),
    id: z.string(),
});

export const quizRouter = createTRPCRouter({

    createQuiz: publicProcedure
        .input(z.object({
            userId:z.string(),
            quizData: z.object({
                quizQuestions: z.array(quizQuestionSchema),
                answers: z.array(z.string()),
            }),
            score: z.number()
        }))
        .mutation(async ({input: {userId,quizData,score},ctx: {prisma}}) =>{
            const item = await prisma.quiz.create({
                data:{
                    userId,
                    quizData,
                    score,
                },
            })
            return item
        }),

    getQuizzesByID: publicProcedure
        .input(z.object({
            userId:z.string(),
        }))
        .query(async ({input:{userId},ctx:{prisma}}) => {
            const data = prisma.user.findUnique({
                where: {
                    id: userId
                },
                select: {quizzes: true}
            }).quizzes()
            return data
        })

})