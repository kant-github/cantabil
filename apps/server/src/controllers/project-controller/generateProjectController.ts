import { Request, Response } from "express";
import axios from "axios"; // for Gemini API
import prisma from '../../../../../packages/db/src'

export default async function generateProjectController(req: Request, res: Response) {
    try {
        // 1️⃣ Authentication check
        if (!req.user?.id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        // 2️⃣ Get prompt from request body
        const { prompt, projectName, projectDescription } = req.body;
        if (!prompt) {
            return res.status(400).json({ success: false, message: "Prompt is required" });
        }

        // 3️⃣ Call Gemini 2.5 API to generate project code
        // Replace with your Gemini API endpoint & key
        const geminiResponse = await axios.post(
            "https://api.gemini.ai/v2.5/generate",
            {
                prompt,
                model: "gemini-2.5",
                // add any other options Gemini requires, e.g., temperature, max_tokens
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.GEMINI_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        // Gemini returns generated code as JSON (example)
        const generatedCode = geminiResponse.data?.code || {};

        // 4️⃣ Save project to database
        const project = await prisma.project.create({
            data: {
                name: projectName || "Untitled Project",
                description: projectDescription || "",
                code: generatedCode,
                user: { connect: { id: req.user.id } },
            },
        });

        // 5️⃣ Save initial chat message
        await prisma.chatMessage.create({
            data: {
                projectId: project.id,
                role: "USER",
                content: prompt,
            },
        });

        // Optionally, save AI response as message
        await prisma.chatMessage.create({
            data: {
                projectId: project.id,
                role: "AI",
                content: JSON.stringify(generatedCode), // or a summary if too long
            },
        });

        // 6️⃣ Return project + messages
        const fullProject = await prisma.project.findUnique({
            where: { id: project.id },
            include: { chats: true, user: true },
        });

        res.status(200).json({ success: true, project: fullProject });
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ success: false, message: "Failed to generate project" });
    }
}
