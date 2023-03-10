import {createTRPCRouter, publicProcedure} from "~/server/api/trpc";
import {z} from "zod"

const quizQuestionSchema = z.object({
    questions:  z.array(z.string()),
    correctAns: z.array(z.string()),
    answers: z.array(z.string()),
});

export const quizRouter = createTRPCRouter({

    createQuiz: publicProcedure
        .input(z.object({
            userId:z.string(),
            quizData: quizQuestionSchema,
            score: z.number(),
            date : z.string(),
        }))
        .mutation(async ({input: {userId,quizData,score,date},ctx: {prisma}}) =>{
            const item = await prisma.quiz.create({
                data:{
                    userId,
                    quizData,
                    score,
                    date,
                },
            })
            return item
        }),

    getQuizzesByID: publicProcedure
        .input(z.object({
            userId: z.string(),
        }))
        .query(async ({ input: { userId }, ctx: { prisma } }) => {
            try {
                return await prisma.quiz.findMany({
                    where: {
                        userId: userId,
                    },
                    orderBy: {
                        date: 'desc',
                    },
                    take: 5,
                });
            } catch (error) {
                console.error(error);
                throw new Error('Failed to fetch quizzes');
            }
        }),



})