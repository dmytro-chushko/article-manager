import { Grid } from '@mui/material';
import { Children, ReactElement, cloneElement, useEffect } from 'react';
import { useGetAllArticlesQuery } from 'src/redux/api/article.api';
import { useSetLoaderStatus } from 'src/redux/reducers/loader';

import { IArticleRetrived } from 'src/types/api';

interface IArticleListProps {
  children: ReactElement[] | ReactElement;
}

export const ArticleList = ({ children }: IArticleListProps) => {
  const setLoaderStatus = useSetLoaderStatus();
  const { data: articles, isLoading } = useGetAllArticlesQuery();

  const renderChildren = (article: IArticleRetrived) => {
    return Children.map(children, child => {
      return cloneElement(child, {
        article,
      });
    });
  };

  useEffect(() => {
    setLoaderStatus(isLoading);
  }, [isLoading, setLoaderStatus]);

  return (
    <Grid component="ul" container spacing={4} py={4}>
      {articles &&
        articles.map(article => (
          <Grid key={article.id} component="li" item>
            {renderChildren(article)}
          </Grid>
        ))}
    </Grid>
  );
};
