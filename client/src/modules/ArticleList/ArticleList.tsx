import { Grid } from '@mui/material';
import { Children, ReactElement, cloneElement, useEffect } from 'react';
import { useGetAllArticlesQuery } from 'src/redux/api/article.api';
import { useSetLoaderStatus } from 'src/redux/reducers/loader';

import { IArticleRetrived } from 'src/types/api';
import { ArticleEvent } from 'src/utils/consts';
import { socket } from 'src/web-socket/socket';

interface IArticleListProps {
  children: ReactElement[] | ReactElement;
}

export const ArticleList = ({ children }: IArticleListProps) => {
  const setLoaderStatus = useSetLoaderStatus();
  const { data: articles, isLoading, refetch } = useGetAllArticlesQuery();

  const renderChildren = (article: IArticleRetrived) => {
    return Children.map(children, child => {
      return cloneElement(child, {
        article,
      });
    });
  };

  useEffect(() => {
    setLoaderStatus(isLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useEffect(() => {
    const handleRefetchArticle = () => refetch();

    socket.on(ArticleEvent.ARTICLE_UPDATED, handleRefetchArticle);

    return () => {
      socket.off(ArticleEvent.ARTICLE_UPDATED, handleRefetchArticle);
    };
  }, [refetch]);

  return (
    <Grid component="ul" container rowSpacing={2}>
      {articles &&
        articles.map(article => (
          <Grid key={article.id} component="li" item xs={12}>
            {renderChildren(article)}
          </Grid>
        ))}
    </Grid>
  );
};
