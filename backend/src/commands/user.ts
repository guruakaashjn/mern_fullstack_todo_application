import { z } from "zod";

class UserValidation {
  validateCreateUser = async (command) => {
    const schema = z
      .object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
      })
      .strict();

    const result = schema.safeParse(command);
    return result.success;
  };

  validateLoginUser = async (command) => {
    const schema = z
      .object({
        email: z.string(),
        password: z.string(),
      })
      .strict();

    const result = schema.safeParse(command);
    return result.success;
  };

  validateLogoutUser = async (command) => {
    const schema = z
      .object({
        email: z.string(),
      })
      .strict();

    const result = schema.safeParse(command);
    return result.success;
  };
}

const userValidation = new UserValidation();
export default userValidation;
