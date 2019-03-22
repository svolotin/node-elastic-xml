const cut = require('../lib/controllers/queryutils');

test('Elasticsearch client should be called with correct queryterm', async () => {
  const term = { test: 'test' };
  const result = await cut.search({ test: 'test' });
  expect(result.query).toEqual(term);
});

test('axios post should be called', async () => {
  const result = await cut.getExternalData('test');
  expect(result.message).toContain('url');
});

