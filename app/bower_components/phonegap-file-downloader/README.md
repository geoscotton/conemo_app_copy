=======
PhoneGap File Downloader/Reader
====================


This library creates an object "files" that has a method to download and insert the downloaded files into app content. 

Key dependencies:
-----------------
- Cordova 


Installation process:

1. Run
`bower install phonegap-file-downloader`

2. Install necessary Cordova plugins if you haven't done so already. In your project directory, run from the command line:

`cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-file.git`
`cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-file-transfer.git`

3. Add `<access origin="*" />` to your config.xml file.


Usage:
---------------

Config:
-------
Upon initial app installation, any files that you will want to insert into content will have to be downloaded from a remote server. 

The URLs to the files can be changed by modifying the array `files.download_links`.

The order in the array should correspond to the numerical ID you will use to identify the media in the content.

For example:
```
files.download_links = [
		"http://example.com/video_funny.mp4",
		"http://example.com/video_mediocre.mp4",
		"http://example.com/video_sad.mp4"
	]
```
will correspond to video1, video2, and video3, respectively.

Replacing static content with media:
-------
The files.insert method currently takes "video" and "audio" as arguments of file types. 

This will replace any static content of [filetype][numberId] with your chosen download links above. The number id "1" and "01" are functionally the same, meaning they will result in the same file but.

For example
```
sampleText = "lorem ipsum video0 lorem lorem video 01 lorem video1";

files.insert('video',sampleText);
```

will result in video0 playing the "funny" video and video1 and video01 playing the "mediocre" video.



