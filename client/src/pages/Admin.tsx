import { ArticleList } from 'src/modules/ArticleList';
import { EditableArticle } from 'src/modules/EditableArticle';

const Admin = () => {
  return (
    <ArticleList>
      <EditableArticle />
    </ArticleList>
  );
};

export default Admin;
