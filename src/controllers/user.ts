import { ApiResponse } from "../utils/apiResponse";
import { ApiError } from "../utils/apiError";
import axios from "axios";
import type { Request, Response } from "express";

const getUser = async (req: Request, res: Response): Promise<void> => {
  const { username } = req.query;

  try {
    const response = await axios.get(
      `https://api.hikerapi.com/v1/user/by/username?username=${username}&access_key=0MnHRZTg76crNY4VvvGVGcQgbpFIxsxf`
    );
    console.log("data fetched successfully: ", response.data);
    res
      .status(200)
      .json(new ApiResponse(200, response.data, "data fetched successfully"));
  } catch (error: any) {
    console.log("error fetching data", error.message);
    res.status(400).json(new ApiError(400, "failed to fetched the data"));
  }
};

export { getUser };
