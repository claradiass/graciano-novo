import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';

import TelaManutencaoAdicionar from '../screens/TelaManutencaoAdicionar';
import TelaManutencaoConcluir from '../screens/TelaManutencaoConcluir';
import TelaManutencaoVisualizar from '../screens/TelaManutencaoVisualizar';
import TelaManutencaoListaConcluidas from '../screens/TelaManutencaoListaConcluidas';
import TelaManutencaoListaProximo from '../screens/TelaManutencaoListaProximo';
import TelaManutencaoListaAtrasados from '../screens/TelaManutencaoListaAtrasados'
import TelaLogin from '../screens/TelaLogin'
import TelaClienteAdicionar from '../screens/TelaClienteAdicionar'
import TelaClienteAtualizar from '../screens/TelaClienteAtualizar'
import TelaAgendamento from '../screens/TelaAgendamento'
import TelaClienteServicos from '../screens/TelaClienteServicos'
import TelaClienteServicosConcluidos from '../screens/TelaClienteServicosConcluidos'
import TelaClienteServicosPendentes from '../screens/TelaClienteServicosPendentes'
import TelaManuntencaoAtualizar from '../screens/TelaManuntencaoAtualizar'

import NavegadorBottomTab from './NavegadorBottomTab';




const Stack = createNativeStackNavigator();

export default function NavegadorPrincipal() {
  return (
    <>
      <StatusBar backgroundColor="#88CDF6" barStyle="light-content" />
      <Stack.Navigator>

      <Stack.Screen
          name="Principal"
          component={NavegadorBottomTab}
          options={{
            headerShown: false,
          }}
        />

      <Stack.Screen
          name="Login"
          component={TelaLogin}
          options={{
            headerShown: false,
          }}
        />        

        <Stack.Screen
          name="ManutencaoAdicionar"
          component={TelaManutencaoAdicionar}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="ManutencaoConcluir"
          component={TelaManutencaoConcluir}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="ManutencaoVisualizar"
          component={TelaManutencaoVisualizar}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ManutencaoListaConcluidas"
          component={TelaManutencaoListaConcluidas}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ManutencaoListaProximo"
          component={TelaManutencaoListaProximo}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ManutencaoListaAtrasados"
          component={TelaManutencaoListaAtrasados}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ClienteAdicionar"
          component={TelaClienteAdicionar}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ClienteAtualizar"
          component={TelaClienteAtualizar}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Agendamento"
          component={TelaAgendamento}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="TelaClienteServicos"
          component={TelaClienteServicos}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="TelaClienteServicosConcluidos"
          component={TelaClienteServicosConcluidos}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="TelaClienteServicosPendentes"
          component={TelaClienteServicosPendentes}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="TelaManuntencaoAtualizar"
          component={TelaManuntencaoAtualizar}
          options={{
            headerShown: false,
          }}
        />

        
      </Stack.Navigator>
    </>
  );
}
