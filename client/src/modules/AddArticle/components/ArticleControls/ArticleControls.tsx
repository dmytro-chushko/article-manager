import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface IArticleControlsProps {
  onEditArticle: () => void;
  onRemoveArticle: () => void;
  isEdit: boolean;
}

export const ArticleControls = ({
  onEditArticle,
  onRemoveArticle,
  isEdit,
}: IArticleControlsProps) => {
  const { t } = useTranslation();

  return (
    <Grid container direction="column" spacing={2} alignItems="stretch">
      <Grid item xs={12}>
        <Button
          variant="contained"
          type="button"
          onClick={onEditArticle}
          startIcon={<EditIcon />}
          fullWidth
          sx={{ justifyContent: 'start' }}
        >
          {t(`${isEdit ? 'button.close' : 'button.edit'}`)}
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="secondary"
          type="button"
          onClick={onRemoveArticle}
          startIcon={<DeleteIcon />}
          fullWidth
        >
          {t('button.remove')}
        </Button>
      </Grid>
    </Grid>
  );
};
