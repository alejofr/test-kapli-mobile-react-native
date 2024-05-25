import { ReactNode, useState } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Collapse } from 'native-base';

import { ListItemUI, ListItemUIProps } from '../ListItem/ListItem';

import useStyles from './style';


export interface ListItemCollpaseUIProps{
  children:   ReactNode;
  styleContainerCollpase?: StyleProp<ViewStyle>;
  listItem: ListItemUIProps
}

export const ListItemCollapseUI = ({
  children,
  styleContainerCollpase,
  listItem
}:ListItemCollpaseUIProps) => {
  const styles = useStyles();

  const [showCollpase, setShowCollpase] = useState(false);

  return (
    <View style={[styles.containerCollapse, styleContainerCollpase]}>
      <ListItemUI
        style={[styles.collapseButton]}
        onPress={() => setShowCollpase(showCollpase ? false: true)}
        {...listItem}
      />
      <Collapse isOpen={showCollpase} style={styles.collapseBody}>
        {children}
      </Collapse>
    </View>
  )
}
