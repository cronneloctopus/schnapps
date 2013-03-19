$(document).ready(function(){
  
  function playFile(e) {
          //$('.file').unbind('click', playFile);
          //console.log('click prevented!')
          // prevent default link behaviour 
          e.preventDefault()
          // get path from href
          var selected = $(this);
          var path = selected.attr('href');
          console.log('path: ', path)
          /*
          if (path) {
              $.getJSON(root_url + path, {
                  path: path
              }, function(data, jqXHR){
                  console.log('FILE: ', path)
              });
          };
          */
          var output = '<h1>You selected this file: ' + path + '</div>';
          $('#play_div').html(output);
          //$('.file').bind('click', playFile);
  };
  $('.file').click(playFile);
});