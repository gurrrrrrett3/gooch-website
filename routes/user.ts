import { Router } from "express";
import UserManager from "../modules/userManager";
import UserPageBuilder from "../modules/pageBuilders/userPage";
const router = Router();

router.get("/:id", (req, res) => {
    const id = req.params.id;

  const user = UserManager.getUser(id);

  if (!user) {
    res.status(404).send("User not found");
    return;
  }

  res.send(UserPageBuilder.Build(user));
});

router.get("/:id/settings", (req, res) => {
  
});

export default router;
