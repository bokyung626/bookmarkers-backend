import { addBookDTO } from "../dto/addBook.dto";
import database from "../../../database";

export class BookService {
  constructor() {}

  async findBookbyISBN(isbn: string) {
    const book = await database.book.findUnique({
      where: {
        isbn,
      },
    });

    if (!book) false;
    return book;
  }

  async addBook(props: addBookDTO) {
    const isbn = await database.book.create({
      data: {
        isbn: props.isbn,
        title: props.title,
        author: props.author,
        description: props.description,
        pubdate: props.pubdate,
        publisher: props.publisher,
        image: props.image,
      },
    });
    return isbn;
  }
}
