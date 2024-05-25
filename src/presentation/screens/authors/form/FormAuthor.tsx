import { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { ActivityIndicator, KeyboardAvoidingView, View} from 'react-native';
import { Button, FormControl, Input, TextArea, WarningOutlineIcon } from 'native-base';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/presentation/navigation/propsParmsNavigation';
import { Author, AuthorFormData, CONSTDTOCREATEAUTHORSHEMA, CONSTDTOUPDATEAUTHORSHEMA, formatterErrsApi, FormErrorValidationAuthor } from '../../../../shared';
import { TypeAlertCollapseUI, AlertCollpaseUI } from '../../../components/ui';
import { fetchApi } from '../../../../config/kapliTestApi';

import useStyles from './style';




export const FormAuthor = ({
    navigation,
    route: { params }
  }:NativeStackScreenProps<RootStackParamList, 'authorForm'>) => {
    const styles = useStyles();
    const [isLoading, setIsLoading] = useState(false);
    const [load, setLoad] = useState(false);
    const [initForm, setInitForm]   = useState<AuthorFormData>({
      name: '',
      age: 0,
      bibliography: ''
    });

    const [typeAlert, setTypeAlert] = useState<TypeAlertCollapseUI>('success');
    const [message, setMessage] = useState<string | undefined>();

    useEffect(() => {
      let title = 'Nuevo Autor';

      if( params?.id  ){
        title = 'Editar Autor';
        showAuthor(params.id)
      }

      navigation.setOptions({
        title
      });

    }, [params]);

    const showAuthor = async(id: number) => {
      setIsLoading(true);

      const { ok, err, data } = await fetchApi<Author>(`/authors/${id}`, 'GET');

      console.log(err, data)

      if( ok && data ) {
        const {  name, age, bibliography } = data;
        setInitForm({
          name,
          age,
          bibliography
        })
      }

      if( !ok && err ){
        setTypeAlert('error')
        setMessage(err.error);
      }

      setTimeout(() => {
        setIsLoading(false);
      }, 3000);

    }

    const insertAuthor = async(form: AuthorFormData) => {
      setLoad(true);
      setMessage(undefined);

      const { ok, data, err } = await fetchApi<Author, AuthorFormData, FormErrorValidationAuthor>('/authors', 'post', { data: form });

      if( ok && data ){
        setTypeAlert('success');
        setMessage('Autor creado con exito')
      }

      if( !ok && err ) {
        setTypeAlert('error');
        let msg = typeof err.error == 'string' ? err.error : '';
        
        if( typeof err.error == 'object'  ){
          const msgs = formatterErrsApi<FormErrorValidationAuthor>(err.error);

          if( msgs && msgs.length > 0 ){
            msg = msgs[0];
          }
        }

        setMessage(msg);
      }

      setLoad(false);

    }

    const onUpdateAuthor = async(id: number, form: AuthorFormData) => {
      const { ok, data, err } = await fetchApi<Author, AuthorFormData, FormErrorValidationAuthor>(`/authors/${id}`, 'PUT', { data: form });

      if( ok && data ){
        setTypeAlert('success');
        setMessage('Autor actualizado exito')
      }

      if( !ok && err ) {
        setTypeAlert('error');
        let msg = typeof err.error == 'string' ? err.error : '';
        
        if( typeof err.error == 'object'  ){
          const msgs = formatterErrsApi<FormErrorValidationAuthor>(err.error);

          if( msgs && msgs.length > 0 ){
            msg = msgs[0];
          }
        }

        setMessage(msg);
      }

      setLoad(false);
    }
    
    const onSubmit = (values: AuthorFormData) => {
      if( params?.id ){
        onUpdateAuthor(params.id, values);
      }else{
        insertAuthor(values);
      }
    }
    
    if( isLoading ){
      return(
        <View style={[styles.root, styles.rootLoading]}>
          <ActivityIndicator  />
        </View>
      )
    }

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.root}>
        <Formik
          initialValues={initForm}
          onSubmit={onSubmit}
          validationSchema={params?.id ? CONSTDTOUPDATEAUTHORSHEMA : CONSTDTOCREATEAUTHORSHEMA}
        >
        {({ handleChange, handleSubmit, values, errors }) => (
          <View>
            <FormControl isInvalid={errors.name !== undefined} style={styles.rootInput}>
              <FormControl.Label mb={2.5}>Nombre Completo</FormControl.Label>
              <Input 
                placeholder="Nombres y apellidos" 
                value={values.name}
                onChangeText={handleChange('name')}
                editable={load === true}
              />
              {
                errors.name &&
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                  { errors.name }
                </FormControl.ErrorMessage>
              }
            </FormControl>
            <FormControl isInvalid={errors.age !== undefined} style={styles.rootInput}>
              <FormControl.Label mb={2.5}>Edad</FormControl.Label>
              <Input 
                placeholder="Ingresa la edad" 
                keyboardType='numeric'
                value={`${values.age}`}
                onChangeText={handleChange('age')}
                editable={load === true}
              />
              {
                errors.age &&
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                  { errors.age }
                </FormControl.ErrorMessage>
              }
            </FormControl>
            <FormControl isInvalid={errors.bibliography !== undefined} style={styles.rootInput}>
              <FormControl.Label mb={2.5}>Bibliografia</FormControl.Label>
              <Input 
                type='text'
                numberOfLines={4}
                value={values.bibliography}
                onChangeText={handleChange('bibliography')}
                placeholder='Ingresa su bibliografia'
                editable={load === true}
              />
              {
                errors.bibliography &&
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                  { errors.bibliography }
                </FormControl.ErrorMessage>
              }
            </FormControl>
            
              
                <Button
                  style={{position: 'relative'}}
                  disabled={load}
                  endIcon={
                    load ? <ActivityIndicator size={24} color='#fff' style={{marginLeft: 15}} /> : <View />
                  }
                  _text={{
                    fontSize: 'md',
                    fontWeight: 'medium'
                  }}
                  onPress={() => handleSubmit()}
                >
                  Guardar
                </Button>
          </View>
        )}
        </Formik>
        <AlertCollpaseUI 
          style={{marginTop: 20}}
          isOpened={message !== undefined}
          typeAlert={typeAlert}
          title={message}
          showIcon
        />
      </KeyboardAvoidingView>
    )
}
