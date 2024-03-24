import { ArticleList } from 'src/modules/ArticleList';
import { ReadOnlyArticle } from 'src/modules/ReadOnlyArticle';

const Feed = () => {
  return (
    <>
      <ArticleList>
        <ReadOnlyArticle />
      </ArticleList>
    </>
  );
};

export default Feed;
