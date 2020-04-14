import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Sign from './pages/Sign';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Details from '~/pages/Delivery/Details';
import SetProblem from '~/pages/Delivery/SetProblem';
import VisualizeProblem from '~/pages/Delivery/VisualizeProblem';
import ConfirmDelivery from '~/pages/Delivery/ConfirmDelivery';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        SignIn: createSwitchNavigator({
          Sign,
        }),
        App: createBottomTabNavigator(
          {
            Dashboard: {
              screen: createStackNavigator(
                {
                  Dashboard: {
                    screen: Dashboard,
                    navigationOptions: {
                      header: null,
                    },
                  },
                  Details: {
                    screen: Details,
                    navigationOptions: {
                      headerTitle: 'Detalhes da encomenda',
                    },
                  },
                  SetProblem: {
                    screen: SetProblem,
                    navigationOptions: {
                      headerTitle: 'Informar problema',
                    },
                  },
                  VisualizeProblem: {
                    screen: VisualizeProblem,
                    navigationOptions: {
                      headerTitle: 'Visualizar problemas',
                    },
                  },
                  ConfirmDelivery: {
                    screen: ConfirmDelivery,
                    navigationOptions: {
                      headerTitle: 'Confirmar entrega',
                    },
                  },
                },
                {
                  defaultNavigationOptions: {
                    headerTransparent: true,
                    headerTintColor: '#fff',
                    headerBackTitleVisible: false,
                    headerLeftContainerStyle: {
                      marginLeft: 20,
                    },
                  },
                }
              ),
              navigationOptions: {
                tabBarLabel: 'Entregas',
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="menu" size={25} color={tintColor} />
                ),
              },
            },
            Profile,
          },
          {
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#7d40e7',
              inactiveTintColor: '#999999',
              style: {
                backgroundColor: '#fff',
              },
            },
          }
        ),
      },
      {
        initialRouteName: signedIn ? 'App' : 'SignIn',
      }
    )
  );
