import request from 'supertest';
import { app } from '../app';
import { ComparisonPage } from '../entities/ComparisonPage';
import { Project } from '../entities/Project';
import { InMemoryComparisonPagesRepository } from '../infraestructure/repositories/inMemory/InMemoryComparisonPagesRepository';
import { InMemoryProjectsRepository } from '../infraestructure/repositories/inMemory/InMemoryProjectsRepository';

describe('/comparisonPage', () => {
  test('not found comparison pages', async () => {
    const spySearch = jest.spyOn(InMemoryComparisonPagesRepository.prototype, 'search');
    spySearch.mockImplementation(() => Promise.resolve([]));
    const res = await request(app).get('/comparisonPage?project=project-example');
    expect(res.status).toEqual(200);
    expect(res.body).toEqual([]);
  });

  test('found comparison pages', async () => {
    const spySearch = jest.spyOn(InMemoryComparisonPagesRepository.prototype, 'search');
    const sypeFindProjectById = jest.spyOn(InMemoryProjectsRepository.prototype, 'findById');
    spySearch.mockImplementation(() =>
      Promise.resolve([
        new ComparisonPage({
          slug: 'react',
          qtdUserVisits: 0,
          projectIds: ['facebook/react'],
        }),
      ]),
    );
    sypeFindProjectById.mockImplementation((projectId: string) => {
      if (projectId === 'facebook/react') {
        return Promise.resolve(
          new Project({
            id: 'facebook/react',
            owner: 'facebook',
            name: 'react',
            description: '...',
            qtdOpenIssues: 5440,
          }),
        );
      }
      return Promise.resolve(null);
    });
    const res = await request(app).get('/comparisonPage?project=react');
    expect(res.status).toEqual(200);
    expect(res.body).toEqual([
      {
        qtdUserVisits: 0,
        slug: 'react',
        projects: [
          {
            fullName: 'facebook/react',
            name: 'react',
            owner: 'facebook',
            description: '...',
          },
        ],
      },
    ]);
  });

  test('found comparison pages without project', async () => {
    const spySearch = jest.spyOn(InMemoryComparisonPagesRepository.prototype, 'search');
    const sypeFindProjectById = jest.spyOn(InMemoryProjectsRepository.prototype, 'findById');
    spySearch.mockImplementation(() =>
      Promise.resolve([
        new ComparisonPage({
          slug: 'react',
          qtdUserVisits: 0,
          projectIds: ['facebook/react'],
        }),
      ]),
    );
    sypeFindProjectById.mockImplementation(() => Promise.resolve(null));
    const res = await request(app).get('/comparisonPage?project=react');
    expect(res.status).toEqual(400);
    expect(res.body).toEqual({ message: 'Error on get projects' });
  });
});
