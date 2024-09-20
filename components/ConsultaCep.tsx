import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

interface CepData {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}

const ConsultaCep: React.FC = () => {
  const [cep, setCep] = useState<string>('');
  const [dados, setDados] = useState<CepData | null>(null);
  const [erro, setErro] = useState<string>('');

  const buscarCep = async () => {
    try {
      const response = await axios.get<CepData>(`https://viacep.com.br/ws/${cep}/json/`);
      if (response.data.hasOwnProperty('erro')) {
        setErro('CEP não encontrado');
        setDados(null);
      } else {
        setErro('');
        setDados(response.data);
      }
    } catch (error) {
      setErro('Erro ao buscar CEP');
      setDados(null);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite o CEP"
        value={cep}
        onChangeText={setCep}
        keyboardType="numeric"
      />
      <Button title="Buscar" onPress={buscarCep} />
      {erro ? <Text style={styles.error}>{erro}</Text> : null}
      {dados && (
        <View>
          <Text>CEP: {dados.cep}</Text>
          <Text>Logradouro: {dados.logradouro}</Text>
          <Text>Bairro: {dados.bairro}</Text>
          <Text>Cidade: {dados.localidade}</Text>
          <Text>Estado: {dados.uf}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default ConsultaCep;
