var downloaderGlobal = {
    completionTally: 0,
    failureTally: 0,
    rootdir: ''
};


function filetransfer(download_link,fp) {
    var fileTransfer = new FileTransfer();
    var progressContainer = document.getElementById('progressContainer');
        progressContainer.setAttribute("style","display: block"); 
    var progressbar = document.createElement("div");
        progressbar.setAttribute("class","progress-bar progress-bar-striped");
        progressContainer.appendChild(progressbar);

    if (typeof FileTransfer === 'undefined') {
        alert("File transfer plug in is missing. Downloads may not be complete.");
        return;
    }
    fileTransfer.onprogress = function(progressEvent) {
        
        if (progressEvent.lengthComputable) {
            var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
            progressbar.setAttribute("style","width: "+perc+"%");
            progressContainer.appendChild(document.createTextNode("Downloading files..."));
        }
    };

    
    fileTransfer.download(
        download_link,
        fp,
        function(entry) {
            var dl = new Downloader();
            console.log("download complete: " + entry.fullPath);
            downloaderGlobal.completionTally++;
            if (downloaderGlobal.completionTally === dl.download_links.length) {
                alert("Download Complete!");
            }
        },
        function(error) {
            console.log("download error source " + error.source);
            downloaderGlobal.failureTally++;
            console.log(downloaderGlobal.failureTally);
        }
    );
}

var Downloader = function Downloader() {
    this.download_links = [
            "https://github.com/cbitstech/conemo_videos/blob/master/LM1.mp4?raw=true",
            "https://github.com/cbitstech/conemo_videos/blob/master/LM2.mp4?raw=true",
            "https://github.com/cbitstech/conemo_videos/blob/master/LM3.mp4?raw=true",
            "https://github.com/cbitstech/conemo_videos/blob/master/LM4.mp4?raw=true",
            "https://github.com/cbitstech/conemo_videos/blob/master/SP1.mp4?raw=true",
            "https://github.com/cbitstech/conemo_videos/blob/master/SP2.mp4?raw=true",
            "https://github.com/cbitstech/conemo_videos/blob/master/SP3.mp4?raw=true",
            "https://github.com/cbitstech/conemo_videos/blob/master/SP4.mp4?raw=true"
        ];
    this.className = "Downloader";
};

Downloader.prototype = {
     
    getFileSystem: function() {
        document.addEventListener('deviceready', function() {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemSuccess, fileSystemFail);
        function fileSystemSuccess(fileSystem) {
            downloaderGlobal.rootdir = fileSystem.root.toURL();
        }
        function fileSystemFail(evt) {
            //Unable to access file system
            alert(evt.target.error.code);
        }
      });
    },

    test: function() {
        return "test";
    },

    download: function() {
        // the order that these links are listed is the order that corresponds to the content.
        // e.g. the first link in this array will correspond to the string 'video01' in the content.
        var dl = new Downloader();
        var download_links = dl.download_links;
        var numDownloads = download_links.length;
        fp = [];
        for (var i = 0; i < numDownloads; i++) {
            ext = download_links[i].substr(download_links[i].lastIndexOf('.') + 1);

            fp.push(downloaderGlobal.rootdir + "downloaded_video" + i + "." + ext); // file path and name
            localStorage.setItem('fp',JSON.stringify(fp));

            // call file transfer function
            filetransfer(download_links[i], fp[i]);
        }

        setTimeout(function() {
            if (downloaderGlobal.failureTally !== 0) {
                alert("Something went wrong with the download and people have been notified.");
            }
            downloaderGlobal.failureTally = 0;
        }, 500);
    },

    findInstances: function(fileType,content) {
        // global variable for use with insert function
        elements = [];

        // currently supported file types: video, audio and should appear with the file type and id numbers following
        // e.g. video1, audio2, video52, audio12, etc.
        var reg = new RegExp(fileType+"[0-9]{1,2}","g");
        var found = String(content.match(reg));

        elements.push(found);
        elements = elements[0].split(',');
        return elements;

    },

    insert: function(fileType,content) {
        elemNums = [];
        elemNew = [];
        for (i = 0; i < elements.length; i++) {
            // access local storage if files have already been downloaded
            if (typeof localStorage.fp === 'undefined') {
                alert("Please download the most recent content.");
                return content;
            }
            else if (elements[0] === "null") {
                return content;
            }
            else {
                fp = JSON.parse(localStorage.fp);
            }
            // create an array of the ID numbers
            var elemId = new RegExp(fileType+"(.*)");
            elemNums.push(elements[i].match(elemId)[1]);

            // create the corresponding video tag, referencing the index number of the file path array
            var elemTag;
            var fileSrc = fp[parseFloat(elemNums[i])];
                if (fileType === "video") {
                    elemTag = "<video controls style='max-width:100%;'><source type='video/mp4' src='"+fileSrc+"'/></video>";
                }
                else if (fileType === "audio") {
                    elemTag = "<audio controls style='max-width:100%;'><source type='audio/mpeg' src='"+fileSrc+"'/></audio>";
                }
                else {
                    alert("That file type is not currently supported.");
                    return content;
                }
            elemNew.push(elemTag);
            if (elemNew[i].indexOf("undefined") === -1) {
                content = content.replace(elements[i],elemNew[i]);
            }
            else {
                content = content.replace(elements[i],"<p>This video is unavailable.</p>");
            }
        }
        return content;
    }
};


