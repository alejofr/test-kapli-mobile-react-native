
import { useMemo, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/propsParmsNavigation';
import { LayoutListAYB, ListItemAYB } from '../../../components/test-kapli';
import { useFetchQueryApi, Author } from '../../../../shared';
import { fetchApi } from '../../../../config/kapliTestApi';


export const ListAuthors = ({
    navigation
  }:NativeStackScreenProps<RootStackParamList, 'authors'>) => {
    const { data, isLoading, error, onRefresh } = useFetchQueryApi<Author[]>('/authors');
    const [authorId, setAuthorId] = useState<number | undefined>(undefined);

    const placeholderList = useMemo(() => {
      return Array.from({ length: 8 }).map(_ => null);
    }, []);

    const listAuthors = useMemo(() => {
      if( isLoading ) return placeholderList;

      return data || []

    }, [isLoading]);

    const removeAuthorList = async(id: number) => {
      const { ok } = await fetchApi(`/authors/${id}`, 'DELETE');

      if( ok  ) onRefresh();
    }

    return (
      <LayoutListAYB
        actionNew={{
          title: 'Agregar Autor',
          onNew: () => navigation.navigate('authorForm')
        }}
      >
        {
          listAuthors.map((author, idx) => (
            <ListItemAYB 
              key={idx}
              data={author ? {
                title: author.name,
                description: author.bibliography
              } : null}
              loading={isLoading}
              onEdit={() => author && navigation.navigate('authorForm', { id: author?.author_id })}
              onDelete={() => author && removeAuthorList(author.author_id)}
              onListBooks={() => author && navigation.navigate('books', { author_id: author.author_id })}
            />
          ))
        }
      </LayoutListAYB>
    )
}
