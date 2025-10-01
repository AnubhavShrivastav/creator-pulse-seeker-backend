import { ApiResponse } from "../utils/apiResponse";
import { ApiError } from "../utils/apiError";
import axios from "axios";
import Creator from "../models/creator.schema";
import { data } from "../constant";
import type { Request, Response } from "express";

const getUser = async (req: Request, res: Response) => {
  const { username } = req.query;
  console.log(username);

  try {
    let findUser = await Creator.findOne({ username: username });
    console.log("user found: ", findUser);

    if (findUser) {
      const userSavedinDBDate = findUser?.createdAt?.toDateString();
      const userCurrentDate = new Date().toDateString();
      console.log(userSavedinDBDate);
      console.log(userCurrentDate);

      if (userSavedinDBDate != userCurrentDate) {
        const response: any = await axios.get(
          `${process.env.SERVER_URL}${username}&${process.env.ACCESS_KEY}`
        );
        const userKey = findUser.pk;
        const newData = response.data;
        console.log(userKey);
        console.log(newData);

        const replacedata = await Creator.replaceOne({ pk: userKey }, newData);
        return res
          .status(200)
          .json(
            new ApiResponse(
              200,
              { newData, replacedata },
              "updated the data in db with latest data"
            )
          );
      } else {
        return res
          .status(200)
          .json(
            new ApiResponse(200, { findUser }, "User Found Successfully in DB")
          );
      }
    } else {
      const response: any = await axios.get(
        `${process.env.SERVER_URL}${username}&${process.env.ACCESS_KEY}`
      );
      console.log("fromfetch: ", response.data);

      const createUser = await Creator.create(response.data);
      console.log("create User: ", createUser);

      return res
        .status(200)
        .json(
          new ApiResponse(200, { createUser }, "new creator added in the db")
        );
    }
  } catch (error: any) {
    console.log("error fetching data", error);
    res.status(400).json(new ApiError(400, "failed to fetched the data"));
  }
};

export { getUser };
