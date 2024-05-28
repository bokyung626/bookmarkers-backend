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
  profileImage: string | null;
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
    this.router.get("/", this.searchReviewById.bind(this));
    this.router.post("/", authJWT, this.createReview.bind(this));
  }

  async searchReviewById(req: Request, res: Response, next: NextFunction) {}
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
