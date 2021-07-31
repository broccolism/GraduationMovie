import * as express from "express";
import { UserPath } from "../constant/path";
import * as Models from "./user.model";
import { Request } from "express";
import * as Service from "./user.service";

const router = express.Router();

router.get(
  UserPath.GET_SIMILAR,
  async (req: Request<{}, {}, {}, Models.GetSimilarUserReq>, res) => {
    const result: Models.GetSimilarUserRes = await Service.getSimilarUser(
      req.query
    );
    res.status(200).send(result);
  }
);

router.get(
  UserPath.GET_REWATCHING,
  async (req: Request<{}, {}, {}, Models.GetRewatchingMovieReq>, res) => {}
);

router.get(
  UserPath.GET_ID_BY_NICKNAME,
  async (req: Request<{}, {}, {}, Models.GetIdByNicknameReq>, res) => {}
);

router.get(
  UserPath.CREATE,
  async (req: Request<{}, {}, {}, Models.CreateUserReq>, res) => {}
);

router.get(
  UserPath.GET_INFO,
  async (req: Request<{}, {}, {}, Models.GetUserInfoReq>, res) => {}
);

router.get(
  UserPath.SEARCH_WATCHED,
  async (req: Request<{}, {}, {}, Models.SearchMovieWatchedReq>, res) => {}
);

export = router;
