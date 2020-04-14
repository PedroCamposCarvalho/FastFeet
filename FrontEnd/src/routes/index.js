import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import SingIn from '~/pages/SingIn';
import Delivery from '~/pages/Delivery';
import CreateDelivery from '~/pages/Delivery/CreateEdit/CreateDelivery';
import EditDelivery from '../pages/Delivery/CreateEdit/EditDelivery';
import Courier from '~/pages/Courier';
import CreateCourier from '~/pages/Courier/CreateEdit/CreateCourier';
import EditCourier from '~/pages/Courier/CreateEdit/EditCourier';
import Recipient from '~/pages/Recipient';
import CreateRecipient from '~/pages/Recipient/CreateEdit/CreateRecipient';
import EditRecipient from '~/pages/Recipient/CreateEdit/EditRecipient';
import Problem from '~/pages/Problem';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SingIn} />
      <Route path="/Delivery" exact component={Delivery} isPrivate />
      <Route
        path="/CreateDelivery"
        exact
        component={CreateDelivery}
        isPrivate
      />
      <Route
        path="/EditDelivery/:id"
        exact
        component={EditDelivery}
        isPrivate
      />
      <Route path="/Courier" exact component={Courier} isPrivate />
      <Route path="/CreateCourier" exact component={CreateCourier} isPrivate />
      <Route path="/EditCourier/:id" exact component={EditCourier} isPrivate />
      <Route path="/Recipient" exact component={Recipient} isPrivate />
      <Route
        path="/CreateRecipient"
        exact
        component={CreateRecipient}
        isPrivate
      />
      <Route
        path="/EditRecipient/:id"
        exact
        component={EditRecipient}
        isPrivate
      />
      <Route path="/Problems" exact component={Problem} isPrivate />
    </Switch>
  );
}
