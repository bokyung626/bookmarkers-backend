import database from "../../../database";
import { writeReviewDTO } from "../dto/writeReview.dto";
import { BookService } from "../../book/service";
import { findBookbyISBN } from "../../../utils/naverAPI";
import { addBookDTO } from "../../book/dto/addBook.dto";
import { ReviewDTO } from "../dto/review.dto";

export class ReviewService {
  bookService;
  constructor() {
    this.bookService = new BookService();
  }

  async getReviews(isbn: string) {
    const reviews = await database.review.findMany({
      where: {
        isbn,
      },
      include: {
        user: true,
      },
    });

    return reviews.map((review) => new ReviewDTO(review));
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
}
