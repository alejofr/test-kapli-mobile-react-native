import React from 'react';
import { Text, Skeleton, Link } from 'native-base';

import { ListItemCollapseUI } from '../../ui'

import { Author } from '../../../../shared/interfaces/authors.interface';
import useStyles from './style';
import { View } from 'react-native';


export interface ItemDataAYB{
  title: string;
  description: string;
}

interface ListItemAuthor{
  data: ItemDataAYB | null;
  loading: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onListBooks?: () => void;
}

export const ListItemAYB = ({
  data,
  loading,
  onEdit,
  onDelete,
  onListBooks
}: ListItemAuthor) => {
  const styles = useStyles();

  return (
    <ListItemCollapseUI
      listItem={{
        isLoading: loading,
        children: <Text 
          children={data?.title}
          style={styles.title}
        />,
        right: <Text 
          children={'Info'}
          style={[styles.title, { textDecorationLine: 'underline', color: '#0d6efd', }]}
        />
      }}
    >
      <Skeleton.Text isLoaded={loading === false}>
        <Text 
          variant='label'
          children={data?.description}
          style={[styles.label]}
        />
        <View style={styles.actions}>
          <View style={styles.actionsEditAndDelete}>
            {
              onEdit &&
              <Link 
                onPress={onEdit}
                mr={5}
                _text={{
                  color: '#0d6efd',
                  fontSize: 'md',
                  fontWeight: 'semibold'
                }}
              >Editar</Link>
            }
            {
              onDelete &&
              <Link 
                onPress={onDelete}
                _text={{
                  color: '#dc3545',
                  fontSize: 'md',
                  fontWeight: 'semibold'
                }}
              >Eliminar</Link>
            }
          </View>
          {
            onListBooks &&
            <Link 
              onPress={onListBooks}
              _text={{
                fontSize: 'md',
                fontWeight: 'semibold'
              }}
            >Ver libros</Link>
          }
        </View>
      </Skeleton.Text>
    </ListItemCollapseUI>
  )
}
