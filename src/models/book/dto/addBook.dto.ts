export class addBookDTO {
  isbn: string;
  title: string;
  author: string;
  description: string;
  pubdate: string;
  publisher: string;
  image: string;

  constructor(props: {
    isbn: string;
    title: string;
    author: string;
    description: string;
    pubdate: string;
    publisher: string;
    image: string;
  }) {
    this.isbn = props.isbn;
    this.title = props.title;
    this.author = props.author;
    this.description = props.description;
    this.pubdate = props.pubdate;
    this.publisher = props.publisher;
    this.image = props.image;
  }
}
