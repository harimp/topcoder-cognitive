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
    });
});
