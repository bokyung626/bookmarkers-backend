import database from "../../../database";
import { WriteCommentProps, WriteReplyProps } from "comment";
import { UserService } from "../../users/service";
import { ChildCommentDTO } from "../dto/childComment.dto";
import { CommentDTO } from "../dto/comment.dto";
import { UpdateCommentDTO } from "../dto/updateComment.dto";

export class CommentService {
  userService;
  constructor() {
    this.userService = new UserService();
  }

  async createComment(props: WriteCommentProps) {
    const user = await this.userService.findUserById(props.userId);
    const review = await database.review.findUnique({
      where: {
        id: props.reviewId,
      },
    });

    if (!review) throw { status: 404, message: "게시글을 찾을 수 없습니다." };

    const newComment = await database.comment.create({
      data: {
        content: props.content,
        review: {
          connect: {
            id: review.id,
          },
        },
        user: {
          connect: {
            id: user.id,
          },
        },
      },
      include: {
        user: true,
      },
    });

    return new CommentDTO({ ...newComment, comments: [] });
  }

  async createReply(props: WriteReplyProps) {
    const user = await this.userService.findUserById(props.userId);
    const parentComment = await database.comment.findUnique({
      where: {
        id: props.parentCommentId,
      },
    });

    if (!parentComment)
      throw { status: 404, message: "부모 댓글을 찾을 수 없습니다." };

    const newReply = await database.comment.create({
      data: {
        content: props.content,
        review: {
          connect: {
            id: parentComment.reviewId,
          },
        },
        user: {
          connect: {
            id: user.id,
          },
        },
        parentComment: {
          connect: {
            id: parentComment.id,
          },
        },
      },
      include: {
        user: true,
      },
    });
    return new ChildCommentDTO(newReply);
  }

  async updateComment(
    commentId: string,
    props: UpdateCommentDTO,
    userId: string
  ) {
    const comment = await database.comment.findUnique({
      where: {
        id: commentId,
      },
    });

    if (!comment) throw { status: 404, message: "댓글을 찾을 수 없습니다." };
    if (comment.userId !== userId)
      throw { status: 403, message: "본인의 댓글만 수정할 수 있습니다." };

    await database.comment.update({
      where: {
        id: comment.id,
      },
      data: {
        content: props.content,
      },
    });
  }

  async deleteComment(commentId: string, user: any) {
    const comment = await database.comment.findUnique({
      where: {
        id: commentId,
      },
    });

    if (!comment) throw { status: 404, message: "댓글을 찾을 수 없습니다." };
    if (comment.userId !== user.id)
      throw { status: 403, message: "본인의 댓글만 삭제할 수 있습니다." };

    await database.comment.delete({
      where: {
        id: comment.id,
      },
    });
  }
}
