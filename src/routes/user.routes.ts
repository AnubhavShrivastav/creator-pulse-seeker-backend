import express from "express"
import { getUser } from "../controllers/user"


const user = express.Router()

user.get("/username",getUser)

export default user