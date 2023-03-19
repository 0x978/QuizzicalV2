import {createTRPCRouter, publicProcedure} from "~/server/api/trpc";
import {z} from "zod"

const quizQuestionSchema = z.object({
    questions:  z.array(z.string()),
    correctAns: z.array(z.string()),
    selectedAnswers: z.array(z.string()),
    allAnswers: z.array(z.array(z.string())),
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
            return await prisma.quiz.create({
                data: {
                    userId,
                    quizData,
                    score,
                    date,
                },
            })
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

    getQuizIDByUserID: publicProcedure
        .input(z.object({
            userId: z.string(),
        }))
        .query(async ({ input: { userId }, ctx: { prisma } }) => {
            try {
                return await prisma.quiz.findMany({
                    where: {
                        userId: userId,
                    },
                    select: {
                      id:true,
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

    getQuizzesByQuizID: publicProcedure
        .input(z.object({
            quizID: z.number(),
        }))
        .query(async ({ input: { quizID }, ctx: { prisma } }) => {
            try {
                return await prisma.quiz.findUnique({
                    where: {
                        id: quizID,
                    },
                });
            } catch (error) {
                console.error(error);
                throw new Error('Failed to fetch quiz');
            }
        }),

    deleteAccount: publicProcedure
        .input(z.object({
            userId:z.string(),
        }))
        .mutation(async ({input: {userId},ctx: {prisma}}) =>{
            return await prisma.user.delete({
                where: {
                    id:userId
                },
            })
        }),

})