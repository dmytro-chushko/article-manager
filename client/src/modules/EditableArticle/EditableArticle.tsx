import {
  Box,
  ClickAwayListener,
  FormControl,
  Grid,
  Link,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import noImage from 'src/assets/no_image.webp';
import { CustomInput, InputImageUpload } from 'src/components';
import { useImageUrl } from 'src/hooks';
import { IArticleRetrived } from 'src/types/api';
import { ArticleControls } from '../AddArticle/components/ArticleControls';
import { useEditableArticleHook } from './EditableArticle.hook';

interface IEditableArticleProps {
  article?: IArticleRetrived;
}

export const EditableArticle = ({ article }: IEditableArticleProps) => {
  const { t } = useTranslation();
  const imageUrl = useImageUrl(article?.image_url);
  const {
    isEdit,
    image,
    handleChangeImage,
    control,
    handleClickAway,
    handleClickEdit,
    handleClickRemove,
  } = useEditableArticleHook({
    id: article?.id,
    title: article?.title,
    description: article?.description || '',
    imageUrl,
  });

  if (article) {
    const { title, description, image_url, link, creator } = article;

    return (
      <ClickAwayListener onClickAway={handleClickAway}>
        <Grid
          container
          spacing={2}
          flexWrap="nowrap"
          direction={{ xs: 'column', md: 'row' }}
        >
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
            <Grid
              container
              direction={{ xs: 'column', md: 'row' }}
              spacing={2}
              item
              flexWrap="nowrap"
            >
              <Grid item xs="auto">
                <Box
                  component="img"
                  width={270}
                  alt={title}
                  src={image_url ? image : noImage}
                  mb={isEdit ? 2 : 0}
                  mx="auto"
                />
                {isEdit && (
                  <InputImageUpload
                    fullWidth
                    onChangeFile={handleChangeImage}
                    control={control}
                    name="image"
                  />
                )}
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
                  <Typography variant="body1">{description}</Typography>
                )}
                {creator.length > 0 && (
                  <Typography variant="caption">
                    {[
                      t('creator'),
                      ': ',
                      ...creator.map((item, i) => (
                        <Typography key={i} variant="caption" mr={2}>
                          {item}
                        </Typography>
                      )),
                    ]}
                  </Typography>
                )}
                <Link href={link}>{t('link.goToArticle')}</Link>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <ArticleControls
              isEdit={isEdit}
              onEditArticle={handleClickEdit}
              onRemoveArticle={handleClickRemove}
            />
          </Grid>
        </Grid>
      </ClickAwayListener>
    );
  }

  return <div />;
};
