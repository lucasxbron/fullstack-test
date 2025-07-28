import { Router } from "express";
import * as authController from "../controllers/authController.js";
const router = Router();
router.post("/register", authController.singUp);
router.post("/login", authController.login);
/* router.get("/verify/:token", userController.verifyUser);
router.get("/profile", verifyToken, userController.getUserProfile);
 */
/* router.get("/", authUser, checkRole("ADMIN"), userController.getUsers);
router.put(
  "/role/:userId",
  authUser,
  checkPermission("PROMOTE_ROLLE"),
  userController.updateUser
); */
export default router;
