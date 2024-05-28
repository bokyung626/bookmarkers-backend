import axios from "axios";

export const findBookbyISBN = async (isbn: string) => {
  const options = {
    headers: {
      "X-Naver-Client-Id": process.env.NAVER_BOOK_CLIENT_ID,
      "X-Naver-Client-Secret": process.env.NAVER_BOOK_APP_CLIENT_SECRET,
    },
    params: {
      d_isbn: isbn,
    },
  };
  try {
    const book = await axios.get(
      "https://openapi.naver.com/v1/search/book_adv.json",
      options
    );

    if (book.status === 200) {
      console.log("책이에용");
      return book.data.items[0];
    }
  } catch (error) {
    return error;
  }
};
