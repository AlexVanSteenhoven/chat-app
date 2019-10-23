let expect = require('expect');
let { genMessage } = require('./message');

describe('generate Message', () => {
  it('should generate correct message object', () => {
    let from = "Alex",
        text = "Random Test",
        message = genMessage(from, text);

    expect(typeof message.createdAt).toBe('number');
    expect(message).toMatchObject({ from, text });
  })
});