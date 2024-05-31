import { Router, Request, Response, NextFunction } from "express";
import axios from "axios";
import { authJWT } from "../../../middleware";
import { ReviewService } from "../service";
import { writeReviewDTO } from "../dto/writeReview.dto";

interface User {
  id: string;
  email: string;
  nickname: string;
  password: string;
  profileImage: string;
}

export class ReviewController {
  router;
  path = "/review";
  reviewService;

  constructor() {
    this.router = Router();
    this.init();
    this.reviewService = new ReviewService();
  }

  init() {
    this.router.get("/:id", this.searchReviewById.bind(this));
    this.router.get("/isbn/:id", this.searchReviewByISBN.bind(this));
    this.router.post("/", authJWT, this.createReview.bind(this));
  }

  async searchReviewById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const review = await this.reviewService.getReview(id);

    if (!review) throw { status: 404, message: "존재하지 않는 리뷰 입니다." };

    res.status(200).json(review);
  }

  async searchReviewByISBN(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const reviews = await this.reviewService.getReviews(id);

    res.status(200).json(reviews);
  }

  async createReview(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      const user = req.user as User;

      const newReviewId = await this.reviewService.createReview(
        new writeReviewDTO({
          isbn: body.isbn,
          title: body.title,
          content: body.content,
          memory: body.memory,
          userId: user.id,
        })
      );

      if (newReviewId) res.status(201).json(newReviewId);
    } catch (err) {
      console.log(err);
    }
  }
}

const reviewController = new ReviewController();
export default reviewController;
