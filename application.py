#!/usr/bin/env python
from flask import Flask, send_from_directory
from flask import render_template, flash, redirect
import os
import json

try:
    from config import ROOT_DIR
except ImportError:
    ROOT_DIR = '/media/'

app = Flask(__name__)
app.debug = True
app.use_x_sendfile = True

#SERVER_NAME = 'localhost'
#SERVER_PORT = 5000


video_list = ['.mp4', '.webm', '.h264']
audio_list = ['.mp3', '.ogg', '.wav']


def get_file_ext(file_list):
    """
    Function to split filename into name and ext
    """
    files = []
    file_dict = {}
    for f in file_list:
        file_dict = {}
        file_dict['path'] = f
        # split into name and ext
        name, ext = os.path.splitext(f)
        file_dict['name'] = name
        # remove '.' from ext
        file_dict['ext'] = ext[1:]
        # check if recognised video format
        if ext in video_list:
            file_dict['type'] = 'video'
        # check if recognised audio format
        elif ext in audio_list:
            file_dict['type'] = 'audio'
        else:
            file_dict['type'] = 'unknown'
        files.append(file_dict)
    return files

## ------------------------------- ROUTES ##


@app.route('/')
def index():
    dirs = []
    # define root dir
    root = ROOT_DIR
    # et directories
    dir_list = [name for name in os.listdir(
        root) if os.path.isdir(os.path.join(root, name))]

    for d in dir_list:
        #size = os.path.getsize('/media/' + d)
        #if size > 4096:
        dirs.append(d)

    # get files
    file_list = [name for name in os.listdir(
        root) if os.path.isfile(os.path.join(root, name))]
    files = get_file_ext(file_list)

    return render_template(
        "index.html",
        title='Welcome to Schanpps!',
        dir_list=dir_list,
        files=files
    )


@app.route('/get_dir/<path:path>', methods=['GET'])
def get_dir(path):
    path = ROOT_DIR + path
    # get directories
    dir_list = [name for name in os.listdir(
        path) if os.path.isdir(os.path.join(path, name))]
    # get files
    file_list = [name for name in os.listdir(
        path) if os.path.isfile(os.path.join(path, name))]
    # collect contents
    contents = {}
    contents['path'] = path
    contents['dirs'] = dir_list

    files = get_file_ext(file_list)

    contents['files'] = files
    # return as json
    return json.dumps(contents)


@app.route('/get_media/<path:filename>', methods=['GET'])
def get_media(filename):
    response = send_from_directory('/media/', filename)
    header = response.headers.pop('X-SendFile')
    response.headers['X-Accel-Redirect'] = header
    return response


if __name__ == '__main__':
    # Bind to PORT if defined, otherwise default to 5000.
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
