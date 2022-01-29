import AppError from "./models/appError";

const transformError = (error: unknown, name: string, message: string) => {
  console.error(error);
  if (error instanceof Error) {
    return new AppError(name, message, error.stack);
  } else {
    return new Error(`Unknown error occured when calling ${name}`);
  }
};

export default transformError;
