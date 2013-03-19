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
  };
  



  function getDir(e) {
          $('.dir').unbind('click', getDir);
          $('.file').unbind('click', playFile);
          //console.log('click prevented!')
          // prevent default link behaviour 
          e.preventDefault()
          // get path from href
          var selected = $(this);
          var path = selected.attr('href');
          //console.log('path: ', path)
          if (path) {
              $.getJSON(root_url + path, {
                  path: path
              }, function(data, jqXHR){
                  console.log('dirs: ', data.dirs)
                  var dir_list = [];
                  for (var i=0; i<data.dirs.length; i++) {
                      output = '<li><a class="dir" href="' + path + '/' + data.dirs[i] + '">/' + data.dirs[i] + '</a><div class="dir_div" style="display:none;"></div></li>';
                      //output = 'foo';
                      dir_list.push(output);
                  };

                  console.log('files: ', data.files)
                  for (var i=0; i<data.files.length; i++) {
                      output = '<li><a class="file" href="' + path + '/' + data.files[i] + '">' + data.files[i] + '</a></li>';
                      dir_list.push(output);
                  }
          
                  selected.next('.dir_div').html(dir_list).slideToggle("slow");
                  $('.dir').bind('click', getDir);
                  $('.file').bind('click', playFile)

              });
          };
  };
  $('.dir').click(getDir);
  $('.file').click(playFile);

});