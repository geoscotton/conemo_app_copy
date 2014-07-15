var Downloader = function Downloader() {
    this.className = "Downloader";
};

var downloaderGlobal = {
    completionTally: 0,
    failureTally: 0,
    rootdir: '',
    textDownloadComplete: '',
    textDownloading: '',
    textDownloadingError: '',
    textDownloadButton: '',
    textMissingPlugin: '',
    textMissingContent: '',
    textUnavailableMedia: '',
    textUnsupportedFileType: '',
    download_links: [
        "http://techslides.com/demos/sample-videos/small.mp4",
        "http://techslides.com/demos/sample-videos/small.mp4",
        "http://techslides.com/demos/sample-videos/small.mp4"
    ]
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
        // var dl = new Downloader();
        var dl_links = downloaderGlobal.download_links;
        var numDownloads = dl_links.length;
        document.getElementById("download-button").innerHTML = "Downloading "+numDownloads+" files...";
        fp = [];
        for (var i = 0; i < numDownloads; i++) {
            ext = dl_links[i].substr(dl_links[i].lastIndexOf('.') + 1);

            fp.push(downloaderGlobal.rootdir + "downloaded_video" + i + "." + ext); // file path and name
            localStorage.setItem('fp',JSON.stringify(fp));

            // call file transfer function
            filetransfer(dl_links[i], fp[i]);
        }

        setTimeout(function() {
            if (downloaderGlobal.failureTally !== 0) {
                alert("Something went wrong with the download and people have been notified.");
            }
            downloaderGlobal.failureTally = 0;
        }, 500);
    },

    setDownloadLinks: function(links) {
        if (links instanceof Array) {
            downloaderGlobal.download_links = links;
        }
        else {
            downloaderGlobal.download_links = links;
        }
        console.log(downloaderGlobal.download_links);
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

function constructProgressBar (ftObject) {

    var progressContainer = document.getElementById('progressContainer');
        progressContainer.setAttribute("style","display: block"); 
    var progress = document.createElement("div");
        progress.setAttribute("class","progress");
        progressContainer.appendChild(progress);
    var progressbar = document.createElement("div");
        progressbar.setAttribute("class","progress-bar progress-bar-striped");
        progressbar.setAttribute("aria-valuemin","0");
        progressbar.setAttribute("aria-valuemax","100");
        progressbar.setAttribute("role","progressbar");
        progress.appendChild(progressbar);

    ftObject.onprogress = function(progressEvent) {
        
        if (progressEvent.lengthComputable) {
            var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
            progressbar.setAttribute("style","width: "+perc+"%");
            progressbar.setAttribute("aria-valuenow",perc);

            if (perc === 100) {
                setTimeout(function() {
                    progress.setAttribute("class","progress fade");
                }, 500);
            }
        }
    };
}


function filetransfer(file,filepath) {
    var fileTransfer = new FileTransfer();
    downloaderGlobal.completionTally = 0;

    if (typeof FileTransfer === 'undefined') {
        alert("File transfer plug in is missing. Downloads may not be complete.");
        return;
    }

    constructProgressBar(fileTransfer);
    
    fileTransfer.download(
        file,
        filepath,
        function(entry) {
            var dl = new Downloader();
            console.log("download complete: " + entry.fullPath);
            downloaderGlobal.completionTally++;
            if (downloaderGlobal.completionTally === downloaderGlobal.download_links.length) {
                alert("Download Complete!");
                document.getElementById("download-button").innerHTML = "Testing Download";
            }
        },
        function(error) {
            console.log("download error source " + error.source);
            downloaderGlobal.failureTally++;
            console.log(downloaderGlobal.failureTally);
        }
    );
}

