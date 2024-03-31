import { Grid, Pagination, Typography } from '@mui/material';
import { Children, ReactElement, cloneElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetAllArticlesQuery } from 'src/redux/api/article.api';
import { useSetLoaderStatus } from 'src/redux/reducers/loader';
import {
  useGetLimit,
  useGetPage,
  useGetSearch,
  useGetSort,
  useSetPage,
} from 'src/redux/reducers/searchParams';

import { IArticleRetrived } from 'src/types/api';
import { ArticleEvent } from 'src/utils/consts';
import { socket } from 'src/web-socket/socket';

interface IArticleListProps {
  children: ReactElement[] | ReactElement;
}

export const ArticleList = ({ children }: IArticleListProps) => {
  const { t } = useTranslation();
  const setLoaderStatus = useSetLoaderStatus();
  const search = useGetSearch();
  const sort = useGetSort();
  const page = useGetPage();
  const limit = useGetLimit();
  const setPage = useSetPage();
  const queryParams = `${
    search && `search=${search}&`
  }sort=${sort}&page=${page}&limit=${limit}`;
  const { data, isLoading, refetch } = useGetAllArticlesQuery(queryParams);

  const renderChildren = (article: IArticleRetrived) => {
    return Children.map(children, child => {
      return cloneElement(child, {
        article,
      });
    });
  };

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    page: number,
  ) => {
    setPage(page);
  };

  useEffect(() => {
    setLoaderStatus(isLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useEffect(() => {
    data && data.articles.length === 0 && setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    const handleRefetchArticle = () => refetch();

    socket.on(ArticleEvent.ARTICLE_UPDATED, handleRefetchArticle);

    return () => {
      socket.off(ArticleEvent.ARTICLE_UPDATED, handleRefetchArticle);
    };
  }, [refetch]);

  return (
    <Grid container direction="column" spacing={4} alignItems="center">
      {data && data.articles.length > 0 && (
        <Grid item>
          <Pagination
            count={data.totalPages}
            page={page}
            onChange={handleChangePage}
            size="small"
            variant="outlined"
            shape="rounded"
            color="primary"
          />
        </Grid>
      )}
      <Grid component="ul" item container rowSpacing={4}>
        {data &&
          (data.articles.length > 0 ? (
            data.articles.map(article => (
              <Grid key={article.id} component="li" item xs={12}>
                {renderChildren(article)}
              </Grid>
            ))
          ) : (
            <Grid item>
              <Typography variant="h3">{t('notFound')}</Typography>
            </Grid>
          ))}
      </Grid>
      {data && data.articles.length > 0 && (
        <Grid item>
          <Pagination
            count={data.totalPages}
            page={page}
            onChange={handleChangePage}
            size="small"
            variant="outlined"
            shape="rounded"
            color="primary"
          />
        </Grid>
      )}
    </Grid>
  );
};
