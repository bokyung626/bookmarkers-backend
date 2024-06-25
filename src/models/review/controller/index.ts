import { Router, Request, Response, NextFunction } from "express";
import { authJWT } from "../../../middleware";
import { ReviewService } from "../service";
import { writeReviewDTO } from "../dto/writeReview.dto";
import { updateReviewDTO } from "../dto/updateReview.dto";
import { uploadToS3 } from "../../../utils/imageUpload";
import pagination from "../../../middleware/pagination";
import { UserService } from "../../users/service";

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
  userService;

  constructor() {
    this.router = Router();
    this.init();
    this.reviewService = new ReviewService();
    this.userService = new UserService();
  }

  init() {
    this.router.get("/:postId", this.searchReviewById.bind(this));
    this.router.get("/", pagination, this.searchReviews.bind(this));
    this.router.post(
      "/",
      authJWT,
      uploadToS3.single("file"),
      this.createReview.bind(this)
    );
    this.router.patch("/:postId", authJWT, this.updateReview.bind(this));
    this.router.delete("/:postId", authJWT, this.deleteReview.bind(this));
  }

  async searchReviewById(req: Request, res: Response, next: NextFunction) {
    try {
      const { postId } = req.params;

      const review = await this.reviewService.getReview(postId);

      res.status(200).json(review);
    } catch (err) {
      next(err);
    }
  }

  async searchReviews(req: Request, res: Response, next: NextFunction) {
    try {
      const { isbn, writer, title, content } = req.query;

      // pagination
      const skip = req.skip!;
      const take = req.takePage!;

      // 검색 필터
      const filters: any = {};
      if (isbn) filters.isbn = isbn;
      if (writer && typeof writer === "string") {
        const user = await this.userService.findIdByNickname(writer);

        if (user) filters.userId = user.id;
        else return res.status(200).json([]);
      }
      if (title)
        filters.title = {
          contains: title,
        };
      if (content)
        filters.content = {
          contains: content,
        };

      const reviews = await this.reviewService.getReviews(skip, take, filters);

      res.status(200).json(reviews);
    } catch (err) {
      next(err);
    }
  }

  async createReview(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      const user = req.user as User;

      const newReviewId = await this.reviewService.createReview(
        new writeReviewDTO({
          isbn: body.isbn,
          title: body.title,
          image: req.file ? (req.file as any).location : body.image,
          content: body.content,
          memory: body.memory,
          userId: user.id,
        })
      );

      if (newReviewId) res.status(201).json(newReviewId);
    } catch (err) {
      next(err);
    }
  }

  async deleteReview(req: Request, res: Response, next: NextFunction) {
    try {
      const { postId } = req.params;

      await this.reviewService.deleteReview(postId, req.user);
      res.status(204).json({});
    } catch (err) {
      next(err);
    }
  }

  async updateReview(req: Request, res: Response, next: NextFunction) {
    try {
      const { postId } = req.params;
      const body = req.body;

      await this.reviewService.updateReview(
        new updateReviewDTO({ id: postId, ...body })
      );

      res.status(204).json({});
    } catch (err) {
      next(err);
    }
  }
}

const reviewController = new ReviewController();
export default reviewController;
