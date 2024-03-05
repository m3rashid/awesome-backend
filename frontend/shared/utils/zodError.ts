import { ZodObject } from 'zod';

export const zodValidate = (
  schema: ZodObject<any>,
  formValues: any,
  errorKeys: string[]
) => {
  const parse = schema.safeParse(formValues);
  if (parse.success) {
    return null;
  }

  return parse.error.issues.reduce<Record<string, string>>((acc, issue) => {
    if (errorKeys.includes(issue.path[0] as string)) {
      return { ...acc, [issue.path[0] as string]: issue.message };
    }
    return acc;
  }, {});
};
