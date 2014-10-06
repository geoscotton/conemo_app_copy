var Downloader = function Downloader() {
    this.className = "Downloader";
};

var downloaderGlobal = {
    completionTally: 0,
    failureTally: 0,
    rootdir: '',
    textDownloadComplete: 'Download Complete!',
    textDownloading: 'Downloading',
    textFile: 'file',
    textFiles: 'files',
    textDownloadingError: 'Something went wrong with the download and a report has been sent.',
    textDownloadButton: 'Download',
    textMissingPlugin: 'File transfer plug in is missing. Downloads may not be complete.',
    textMissingContent: 'Please download the most recent content.',
    textUnavailableMedia: '<p>This media is unavailable.</p>',
    textUnsupportedFileType: 'That file type is not currently supported.',
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

    setDownloadLinks: function(links) {
        if (links instanceof Array) {
            downloaderGlobal.download_links = links;
        }
        else {
            downloaderGlobal.download_links = links;
        }
        alert(downloaderGlobal.download_links);

    },
    downloadSingle: function(url,folder) {
        fpSingle = '';
        ext = url.substr(url.lastIndexOf('.') + 1);
        fileName = url.substr(url.lastIndexOf('/') + 1);
        fileName = fileName.split('.')[0];
        if (folder) {
            fpSingle = downloaderGlobal.rootdir + folder + fileName + "1" + "." + ext; // file path and name
        }
        else {
            fpSingle = downloaderGlobal.rootdir + fileName + "." + ext; // file path and name
        }
        localStorage.setItem('fpSingle',fpSingle);

        // call file transfer function
        filetransfer(url, fpSingle, 1);

        setTimeout(function() {
            if (downloaderGlobal.failureTally !== 0) {
                alert(downloaderGlobal.textDownloadingError);
            }
            downloaderGlobal.failureTally = 0;
        }, 500);
    },
    downloadMultiple: function() {
        // the order that these links are listed is the order that corresponds to the content.
        // e.g. the first link in this array will correspond to the string 'video01' in the content.
        var dl_links = downloaderGlobal.download_links;
        var numDownloads = dl_links.length;

        fp = [];
        for (var i = 0; i < numDownloads; i++) {
            ext = dl_links[i].substr(dl_links[i].lastIndexOf('.') + 1);

            fp.push(downloaderGlobal.rootdir + "downloaded_video" + i + "." + ext); // file path and name
            localStorage.setItem('fp',JSON.stringify(fp));

            // call file transfer function
            filetransfer(dl_links[i], fp[i], numDownloads);
        }

        setTimeout(function() {
            if (downloaderGlobal.failureTally !== 0) {
                alert(downloaderGlobal.textDownloadingError);
            }
            downloaderGlobal.failureTally = 0;
        }, 500);
    },

    findElements: function(fileType,content) {
        var elements = [];

        // currently supported file types: video, audio and should appear with the file type and id numbers following
        // e.g. video1, audio2, video52, audio12, etc.
        var reg = new RegExp(fileType+"[0-9]{1,2}","g");
        var found = String(content.match(reg));

        elements.push(found);
        elements = elements[0].split(',');
        return elements;

    },

    replaceElements: function(fileType,content,elements) {
        var elemNums = [];
        var elemNew = [];
        for (i = 0; i < elements.length; i++) {
            // access local storage if files have already been downloaded
            if (typeof localStorage.fp === 'undefined') {
                alert(downloaderGlobal.textMissingContent);
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
                    alert(downloaderGlobal.textUnsupportedFileType);
                    return content;
                }
            elemNew.push(elemTag);
            if (elemNew[i].indexOf("undefined") === -1) {
                content = content.replace(elements[i],elemNew[i]);
            }
            else {
                content = content.replace(elements[i],downloaderGlobal.textUnavailableMedia);
            }
        }
        return content;
    },

    insert: function(fileType,content) {
        var dl = new Downloader();
        thingsToReplace = dl.findElements(fileType,content);
        content = dl.replaceElements(fileType,content,thingsToReplace);

        return content;
    },
};

function constructProgressBar (ftObject, numDownloads) {
    // Where you want a progress bar, add the following markup:
    //  <div id="progressContainer" style="display: none;">
    //  </div>
    // and the following CSS
    // div.progress {
    //     opacity: 1;
    //     transition: opacity 1s;
    // }
    // div.progress.fade {
    //     display: none;
    // }

    document.getElementById("download-counter").innerHTML = downloaderGlobal.textDownloading + " " +numDownloads+ " " + downloaderGlobal.textFiles + "...";

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

                    var numDownloadsRemaining = numDownloads - downloaderGlobal.completionTally;

                    if (numDownloads > 1) {
                        document.getElementById("download-counter").innerHTML = downloaderGlobal.textDownloading + " "+numDownloadsRemaining+" "+downloaderGlobal.textFiles + "...";
                    }
                    else if (numDownloadsRemaining === 1) {
                        document.getElementById("download-counter").innerHTML = downloaderGlobal.textDownloading + " 1 " + downloaderGlobal.textFile + "...";
                    }
                    else {
                        progressContainer.setAttribute("style","display: none");
                    }
                }, 1000);
            }
        }
    };
}

function filetransfer(file,filepath,numFiles) {
    var fileTransfer = new FileTransfer();
    downloaderGlobal.completionTally = 0;
    constructProgressBar(fileTransfer,numFiles);

    if (typeof FileTransfer === 'undefined') {
        alert(downloaderGlobal.textMissingPlugin);
        return;
    }
    
    fileTransfer.download(
        file,
        filepath,
        function(entry) {
            console.log("download complete: " + entry.fullPath);
            downloaderGlobal.completionTally++;

            if (downloaderGlobal.completionTally === numFiles) {
                alert(downloaderGlobal.textDownloadComplete);
            }
        },
        function(error) {
            console.log("download error source " + error.source);
            downloaderGlobal.failureTally++;
            console.log(downloaderGlobal.failureTally);
        }
    );
}


