import tomatoesMock from './searchBar/Tomatoes';

// global.fetch = jest.fn((url) => {
//   Promise.resolve({
//     json: () => Promise.resolve(tomatoesMock),
//   });
// });

const fetch = (url) => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(),
  });
};

export default fetch;
