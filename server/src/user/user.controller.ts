import * as express from "express";
import { UserPath } from "../constant/path";
import * as Models from "./user.model";
import { Request } from "express";
import * as Service from "./user.service";

const router = express.Router();

router.get(
  UserPath.GET_SIMILAR,
  async (req: Request<{}, {}, {}, Models.GetSimilarUserReq>, res) => {
    try {
      const result: Models.GetSimilarUserRes = await Service.getSimilarUser(
        req.query
      );
      res.status(200).send(result);
    } catch (err) {
      console.error(err);
      res.status(500).send("SERVER ERROR: get similar user failed.");
    }
  }
);

router.get(
  UserPath.GET_REWATCHING,
  async (req: Request<{}, {}, {}, Models.GetRewatchingMovieReq>, res) => {
    try {
      const result = Service.getRewatchingMovie(req.query);
      res.status(200).send(result);
    } catch (err) {
      console.error(err);
      res.status(500).send("SERVER ERROR: get rewatching movie failed.");
    }
  }
);

router.get(
  UserPath.GET_ID_BY_NICKNAME,
  async (req: Request<{}, {}, {}, Models.GetIdByNicknameReq>, res) => {
    try {
      const result: Models.GetIdByNicknameRes = await Service.getIdByNickname(
        req.query
      );
      res.status(200).send(result);
    } catch (err) {
      console.error(err);
      res.status(500).send("SERVER ERROR: get id by nickname faild");
    }
  }
);

router.get(
  UserPath.CREATE,
  async (req: Request<{}, {}, {}, Models.CreateUserReq>, res) => {}
);

router.get(
  UserPath.GET_INFO,
  async (req: Request<{}, {}, {}, Models.GetUserInfoReq>, res) => {
    try {
      const result: Models.GetUserInfoRes = await Service.getUserInfo(
        req.query
      );
      res.status(200).send(result);
    } catch (err) {
      console.error(err);
      res.status(500).send("SERVER ERROR: get user info failed.");
    }
  }
);

router.get(
  UserPath.SEARCH_WATCHED,
  async (req: Request<{}, {}, {}, Models.SearchMovieWatchedReq>, res) => {}
);

export = router;
