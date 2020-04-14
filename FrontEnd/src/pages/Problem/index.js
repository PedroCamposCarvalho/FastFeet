import React, { Component } from 'react';
import { Container, Titulo, Grid } from './styles';
import api from '~/services/api';
import ProblemItem from './ProblemItem';
import FooterPages from '~/components/FooterPages';

export default class Problem extends Component {
  constructor() {
    super();
    this.state = {
      problems: [],
      page: 1,
    };
    this.updateList = async () => {
      const response = await api.get('/problems?page=1');
      await this.setState({ problems: response.data, page: 1 });
    };
    this.clickPlus = async () => {
      const { page } = this.state;
      const response = await api.get(`/problems?page=${page + 1}`);

      await this.setState({ problems: response.data, page: page + 1 });
    };
    this.clickMinus = async () => {
      const { page } = this.state;
      if (page > 1) {
        const response = await api.get(`/problems?page=${page - 1}`);
        await this.setState({ problems: response.data, page: page - 1 });
      }
    };
  }

  async componentDidMount() {
    const response = await api.get('/problems');
    await this.setState({ problems: response.data });
  }

  render() {
    const { problems, page } = this.state;
    return (
      <Container>
        <Titulo>
          <h1>Problemas na entrega</h1>
        </Titulo>
        <Grid>
          <section>
            <strong>Encomenda</strong>
            <strong>Problema</strong>
            <strong>Ações</strong>
          </section>
          {problems.map(problem => (
            <ProblemItem
              key={problem.id}
              data={problem}
              updateProblem={this.updateList}
            />
          ))}
        </Grid>
        <FooterPages
          page={page}
          clickPlus={this.clickPlus}
          clickMinus={this.clickMinus}
        />
      </Container>
    );
  }
}
