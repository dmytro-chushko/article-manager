import { Box, Grid, Link, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import noImage from 'src/assets/no_image.webp';
import { useImageUrl } from 'src/hooks';
import { IArticleRetrived } from 'src/types/api';

interface IReadOnlyArticleProps {
  article?: IArticleRetrived;
}

export const ReadOnlyArticle = ({ article }: IReadOnlyArticleProps) => {
  const { t } = useTranslation();
  const imageUrl = useImageUrl(article?.image_url);

  if (article) {
    const { title, description, image_url, link, creator } = article;

    return (
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography variant="h6">{title}</Typography>
        </Grid>
        <Grid container spacing={2} item flexWrap="nowrap">
          <Grid item xs="auto">
            <Box
              component="img"
              width={270}
              alt={title}
              src={image_url ? imageUrl : noImage}
            />
          </Grid>
          <Grid item>
            <Typography variant="body2">{description}</Typography>
            {creator &&
              creator.map(item => (
                <Typography key={item} variant="caption" mr={2}>
                  {item}
                </Typography>
              ))}
            <Link href={link}>{t('link.goToArticle')}</Link>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  return <div />;
};
