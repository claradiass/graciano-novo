import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "react-native";

import NavegadorBottomTab from "./NavegadorBottomTab";
import TelaLogin from "../screens/TelaLogin";

import TelaManutencaoLista from "../screens/TelaManutencaoLista";
import TelaManutencaoAdicionar from "../screens/TelaManutencaoAdicionar";
import TelaManutencaoConcluir from "../screens/TelaManutencaoConcluir";
import TelaManutencaoVisualizar from "../screens/TelaManutencaoVisualizar";
import TelaManutencaoListaConcluidas from "../screens/TelaManutencaoListaConcluidas";
import TelaManutencaoListaProximo from "../screens/TelaManutencaoListaProximo";
import TelaManutencaoListaAtrasados from "../screens/TelaManutencaoListaAtrasados";
import TelaClienteAdicionar from "../screens/TelaClienteAdicionar";
import TelaClienteAtualizar from "../screens/TelaClienteAtualizar";
import TelaClienteLista from "../screens/TelaClienteLista";
import TelaAgendamento from "../screens/TelaAgendamento";
import TelaClienteServicos from "../screens/TelaClienteServicos";
import TelaClienteServicosConcluidos from "../screens/TelaClienteServicosConcluidos";
import TelaClienteServicosPendentes from "../screens/TelaClienteServicosPendentes";
import TelaManuntencaoAtualizar from "../screens/TelaManuntencaoAtualizar";
import TelaAgendamentoAdicionar from "../screens/TelaAgendamentoAdicionar";
import TelaAgendamentoAtualizar from "../screens/TelaAgendamentoAtualizar";
import TelaAgenda from "../screens/TelaAgenda";

const Stack = createNativeStackNavigator();

export default function NavegadorPrincipal() {
  return (
    <>
      <StatusBar backgroundColor="#88CDF6" />
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={TelaLogin}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Principal"
          component={NavegadorBottomTab}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="TelaAgenda"
          component={TelaAgenda}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TelaClienteServicos"
          component={TelaClienteServicos}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TelaClienteServicosConcluidos"
          component={TelaClienteServicosConcluidos}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TelaClienteServicosPendentes"
          component={TelaClienteServicosPendentes}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TelaClienteAtualizar"
          component={TelaClienteAtualizar}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TelaClienteLista"
          component={TelaClienteLista}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TelaClienteAdicionar"
          component={TelaClienteAdicionar}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TelaAgendamento"
          component={TelaAgendamento}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TelaAgendamentoAdicionar"
          component={TelaAgendamentoAdicionar}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TelaAgendamentoAtualizar"
          component={TelaAgendamentoAtualizar}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TelaManutencaoAdicionar"
          component={TelaManutencaoAdicionar}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TelaManuntencaoAtualizar"
          component={TelaManuntencaoAtualizar}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TelaManutencaoVisualizar"
          component={TelaManutencaoVisualizar}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TelaManutencaoConcluir"
          component={TelaManutencaoConcluir}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TelaManutencaoListaConcluidas"
          component={TelaManutencaoListaConcluidas}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TelaManutencaoListaProximo"
          component={TelaManutencaoListaProximo}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TelaManutencaoListaAtrasados"
          component={TelaManutencaoListaAtrasados}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  );
}
