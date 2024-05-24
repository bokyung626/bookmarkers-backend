import { Router, Request, Response, NextFunction } from "express";
import axios from "axios";

export class BookController {
  router;
  path = "/book";

  constructor() {
    this.router = Router();
    this.init();
  }

  init() {
    this.router.post("/search", this.searchBook.bind(this));
  }

  async searchBook(req: Request, res: Response, next: NextFunction) {
    const body = await req.body;

    const options = {
      headers: {
        "X-Naver-Client-Id": process.env.NAVER_BOOK_CLIENT_ID,
        "X-Naver-Client-Secret": process.env.NAVER_BOOK_APP_CLIENT_SECRET,
      },
      params: {
        d_titl: body.d_titl,
        display: 20,
        start: body.start,
      },
    };

    try {
      const bookinfo = await axios.get(
        "https://openapi.naver.com/v1/search/book_adv.json",
        options
      );

      if (bookinfo.status === 200) {
        console.log(bookinfo.data);
        res.status(200).json(bookinfo.data);
      } else {
        res
          .status(bookinfo.status)
          .json({ error: "책 정보를 불러오는데 실패했습니다." });
      }
    } catch (error) {
      res
        .status(500)
        .json({ status: 500, message: "서버에 문제가 발생했습니다." });
    }
  }
}

const bookController = new BookController();
export default bookController;
