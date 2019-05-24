// Creare un calendario dinamico con le festività. Partiamo dal gennaio2018 dando la possibilità di cambiare mese, gestendo il caso in cui l’APInon possa ritornare festività. Il calendario partirà da gennaio 2018 e siconcluderà a dicembre 2018 (unici dati disponibili sull’API).Ogni volta che cambio mese dovrò:

// - 1.Controllare se il mese è valido (per ovviare al problema che l’APInon carichi holiday non del 2018)
// -2.Controllare quanti giorni ha il mese scelto formando così una lista

$(document).ready(function() {
//imposto un contatore mese che parte da 1
  var mese = 1
  //sostituisco il valore mese nella data
  var data ='2018-' + mese + '-1';
  var moment_date = moment(data);
  console.log(data);
  console.log(moment_date);
  //giorni in un mese
  var giorni = moment_date.daysInMonth();
  console.log(giorni);
  //variabile per mese
  var mese = moment_date.format('MMMM');
  //variabile per anno
  var anno = moment_date.format('YYYY');
  console.log(mese);
  console.log(anno);
  //nel testo inizialmente vuoto inserisco il mese e l'anno
  $('.mese_corrente').text(mese + ' ' + anno);

  console.log($('.mese_corrente').text(mese + ' ' + anno));
  //ciclo da 1 fino alla lunghezza del mese
  for(var i = 1;i <= giorni; i++){
    //giorno uguale al numero i che cicla di volta in volta e
    var giorno = i + ' ' + mese;
    //appendo ogni volta nelle li 
    $('.calendario').append('<li>'+ giorno + '</li>')
  }

})
