import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Info, List, Item, Descricao, Data, Titulo } from './styles';
import Background from '~/components/Background';
import api from '~/services/api';
import { formatarData } from '~/utils/functions';

export default class VisualizeProblem extends Component {
  constructor() {
    super();
    this.state = {
      problems: [],
    };
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const { id } = navigation.state.params;
    const response = await api.get(`/problems/${id}`);
    await this.setState({ problems: response.data });
  }

  render() {
    const { problems } = this.state;
    return (
      <Container>
        <Background />
        <Info>
          <Titulo>Encomenda 01</Titulo>
          <List
            data={problems}
            keyExtractor={(problem) => problem.id}
            renderItem={({ item }) => (
              <Item>
                <Descricao>{item.description}</Descricao>
                <Data>{formatarData(item.createdAt)}</Data>
              </Item>
            )}
          />
        </Info>
      </Container>
    );
  }
}

VisualizeProblem.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    state: PropTypes.func,
  }).isRequired,
};
