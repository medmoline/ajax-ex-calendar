// Creare un calendario dinamico con le festività. Partiamo dal gennaio2018 dando la possibilità di cambiare mese, gestendo il caso in cui l’APInon possa ritornare festività. Il calendario partirà da gennaio 2018 e siconcluderà a dicembre 2018 (unici dati disponibili sull’API).Ogni volta che cambio mese dovrò:

// - 1.Controllare se il mese è valido (per ovviare al problema che l’APInon carichi holiday non del 2018)
// -2.Controllare quanti giorni ha il mese scelto formando così una lista

$(document).ready(function() {
//imposto un contatore mese che parte da 1
  var contatore_mese = 1;
    mostra_mese();
    chiamata_ajax();

    //quando clicco il bottone prev
    $(document).on('click', '.prev', function() {
    //mese scende di un grado
    //resetto l'html iniziale
      $('.mese').html('')
      contatore_mese--;
      if(contatore_mese <= 12){
        mostra_mese();
        chiamata_ajax();
      }
    })

  //quando clicco il bottone next
  $(document).on('click', '.next', function() {
    //resetto l'Html iniziale
    $('.mese').html('')
    //mese sale di un grado
    contatore_mese++;
      if(contatore_mese >= 1){
        mostra_mese();
        chiamata_ajax();
      }
    })


  function mostra_mese(){
    //sostituisco il valore contatore nella data
    var data ='2018-' + contatore_mese + '-1';
    //applico moment
    var moment_date = moment(data);
    //giorni in un mese
    var giorni = moment_date.daysInMonth();
    console.log(giorni);
    //variabile per mese
    var mese_lettere = moment_date.format('MMMM');
    var mese_numero = moment_date.format('MM');
    console.log(mese_numero);
    //variabile per anno
    var anno = moment_date.format('YYYY');
    //nel testo inizialmente vuoto inserisco il mese e l'anno
    $('.mese_corrente').text(mese_lettere + ' ' + anno);

    //ciclo da 1 fino alla lunghezza del mese
    for(var i = 1;i <= giorni; i++){
      if( i < 10){
        i = '0'+ i;
      }
      var giorno = i + ' ' + mese_lettere;
      //giorno uguale al numero i che cicla di volta in volta e
      var source   = $("#entry-template").html();
      var template = Handlebars.compile(source);
      var context = {
        'title': giorno,
        'body': anno + '-' + mese_numero +'-'+ i
      };

      var html = template(context);

      //appendo ogni volta nelle li
      $('.mese').append(html);
    }

  }

function chiamata_ajax(){
  var numero_mesi_anno = contatore_mese-1;
  $.ajax({
    'url': 'https:flynn.boolean.careers/exercises/api/holidays',
    'data':{
      'year': 2018,
      'month': numero_mesi_anno
    },
    'success': function(data){
      $('.mese li').each(function() {
        for(var i=0; i<data.response.length; i++){
          if(data.response[i].date == $(this).data('li')){
            $(this).append( '<p>'+ data.response[i].name +'</p>' ).addClass('red')
          }
        }
      })
    }
  })
}

})
