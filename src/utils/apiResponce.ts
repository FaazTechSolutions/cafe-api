export const successResponse = (data: any, message = "Success") => {
  return {
    status: "success",
    message,
    data,
  };
};

export const errorResponse = (message: string, data: any = null) => {
  return {
    status: "error",
    message,
    data,
  };
};
