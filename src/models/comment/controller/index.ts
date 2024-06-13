import { Router, Request, Response, NextFunction } from "express";
import axios from "axios";
import { authJWT } from "../../../middleware";
import { CommentService } from "../service";
import { writeCommentDTO } from "../dto/writeComment.dto";
import { writeReplyDTO } from "../dto/writeReply.dto";
import { UpdateCommentDTO } from "../dto/updateComment.dto";

interface User {
  id: string;
  email: string;
  nickname: string;
  password: string;
  profileImage: string;
}

export class CommentController {
  router;
  path = "/comment";
  commentService;

  constructor() {
    this.router = Router();
    this.init();
    this.commentService = new CommentService();
  }

  init() {
    this.router.post("/", authJWT, this.createComment.bind(this));
    this.router.delete("/:commentId", authJWT, this.deleteComment.bind(this));
    this.router.patch("/:commentId", authJWT, this.updateComment.bind(this));
    this.router.post("/reply", authJWT, this.createReply.bind(this));
  }

  async createComment(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) throw { status: 401, message: "로그인을 진행해 주세요." };

      const body = req.body;
      const user = req.user as User;

      const newCommentId = await this.commentService.createComment(
        new writeCommentDTO({
          content: body.content,
          userId: user.id,
          reviewId: body.reviewId,
        })
      );

      return res.status(201).json(newCommentId);
    } catch (err) {
      next(err);
    }
  }

  async createReply(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) throw { status: 401, message: "로그인을 진행해 주세요." };

      const body = req.body;
      const user = req.user as User;

      const newRepleyId = await this.commentService.createReply(
        new writeReplyDTO({
          content: body.content,
          userId: user.id,
          parentCommentId: body.parentCommentId,
        })
      );

      return res.status(201).json(newRepleyId);
    } catch (err) {
      next(err);
    }
  }

  async updateComment(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      const user = req.user as User;

      const { commentId } = req.params;
      await this.commentService.updateComment(
        commentId,
        new UpdateCommentDTO({ content: body.content }),
        user.id
      );
      res.status(201).json({});
    } catch (err) {
      next(err);
    }
  }

  async deleteComment(req: Request, res: Response, next: NextFunction) {
    try {
      const { commentId } = req.params;
      await this.commentService.deleteComment(commentId, req.user);
      res.status(204).json({});
    } catch (err) {
      next(err);
    }
  }
}

const commentController = new CommentController();
export default commentController;
