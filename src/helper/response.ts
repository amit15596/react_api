const success = async (statusCode: number, message: string, result: any) => {
  return { code: statusCode, success: true, message: message, data: result };
};

const error = async (statusCode: number, message: string) => {
  return { code: statusCode, success: false, message: message };
};

export default { success, error };
