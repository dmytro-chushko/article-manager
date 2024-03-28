import {
  Box,
  Button,
  ClickAwayListener,
  FormControl,
  Grid,
  Link,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import noImage from 'src/assets/no_image.webp';
import { CustomInput } from 'src/components';
import { IArticleRetrived } from 'src/types/api';
import { useEditableArticleHook } from './EditableArticle.hook';

interface IEditableArticleProps {
  article?: IArticleRetrived;
}

export const EditableArticle = ({ article }: IEditableArticleProps) => {
  const { t } = useTranslation();
  const { isEdit, control, handleClickAway, handleClickEdit } =
    useEditableArticleHook({
      id: article?.id,
      title: article?.title,
      description: article?.description,
    });

  if (article) {
    const { title, description, image_url, link, creator } = article;

    return (
      <ClickAwayListener onClickAway={handleClickAway}>
        <Grid container spacing={2} flexWrap="nowrap">
          <Grid item component="form" container direction="column" spacing={2}>
            <Grid item>
              {isEdit ? (
                <FormControl fullWidth>
                  <CustomInput fullWidth control={control} name="title" />
                </FormControl>
              ) : (
                <Typography variant="h6">{title}</Typography>
              )}
            </Grid>
            <Grid container spacing={2} item flexWrap="nowrap">
              <Grid item xs="auto">
                <Box
                  component="img"
                  width={270}
                  alt={title}
                  src={image_url ? image_url : noImage}
                />
              </Grid>
              <Grid item flexGrow={1}>
                {isEdit ? (
                  <FormControl fullWidth>
                    <CustomInput
                      multiline
                      rows={5}
                      control={control}
                      name="description"
                    />
                  </FormControl>
                ) : (
                  <Typography variant="body2">{description}</Typography>
                )}
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
          <Grid item>
            <Button variant="contained" type="button" onClick={handleClickEdit}>
              {t(`${isEdit ? 'button.close' : 'button.edit'}`)}
            </Button>
          </Grid>
        </Grid>
      </ClickAwayListener>
    );
  }

  return <div />;
};
