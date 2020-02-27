let makeRequest = list => {
  fetch('https://type.fit/api/quotes')
  .then(response => response.json())
  .then(data => {
    for (const row of data) {
      list = [...list, { text: row['text'], author: row['author'] }];
    }
  })
};

export default makeRequest;