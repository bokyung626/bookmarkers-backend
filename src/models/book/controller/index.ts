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
    this.router.get("/search", this.searchBook.bind(this));
  }

  async searchBook(req: Request, res: Response, next: NextFunction) {
    const body = await req.body;

    const options = {
      headers: {
        "X-Naver-Client-Id": process.env.NAVER_BOOK_CLIENT_ID,
        "X-Naver-Client-Secret": process.env.NAVER_BOOK_APP_CLIENT_SECRET,
      },
    };

    try {
      const bookinfo = await axios.get(
        "https://openapi.naver.com/v1/search/book_adv.json?d_titl=작은아씨들&display=10",
        options
      );

      if (bookinfo.status === 200) {
        console.log(bookinfo.data);
        res.status(200).json(bookinfo);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

const bookController = new BookController();
export default bookController;
