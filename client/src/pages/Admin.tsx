import { AddArticle } from 'src/modules/AddArticle';
import { ArticleList } from 'src/modules/ArticleList';
import { EditableArticle } from 'src/modules/EditableArticle';

const Admin = () => {
  return (
    <>
      <AddArticle />
      <ArticleList>
        <EditableArticle />
      </ArticleList>
    </>
  );
};

export default Admin;
