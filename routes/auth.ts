import { Router } from 'express';
import StateManager from '../modules/stateManager';
import UserManager from '../modules/userManager';
import Util from '../modules/util';
import auth from '../auth.json';
const router = Router();

router.get("/login", (req, res) => {
    res.redirect(Util.buildDiscordAuthURL(auth.discord.CLIENT_ID, auth.discord.REDIRECT_URI, auth.discord.SCOPE));
});

router.get('/callback', (req, res) => {

    const code = req.query.code;
    const state = req.query.state;

    if (!code || !state) {
        res.send("Error: No code or state");
        return;
    }

    if (StateManager.checkState(state.toString())) {
        UserManager.authUser(code.toString()).then(user => {
            res.redirect(`/user/${user.id}/settings`);
        }
        ).catch(err => {
            res.status(500).json(err);
        }
        );
    } else {
        res.send("Error: Invalid state, you may have been redirected here by a third party site. Please try again.");
    }
});

export default router;

