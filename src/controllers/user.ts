import { ApiResponse } from "../utils/apiResponse";
import { ApiError } from "../utils/apiError";
import axios from "axios";
import Creator from "../models/creator.schema";
// import { data } from "../constant";
import type { Request, Response } from "express";

const findUserByUsername = async (username: any) => {
  const response: any = await axios.get(
    `${process.env.SERVER_URL}${username}&${process.env.ACCESS_KEY}`
  );

  return response.data;
};

const getUser = async (req: Request, res: Response) => {
  // 1. get username from frontend
  const { username } = req.query;
  console.log("Username coming from frontend:", username);

  try {
    //2. find the user from db
    let User = await Creator.findOne({ username: username });
    console.log("user found: ", User);

    if (User) {
      // 4. if user is available in db, then get the user createdAt Date.
      const UserCreatedAt = User?.createdAt?.toDateString();
      const userCurrentDate = new Date().toDateString();
      console.log("User createdAT from DB: ", UserCreatedAt);
      console.log("User current date", userCurrentDate);

      // 5. compare the user createdAt date and current date.
      if (UserCreatedAt != userCurrentDate) {
        // 6. if user createdAt date is more than one day, then find the user latest data using fetch and replace new response
        //   with previous response and send the response

        let userNewData = await findUserByUsername(username);
        console.log("get latest data of User from fetch", userNewData);

        const userKey = User.pk;
        console.log("get User key from db", userKey);

        let replaceData = await Creator.replaceOne(
          { pk: userKey },
          userNewData
        );
        console.log("replace the data in DB", replaceData);

        User = userNewData;
        console.log("new Data of User:", User);
      }
    } else {
      // 3. if user in not available in db, then create the new User in db
      const newUser = await findUserByUsername(username);
      let createUser = await Creator.create(newUser);
      User = createUser;
      console.log("User is not found in db and create new User: ", User);
    }

    // 7. if user createdAt date is less than one day, then send response
    return res
      .status(200)
      .json(new ApiResponse(200, { User }, "creator added in the db"));
  } catch (error: any) {
    console.log("error fetching data", error);
    res.status(400).json(new ApiError(400, "failed to fetched the data"));
  }
};

export { getUser };

/**
 * 
 * --> 1. get username from frontend
 * --> 2. find the user from db
 * --> 3. if user in not available in db, then create the new User in db
 * --> 4. if user is available in db, then get the user createdAt Date.
 * --> 5. compare the user createdAt date and current date.
 * --> 6. if user createdAt date is more than one day, then find the user data using fetch and replace response
          with previous response and send the new response
 * --> 7. if user createdAt date is less than one day, then send response 
   

   let user = foundUser??{}

  //date match 
  res -> user

  //date unmatch
  apiuser-> axios
  user=apiuser

  // user 
  apiuser-> axios
  user=apiuser


  res.send(user)


// findUserbyUsernma(username)


*/
