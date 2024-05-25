import { useMemo, useState } from 'react'
import { RootStackParamList } from '../../../navigation/propsParmsNavigation'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { LayoutListAYB, ListItemAYB, AlertCollpaseUI  } from '../../../components'
import { Book, useFetchQueryApi } from '../../../../shared'


export const ListBooks = ({
    navigation,
    route: { params }
}:NativeStackScreenProps<RootStackParamList, 'books'>) => {
    const { data, isLoading, error } = useFetchQueryApi<Book[]>(`/books?author_id=${params.author_id}`);

    const placeholderList = useMemo(() => {
        return Array.from({ length: 8 }).map(_ => null);
      }, []);
  
    const listBooks = useMemo(() => {
    if( isLoading ) return placeholderList;

    return data || []

    }, [isLoading]);

    return (
        <LayoutListAYB>
            {
            listBooks.map((book, idx) => (
                <ListItemAYB 
                    key={idx}
                    data={book ? {
                        title: book.title,
                        description: book.overview
                    } : null}
                    loading={isLoading}
                />
            ))
            }
            {
                data && data.length  == 0 &&
                <AlertCollpaseUI 
                    showIcon={true}
                    isOpened
                    typeAlert='info'
                    title='No se encontraron libros'
                />
            }
        </LayoutListAYB>
    )
}
