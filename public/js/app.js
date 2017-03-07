/* eslint-disable */
$('form').submit((e) => {
  e.preventDefault();
  const sourceText = $('#inputText').val();
  const destCode = $('#languageSelect option:selected').val();
  const url = `/api/translate?sourceText=${sourceText}&destinationLanguageCode=${destCode}`;
  $.ajax(url)
    .done((data, status, xhr) => {
      if (!data.result) {
        $('#result-pane').text('Translation not available.');
      } else {
        $('#result-pane').text(data.result.translations[0].translation);
      }
      updateHistory();
    });
});

function updateHistory() {
  const url = '/api/history'
  $.ajax(url)
    .done((data, status, xhr) => {
      $('#history').text('');
      const docs = data.docs;
      docs.forEach((doc) => {
        const translation = doc.content.translation.translations[0].translation;
        const sourceText = doc.content.sourceText;
        const destLang = doc.content.destLang;
        $('#history').append(
          `<tr><td>${sourceText}</td><td>${destLang}</td><td>${translation}</td></tr>`
        );
      })
    });
}

updateHistory();
