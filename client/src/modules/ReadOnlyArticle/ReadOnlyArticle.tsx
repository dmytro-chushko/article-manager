import { Link, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { IArticleRetrived } from 'src/types/api';

interface IReadOnlyArticleProps {
  article?: IArticleRetrived;
}

export const ReadOnlyArticle = ({ article }: IReadOnlyArticleProps) => {
  const { t } = useTranslation();

  if (article) {
    const { title, description, image_url, link, creator } = article;

    return (
      <>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2">{description}</Typography>
        <Link href={link}>{t('link.goToArticle')}</Link>
        {creator &&
          creator.map(item => (
            <Typography key={item} variant="caption"></Typography>
          ))}
      </>
    );
  }  

  return <div />;
};
