export interface Headline {
  id: string;
  site: string;
  date: string;
  fileName: string;
  imageUrl: string;
  titleText?: string;
  subTitleText?: string;
  titleArticleLink?: string;
  isTextUnique?: boolean;
  diffToLastOfSite?: number;
}
