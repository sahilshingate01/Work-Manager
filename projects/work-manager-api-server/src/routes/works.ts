import { Router, type Request, type Response } from "express";
import { db, worksTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";

const router = Router();

router.get("/works", async (_req: Request, res: Response) => {
  try {
    const works = await db
      .select()
      .from(worksTable)
      .orderBy(desc(worksTable.createdAt));
    const serialized = works.map((w) => ({
      ...w,
      createdAt: w.createdAt.toISOString(),
      updatedAt: w.updatedAt.toISOString(),
    }));
    res.json(serialized);
  } catch (err) {
    console.error("Error fetching works:", err);
    res.status(500).json({ error: "Failed to fetch works" });
  }
});

router.post("/works", async (req: Request, res: Response) => {
  try {
    const { title, details, link, summary, date } = req.body;
    if (!title || !details || !date) {
      res.status(400).json({ error: "title, details, and date are required" });
      return;
    }
    const [work] = await db
      .insert(worksTable)
      .values({ title, details, link: link || null, summary: summary || null, date })
      .returning();
    res.status(201).json({
      ...work,
      createdAt: work.createdAt.toISOString(),
      updatedAt: work.updatedAt.toISOString(),
    });
  } catch (err) {
    console.error("Error creating work:", err);
    res.status(500).json({ error: "Failed to create work" });
  }
});

router.get("/works/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const [work] = await db.select().from(worksTable).where(eq(worksTable.id, id));
    if (!work) {
      res.status(404).json({ error: "Work not found" });
      return;
    }
    res.json({
      ...work,
      createdAt: work.createdAt.toISOString(),
      updatedAt: work.updatedAt.toISOString(),
    });
  } catch (err) {
    console.error("Error fetching work:", err);
    res.status(500).json({ error: "Failed to fetch work" });
  }
});

router.put("/works/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const { title, details, link, summary, date } = req.body;
    const [updated] = await db
      .update(worksTable)
      .set({
        ...(title !== undefined && { title }),
        ...(details !== undefined && { details }),
        ...(link !== undefined && { link: link || null }),
        ...(summary !== undefined && { summary: summary || null }),
        ...(date !== undefined && { date }),
        updatedAt: new Date(),
      })
      .where(eq(worksTable.id, id))
      .returning();
    if (!updated) {
      res.status(404).json({ error: "Work not found" });
      return;
    }
    res.json({
      ...updated,
      createdAt: updated.createdAt.toISOString(),
      updatedAt: updated.updatedAt.toISOString(),
    });
  } catch (err) {
    console.error("Error updating work:", err);
    res.status(500).json({ error: "Failed to update work" });
  }
});

router.delete("/works/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const [deleted] = await db
      .delete(worksTable)
      .where(eq(worksTable.id, id))
      .returning();
    if (!deleted) {
      res.status(404).json({ error: "Work not found" });
      return;
    }
    res.json({ success: true, message: "Work deleted successfully" });
  } catch (err) {
    console.error("Error deleting work:", err);
    res.status(500).json({ error: "Failed to delete work" });
  }
});

export default router;
