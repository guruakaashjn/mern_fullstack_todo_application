import { z } from "zod";

class TodoEntryValidation {
  validateCreateTodoEntry = async (command) => {
    const schema = z
      .object({
        name: z.string(),
        description: z.string(),
        enabled: z.boolean(),
        status: z.enum(["Not Started", "In Progress", "Completed", "Halted"]),
      })
      .strict();

    const result = schema.safeParse(command);
    return result.success;
  };

  validateEditTodoEntry = async (command, params) => {
    const bodySchema = z.object({
      name: z.string().optional(),
      description: z.string().optional(),
      enabled: z.boolean().optional(),
      status: z
        .enum(["Not Started", "In Progress", "Completed", "Halted"])
        .optional(),
    });
    const bodyResult = bodySchema.safeParse(command);

    const paramsSchema = z
      .object({
        id: z.string(),
      })
      .strict();
    const paramsResult = paramsSchema.safeParse(params);

    const result = bodyResult.success && paramsResult.success;
    return result;
  };

  validateDeleteTodoEntry = async (params) => {
    const schema = z
      .object({
        id: z.string(),
      })
      .strict();

    const result = schema.safeParse(params);
    return result.success;
  };

  validateGetTodoEntry = async (params) => {
    const schema = z
      .object({
        id: z.string(),
      })
      .strict();

    const result = schema.safeParse(params);
    return result.success;
  };
}

const todoEntryValidation = new TodoEntryValidation();
export default todoEntryValidation;
