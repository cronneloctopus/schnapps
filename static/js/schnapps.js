$(document).ready(function(){

  function playFile(e) {
          // prevent default link behaviour 
          e.preventDefault()
          // get path from href
          var selected = $(this);
          var path = selected.attr('href');
          var title = selected.attr('title');
          //console.log('path: ', path)
          
          //var output = '<h2>You selected this file: ' + path + '</h2>';

          // IF FILE IS VIDEO
          if (selected.hasClass('video')) {
            //console.log('VIDEO!');
            $('#video_player').slideToggle("1000");
            $("#video_mp4").attr('src', 'http://localhost:5000/get_media/' + path);
            $("#video_webm").attr('src', 'http://localhost:5000/get_media/' + path);
            $("#video_player")[0].load();
            $("#video_player")[0].play();
            $("#video_message").text(title)
          }

          // IF FILE IS AUDIO
          if (selected.hasClass('audio')) {
            //console.log('AUDIO!');
            // TODO: set a default here!!!
            var player = $("#audio_mp3");
            // MP3
            if (selected.hasClass('mp3')) {
              var player = $("#audio_mp3");
            }
            // OGG
            else if (selected.hasClass('ogg')){
              var player = $("#audio_ogg")
            }

            player.attr('src', 'http://localhost:5000/get_media/' + path);
            
            // only toggle the player if not already visible
            if ($('#audio_player').attr('style') == 'display:none;') {
              $("#audio_player").slideToggle("1000"); 
            }
            $("#audio_player")[0].load();
            $("#audio_player")[0].play();
            $("#audio_message").text(title)
          }


  }; // end playFile
  



  function getDir(e) {
          console.log('click prevented!')
          // prevent default link behaviour 
          e.preventDefault()
          $('.dir').unbind('click', getDir);
          // get path from href
          var selected = $(this);
          var path = selected.attr('href');
          console.log('path: ', path)
          if (path) {
              $.getJSON(root_url + path, {
                  path: path
              }, function(data, jqXHR){
                  console.log('dirs: ', data.dirs)

                  // render directories
                  var dir_list = [];
                  for (var i=0; i<data.dirs.length; i++) {
                      output = '<li><a class="dir" href="' + path + '/' + data.dirs[i] + '">/' + data.dirs[i] + '</a><div class="dir_div" style="display:none;"></div></li>';
                      //output = 'foo';
                      dir_list.push(output);
                  };

                  // render files
                  console.log('files: ', data.files)
                  for (var i=0; i<data.files.length; i++) {
                      // truncate name
                      var filename = data.files[i].name;
                      if (filename.length > 35) {
                          var display_name = jQuery.trim(data.files[i].name).substring(0, 35).trim(this) + "...";
                      } else {
                          var display_name = filename
                      }
                      // issue class depending on extension
                      output = '<li><a class="file ' + data.files[i].type + ' ' + data.files[i].ext + '"';
                      output += 'title="' + filename + '" href="' + path + '/' + data.files[i].path + '">' + display_name + '</a></li>';
                      dir_list.push(output);
                  }
          
                  // places directory contents into div below
                  selected.next('.dir_div').html(dir_list).slideToggle("slow");
                  $('.dir').bind('click', getDir);
                  $('.file').bind('click', playFile)

              });
          };
  }; // end getDir
  $('.dir').click(getDir);
  $('.file').click(playFile);

}); // end document model