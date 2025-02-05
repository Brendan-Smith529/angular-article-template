export type ArticleContent = {
  Headers: string[],
  Paragraphs: string[]
}

export type Article = {
  ArticleNumber: number,
  Content: ArticleContent
};

export interface ApiResponse {
  "$metadata": {
    attempts: number,
    httpStatusCode: number,
    requestId: string,
    totalRetryDelay: number
  },
  Count: number,
  Items: Article[],
  ScannedCount: number
};
