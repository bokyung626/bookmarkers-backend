import database from "../../../database";
import { writeReviewDTO } from "../dto/writeReview.dto";
import { BookService } from "../../book/service";
import { findBookbyISBN } from "../../../utils/naverAPI";
import { addBookDTO } from "../../book/dto/addBook.dto";
import { ReviewsDTO } from "../dto/reviews.dto";
import { updateReviewDTO } from "../dto/updateReview.dto";

export class ReviewService {
  bookService;
  constructor() {
    this.bookService = new BookService();
  }

  async getReview(id: string) {
    const review = await database.review.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        comments: {
          where: {
            parentCommentId: null,
          },
          orderBy: {
            createdAt: "asc",
          },
          include: {
            user: true,
            childComments: {
              include: {
                user: true,
              },
              orderBy: {
                createdAt: "asc",
              },
            },
          },
        },
      },
    });

    if (!review) return null;

    return review;
    // return new ReviewDTO(review);
  }

  async getReviews(isbn: string) {
    const reviews = await database.review.findMany({
      where: {
        isbn,
      },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return reviews.map((review) => new ReviewsDTO(review));
  }

  async createReview(props: writeReviewDTO) {
    const isExistBook = await this.bookService.findBookbyISBN(props.isbn);

    // 리뷰 이력이 없는 책인 경우 책 정보를 DB에 삽입
    if (!isExistBook) {
      const book = await findBookbyISBN(props.isbn);
      await this.bookService.addBook(
        new addBookDTO({
          isbn: book.isbn,
          title: book.title,
          author: book.author,
          description: book.description,
          pubdate: book.pubdate,
          publisher: book.publisher,
          image: book.image,
        })
      );
    }

    const newReview = await database.review.create({
      data: {
        title: props.title,
        content: props.content,
        memory: props.memory,
        book: {
          connect: {
            isbn: props.isbn,
          },
        },
        user: {
          connect: {
            id: props.userId,
          },
        },
      },
    });
    return newReview.id;
  }

  async updateReview(props: updateReviewDTO) {
    const newReview = await database.review.update({
      where: {
        id: props.id,
      },
      data: {
        title: props.title,
        content: props.content,
        memory: props.memory,
      },
    });
    return newReview.id;
  }

  async deleteReview(reviewId: string, user: any) {
    const review = await database.review.findUnique({
      where: {
        id: reviewId,
      },
    });

    if (!review) throw { status: 404, message: "리뷰를 찾을 수 없습니다." };

    if (review.userId !== user.id)
      throw { status: 403, message: "본인의 글만 삭제할 수 있습니다." };

    await database.review.delete({
      where: {
        id: review.id,
      },
    });
  }
}
